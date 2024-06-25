import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { sol } = req.query;

    const { rows } = await client.query('SELECT eth FROM wallets WHERE sol = $1', [sol]);
    if (rows.length) {
        res.status(200).json({ eth: rows[0].eth });
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};
