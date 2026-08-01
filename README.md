# prabhasportfolio

Build a premium 2D portfolio website for a creative video editor, with a consistent illustrated cinematic-dark aesthetic.

## Brand / Profile Content
- Name & Role: Prabhas Pasupuleti — Creative Video Editor
- Experience: 2 years of transforming raw footage into compelling stories for brands and creators worldwide
- Location: Hyderabad, India
- Email: prabhaspasupuleti@gmail.com
- Phone: +91 8712165611
- Instagram: @prabhas.pasupuleti
- X (Twitter): @prabhasnaidu30

## Core Services (for About / Works context)
- Brand Commercials — cinematic 30s–90s films for product launches and high-end campaigns
- Social Media Ads — scroll-stopping vertical edits for Meta, TikTok, YouTube Shorts
- Corporate Videos — narrative-driven content for founders, teams, and enterprises
- Product Videos — macro-detail films highlighting product craftsmanship
- YouTube Editing — long-form edits optimized for retention and pacing
- Motion Graphics — animated logos, kinetic typography, 2D/3D motion assets

## Workflow Toolkit (Toolkit page)
- Editing & Compositing Suite: Adobe Premiere Pro, After Effects, Photoshop, CapCut, Canva
- AI & Generative Tools: Flow AI, Seedance, Adobe Firefly, Gemini, ChatGPT
Show each tool as a card/icon grid (use clean minimal glyphs/icon representations, don't fabricate logos that don't exist).

## Pages
1. **Home** — hero page with the background effect described below
2. **About** — reached via a scroll-triggered parallax transition from Home (described below)
3. **Works** — portfolio/showcase page (placeholder video thumbnail/project cards, no real footage supplied yet)
4. **Toolkit** — the tools grid above. Immediately after it, add a "Brands I've Worked With" section: a horizontal auto-scrolling infinite marquee of tasteful placeholder brand cards (rounded cards with generic wordmarks, since no real client logos were supplied)
5. **CTA / Contact** — contact info above + a contact form

## Visual Theme (apply consistently across ALL pages)
Cinematic, moody, premium dark-editorial aesthetic. Every key visual (hero art, section dividers, toolkit backdrop, CTA backdrop) should be an AI-generated ILLUSTRATION (not photo-real), in one consistent art style/palette: deep blues/teals with neon-teal + warm-orange accent glows, moody studio lighting, high contrast. Please generate these illustrated frames yourself as part of the build and keep the style consistent site-wide.

## Home Page Background Effect
Animated light-rays background behind the hero content, using this exact component (JS + CSS, needs the `ogl` npm package installed):

```jsx
import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './LightRays.css';

const DEFAULT_COLOR = '#ffffff';
const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};
const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const LightRays = ({ raysOrigin = 'top-center', raysColor = DEFAULT_COLOR, raysSpeed = 1, lightSpread = 1, rayLength = 2, pulsating = false, fadeDistance = 1.0, saturation = 1.0, followMouse = true, mouseInfluence = 0.1, noiseAmount = 0.0, distortion = 0.0, className = '' }) => {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  const cleanupFunctionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(entries => setIsVisible(entries[0].isIntersecting), { threshold: 0.1 });
    observerRef.current.observe(containerRef.current);
    return () => { if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; } };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupFunctionRef.current) { cleanupFunctionRef.current(); cleanupFunctionRef.current = null; }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      await new Promise(resolve => setTimeout(resolve, 10));
      if (!containerRef.current) return;
      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%'; gl.canvas.style.height = '100%';
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(gl.canvas);

      const vert = `attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`;
      const frag = `precision highp float;
uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
uniform float pulsating; uniform float fadeDistance; uniform float saturation; uniform vec2 mousePos;
uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion; varying vec2 vUv;
float noise(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
  float baseStrength = clamp((0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)), 0.0, 1.0);
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }
  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  fragColor = rays1 * 0.5 + rays2 * 0.4;
  if (noiseAmount > 0.0) { float n = noise(coord * 0.01 + iTime * 0.1); fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n); }
  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8; fragColor.y *= 0.3 + brightness * 0.6; fragColor.z *= 0.5 + brightness * 0.5;
  if (saturation != 1.0) { float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114)); fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation); }
  fragColor.rgb *= raysColor;
}
void main() { vec4 color; mainImage(color, gl_FragCoord.xy); gl_FragColor = color; }`;

      const uniforms = {
        iTime: { value: 0 }, iResolution: { value: [1, 1] }, rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed }, lightSpread: { value: lightSpread },
        rayLength: { value: rayLength }, pulsating: { value: pulsating ? 1.0 : 0.0 }, fadeDistance: { value: fadeDistance },
        saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] }, mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount }, distortion: { value: distortion }
      };
      uniformsRef.current = uniforms;
      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr; const w = wCSS * dpr; const h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor; uniforms.rayDir.value = dir;
      };

      const loop = t => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        try { renderer.render({ scene: mesh }); animationIdRef.current = requestAnimationFrame(loop); }
        catch (error) { console.warn('WebGL rendering error:', error); return; }
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }
        window.removeEventListener('resize', updatePlacement);
        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) loseContextExt.loseContext();
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
          } catch (error) { console.warn('Error during WebGL cleanup:', error); }
        }
        rendererRef.current = null; uniformsRef.current = null; meshRef.current = null;
      };
    };

    initializeWebGL();
    return () => { if (cleanupFunctionRef.current) { cleanupFunctionRef.current(); cleanupFunctionRef.current = null; } };
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;
    const u = uniformsRef.current; const renderer = rendererRef.current;
    u.raysColor.value = hexToRgb(raysColor); u.raysSpeed.value = raysSpeed; u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength; u.pulsating.value = pulsating ? 1.0 : 0.0; u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation; u.mouseInfluence.value = mouseInfluence; u.noiseAmount.value = noiseAmount; u.distortion.value = distortion;
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = renderer.dpr;
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
    u.rayPos.value = anchor; u.rayDir.value = dir;
  }, [raysColor, raysSpeed, lightSpread, raysOrigin, rayLength, pulsating, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    const handleMouseMove = e => {
      if (!containerRef.current || !rendererRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    };
    if (followMouse) { window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove); }
  }, [followMouse]);

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} />;
};

export default LightRays;
```

```css
.light-rays-container { width: 100%; height: 100%; position: relative; pointer-events: none; z-index: 3; overflow: hidden; }
```

Usage on Home hero:
```jsx
<LightRays raysOrigin="top-center" raysColor="#00ffff" raysSpeed={1.5} lightSpread={0.8} rayLength={1.2} followMouse={true} mouseInfluence={0.1} noiseAmount={0.1} distortion={0.05} className="custom-rays" />
```
Blend the teal ray color with a touch of warm orange in the surrounding illustrated hero art to match the site's neon-teal/orange accent palette.

## Home → About Scroll Transition
Build a scroll-driven parallax transition (triggered as the user scrolls from the bottom of Home into About) using multiple stacked illustrated layers at different parallax speeds to create depth: a slow-moving background layer (deep blue nebula/moon), a lightly-moving midground layer (silhouette city skyline), and a foreground layer (bold headline text + a small illustrated icon) that moves fastest and briefly "sticks"/pins before releasing into the About page content. Generate the layered illustration artwork yourself, in the same consistent illustration style as the rest of the site. Implement with a scroll-linked animation approach (e.g. Framer Motion useScroll/useTransform or equivalent scroll-parallax).

## General build notes
- Install `ogl` for the LightRays component
- Consistent premium dark cinematic theme, smooth page transitions, responsive/mobile-friendly
- Navigation between Home / About / Works / Toolkit / CTA
- Generate all illustrated frame artwork yourself, keeping one consistent illustration style across every page
- Placeholder content is fine for Works page video cards and Toolkit "brands worked with" logos since no real assets were supplied

Start by scaffolding the site structure and navigation, then build Home with the LightRays background + hero, then the scroll-parallax transition into About, then Works, Toolkit (+ brands marquee), then CTA.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://prabhasportfolio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4486da04-4b77-46eb-8819-510b474a08d2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
