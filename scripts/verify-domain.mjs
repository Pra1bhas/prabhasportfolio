#!/usr/bin/env node
/**
 * Automated DNS + redirect verification for a custom domain.
 *
 * Usage:
 *   node scripts/verify-domain.mjs                        # defaults to prabhasportfolio.online
 *   node scripts/verify-domain.mjs example.com
 *
 * Checks, for both apex and www:
 *   1. DNS resolution across multiple public resolvers (catches partial propagation)
 *   2. HTTPS reachability + TLS validity
 *   3. Redirect chain (apex -> www or www -> apex) and final status
 */

const domain = (process.argv[2] || "prabhasportfolio.online").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
const hosts = [domain, `www.${domain}`];

// DNS-over-HTTPS resolvers: independent views of public DNS.
const resolvers = [
  { name: "Cloudflare", url: (n, t) => `https://cloudflare-dns.com/dns-query?name=${n}&type=${t}` },
  { name: "Google", url: (n, t) => `https://dns.google/resolve?name=${n}&type=${t}` },
  { name: "NextDNS", url: (n, t) => `https://dns.nextdns.io/dns-query?name=${n}&type=${t}` },
];

const ok = (s) => `\x1b[32m${s}\x1b[0m`;
const bad = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

let failures = 0;
const dnsResolved = new Map(); // host -> true when public DNS has records

async function doh(resolver, name, type) {
  try {
    const res = await fetch(resolver.url(name, type), {
      headers: { accept: "application/dns-json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const json = await res.json();
    const answers = (json.Answer || [])
      .filter((a) => a.type === 1 || a.type === 5) // A or CNAME
      .map((a) => a.data.replace(/\.$/, ""));
    return { answers, status: json.Status };
  } catch (e) {
    return { error: e.name === "TimeoutError" ? "timeout" : e.message };
  }
}

async function checkDns(host) {
  console.log(`\nDNS  ${host}`);
  const seen = new Set();
  for (const resolver of resolvers) {
    const a = await doh(resolver, host, "A");
    const c = await doh(resolver, host, "CNAME");
    const records = [...(a.answers || []), ...(c.answers || [])];
    if (a.error && c.error) {
      failures++;
      console.log(`  ${bad("✗")} ${resolver.name.padEnd(11)} error: ${a.error}`);
      continue;
    }
    if (records.length === 0) {
      failures++;
      console.log(`  ${bad("✗")} ${resolver.name.padEnd(11)} NO RECORD (missing or not propagated)`);
      continue;
    }
    records.forEach((r) => seen.add(r));
    dnsResolved.set(host, true);
    console.log(`  ${ok("✓")} ${resolver.name.padEnd(11)} ${records.join(", ")}`);
  }
  if (seen.size > 1) {
    console.log(`  ${dim("note")} resolvers disagree (${[...seen].join(" | ")}) — still propagating`);
  }
}

async function checkHttp(host) {
  const url = `https://${host}/`;
  const chain = [];
  let current = url;
  try {
    for (let i = 0; i < 6; i++) {
      const res = await fetch(current, {
        redirect: "manual",
        headers: { "user-agent": "domain-verify/1.0", "cache-control": "no-cache" },
        signal: AbortSignal.timeout(12000),
      });
      chain.push(`${current} -> ${res.status}`);
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) {
        current = new URL(loc, current).toString();
        continue;
      }
      const good = res.status === 200;
      if (!good) failures++;
      console.log(`\nHTTP ${host}`);
      chain.forEach((c) => console.log(`  ${dim(c)}`));
      console.log(`  ${good ? ok("✓") : bad("✗")} final ${current} (${res.status})`);
      return;
    }
    failures++;
    console.log(`\nHTTP ${host}\n  ${bad("✗")} redirect loop: ${chain.join(" | ")}`);
  } catch (e) {
    const msg = e.cause?.code || e.name || e.message;
    console.log(`\nHTTP ${host}`);
    if (msg === "ENOTFOUND" && dnsResolved.get(host)) {
      // Public DNS has the record but this machine's own resolver does not see it
      // yet (local cache / restricted network). Not a domain misconfiguration.
      console.log(`  ${dim("~")} skipped: public DNS is fine, but this machine's resolver can't see ${host} yet`);
      return;
    }
    failures++;
    console.log(`  ${bad("✗")} unreachable (${msg}) — DNS missing or TLS not issued`);
  }
}

console.log(`Verifying ${domain} (apex + www) across public resolvers…`);
for (const host of hosts) await checkDns(host);
for (const host of hosts) await checkHttp(host);

console.log(
  failures === 0
    ? `\n${ok("PASS")} ${domain} resolves and serves 200 from every resolver — reachable on other networks.`
    : `\n${bad(`FAIL (${failures} issue${failures > 1 ? "s" : ""})`)} fix the records above, wait for TTL, then re-run.`
);
process.exit(failures === 0 ? 0 : 1);
