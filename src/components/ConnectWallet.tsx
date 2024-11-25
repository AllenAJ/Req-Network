import { useState } from 'react';
import type { ConnectWalletProps } from '../types';

export default function ConnectWallet({ onConnect, isConnected, address }: ConnectWalletProps) {
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      onConnect(accounts[0]);
      setError(null);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
    }
  };

  return (
    <div className="mb-8">
      {!isConnected ? (
        <button 
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}