import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Client } from 'pg';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { sol, eth, sig } = req.body;

    const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${eth}, your solana wallet: ${sol}`;
    const encodedMessage = new TextEncoder().encode(message);

    const isValid = verifySignature(sol, encodedMessage, sig);

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid signature. Did you sign the request using your presale wallet?' });
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    await client.connect();
    await client.query('INSERT INTO wallets (sol, eth) VALUES ($1, $2) ON CONFLICT (sol) DO UPDATE SET eth = $2', [sol, eth]);
    await client.end();

    return res.status(200).json({ message: 'Successfully saved' });
};

function verifySignature(solAddress: string, message: Uint8Array, signature: string): boolean {
    try {
        const publicKey = new PublicKey(solAddress);
        const decodedSignature = bs58.decode(signature);
        return publicKey.verify(message, decodedSignature);
    } catch (error) {
        return false;
    }
}
