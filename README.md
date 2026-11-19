# Tabassum's Secret World ❤️

A mobile-first React/Vite surprise website. It includes the approved sections, wedding countdown, music toggle, interactive quiz/games/letters and an optional Supabase response submission.

## Run locally
1. Install Node.js LTS.
2. Extract this ZIP.
3. Open a terminal in this folder and run `npm install`.
4. Copy `.env.example` to `.env` and fill in your Supabase project URL and publishable/anon key.
5. Run `npm run dev`.

## Connect response submissions (required before sharing)
1. Create a Supabase project.
2. Open SQL Editor and run the contents of `supabase.sql`.
3. In `.env`, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy to Vercel and add the same two variables in Project Settings → Environment Variables.
5. Test one submission from the deployed website. Confirm it appears in Supabase Table Editor → `tabassum_responses`.
6. Keep the Supabase table private: do not create a public SELECT policy and never put a service-role key in the website.

## Add JHOL audio
The website intentionally does not bundle copyrighted music. Obtain a legally usable audio file or permission to use the track. Put your authorized MP3 at `public/jhol.mp3`. The music toggle is wired to playback. The browser's autoplay rules mean music starts only after the visitor taps `OPEN MY SURPRISE`.

## Deploy
1. Push the extracted project to a private or public GitHub repository.
2. Import that repository into Vercel.
3. Add the two Supabase environment variables.
4. Deploy, then test the public URL on Android Chrome and WhatsApp in-app browser.
5. Share the public Vercel URL.

## Important implementation note
This is a working starter project, not a deployed production site. The music toggle is a UI control and needs the authorized MP3 playback handler wired before release. Validate all flows and response receipt before sharing.
