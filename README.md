This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
```bash 
npm install
``` 
## Features

- Connect Phantom Wallet
- Sign a message with Phantom Wallet
- Save Ethereum and Solana wallet addresses to PostgreSQL database
- Retrieve Ethereum wallet address based on Solana wallet address

## API Routes
- GET /api/get-wallet: Retrieve Ethereum wallet address based on Solana wallet address.
- POST /api/save-wallet: Save Ethereum and Solana wallet addresses to the database.
## Frontend
The frontend is located in pages/claim/page.tsx 

- Connect Wallet
- Sign a message
- Save wallet address

### For install dependencies , if fetching errors
```bash 
npm install @solana/web3.js @solana/wallet-adapter-phantom bs58 @chakra-ui/react @emotion/react @emotion/styled framer-motion pg --legacy-peer-deps

npm install use-swr --legacy-peer-deps

``` 
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
