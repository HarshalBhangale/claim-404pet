
"use client"
import { useState, useEffect } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { PublicKey } from '@solana/web3.js';

export default function Claim() {
    const [ethWallet, setEthWallet] = useState<string>('');
    const [solWallet, setSolWallet] = useState<string | null>(null);
    const [connectedWallet, setConnectedWallet] = useState<string>('');

    useEffect(() => {
        if (solWallet) {
            fetch(`/api/get-wallet?sol=${solWallet}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.eth) {
                        setEthWallet(data.eth);
                    }
                });
        }
    }, [solWallet]);

    const connectWallet = async () => {
        const adapter = new PhantomWalletAdapter();
        await adapter.connect();
        const publicKey = adapter.publicKey as PublicKey;
        setSolWallet(publicKey.toString());
        setConnectedWallet(publicKey.toString());
    };

    const saveWallet = async () => {
        if (!solWallet) {
            alert('Please connect your Solana wallet first');
            return;
        }

        const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${ethWallet}, your solana wallet: ${solWallet}`;
        const adapter = new PhantomWalletAdapter();

        if (!adapter.connected) {
            await adapter.connect();
        }

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await adapter.signMessage(encodedMessage);

        const response = await fetch('/api/save-wallet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sol: solWallet, eth: ethWallet, sig: signature })
        });

        if (response.ok) {
            alert('Successfully saved');
        } else {
            alert('Error saving wallet. Did you sign the request using your presale wallet?');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <h1 className="text-4xl font-bold mb-8">Claim Your Tokens</h1>
            <div className="w-full max-w-md mb-4">
                <label className="block text-lg mb-2">Your ETH Wallet to receive tokens</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={ethWallet}
                    onChange={(e) => setEthWallet(e.target.value)}
                />
            </div>
            <button
                className="w-full max-w-md py-2 mb-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
                onClick={connectWallet}
            >
                Connect Phantom Wallet
            </button>
            {connectedWallet && (
                <p className="mb-4">Your connected wallet: {connectedWallet.slice(0, 4)}...{connectedWallet.slice(-4)}</p>
            )}
            <button
                className="w-full max-w-md py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
                onClick={saveWallet}
            >
                Save
            </button>
        </div>
    );
}
