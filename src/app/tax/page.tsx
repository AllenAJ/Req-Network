// src/app/tax/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Types } from '@requestnetwork/request-client.js';
import { getRequestClient } from '@/lib/requestClient';  // Fixed import path
import TaxReports from '../../components/TaxReports';  // Fixed import path
import { RequestSummary } from '@/types';
import Link from 'next/link';

export default function TaxPage() {
  const [requests, setRequests] = useState<RequestSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (address) {
      fetchRequests(address);
    }
  }, [address]);

  const fetchRequests = async (address: string) => {
    setLoading(true);
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const requestClient = getRequestClient(provider);
  
      const fetchedRequests = await requestClient.fromIdentity({
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: address,
      });
  
      const summaries: RequestSummary[] = fetchedRequests.map((request) => {
        const data = request.getData();
        return {
          requestId: data.requestId,
          payee: data.payee?.value || 'Unknown',
          expectedAmount: data.expectedAmount.toString(),
          timestamp: data.timestamp,
          state: data.state,
          currencySymbol: data.currency || 'ETH'
        };
      });
      
      setRequests(summaries);
      setError(null);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-[#0a051e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please Connect Your Wallet</h1>
          <p className="text-gray-400">Connect your wallet to view tax reports</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a051e]">
<header className="border-b border-gray-800 bg-[#0a051e]/95 backdrop-blur sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">Tax Reports</h1>
      </div>
      <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <span className="text-white/80 text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    </div>
  </div>
</header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <TaxReports requests={requests} />
        )}
      </main>
    </div>
  );
}