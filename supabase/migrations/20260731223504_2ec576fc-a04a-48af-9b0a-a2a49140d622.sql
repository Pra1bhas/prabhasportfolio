CREATE POLICY "Public read access for insta-reels"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'insta-reels');