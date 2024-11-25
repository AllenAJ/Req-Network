'use client';

import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Types } from '@requestnetwork/request-client.js';
import { getRequestClient } from '../lib/requestClient';
import ConnectWallet from '../components/ConnectWallet';
import RequestsTable from '../components/RequestsTable';
import type { RequestSummary } from '../types';
import Dashboard from '../components/AnalyticsDashboard';


export default function Home() {
  const [requests, setRequests] = useState<RequestSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

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
        };
      });
      console.log(summaries);
      
      setRequests(summaries);
      setError(null);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (newAddress: string) => {
    setAddress(newAddress);
  };

  useEffect(() => {
    if (address) {
      fetchRequests(address);
    }
  }, [address]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Request Network Analytics (Sepolia)
      </h1>

      <ConnectWallet 
        onConnect={handleConnect}
        isConnected={!!address}
        address={address || undefined}
      />

      {error && (
        <div className="text-red-500 mb-8">
          {error}
        </div>
      )}

{address && (
  <Dashboard requests={requests} address={address} />
)}
    </main>
  );
}