# NextJS Course Platform

This project consists of:
- Supabase database and authentication
- Authentication with Discord OAuth
- One time fees (+Pre-order logic) using Stripe
- Multiple courses divided to chapters with lessons 
- Protected videos using Mux with JWT tokens

## How to run this project

Running this project is quite complicated thing. 

First clone this repository, and in the root folder run:

```bash
  npm install
```
    
- Create new Supabase instance and save url, anon and service API key to .env.local file
- In Authentication tab turn on Discord OAuth and insert Client ID + secret + Turn of Email provider
- In Supabase SQL editor make all of the needed tables and webhook using [this file](https://github.com/MartinTabz/nextjs-course-platform/blob/main/supabase-definition.txt)
- Create new Stripe account - save both API keys to .env.local file and create a webhook for "checkout.session.completed" action.
- To generate your own API_ROUTE_SECRET for API route used to create new Stripe customer simply open command prompt and paste this:
```bash
  node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```
- Now go to [Mux](https://www.mux.com/) and sign up, add your credit/debit card and in settings generate new Signing Key and Access Token and paste them into .env.local.
- Now fill up the database with products, chapters and lessons. Lessons can have one video and rich text in them. To add video - upload the video to Mux with "playback_policy" set to "signed" to protect the video from unauthorized access and then paste playback ID to playback_id column in the lessons table. 




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
