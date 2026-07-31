CREATE POLICY "Allow authenticated users to select own insta-reels objects"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'insta-reels' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to insert own insta-reels objects"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'insta-reels' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to update own insta-reels objects"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'insta-reels' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'insta-reels' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete own insta-reels objects"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'insta-reels' AND auth.uid() = owner);