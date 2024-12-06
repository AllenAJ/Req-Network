'use client';

import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Types } from '@requestnetwork/request-client.js';
import { getRequestClient } from '../lib/requestClient';
import type { RequestSummary } from '../types';
import Dashboard from '../components/AnalyticsDashboard';
import LandingPage from '../components/LandingPage';

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

  const handleConnect = (newAddress: string) => {
    setAddress(newAddress);
  };

  useEffect(() => {
    if (address) {
      fetchRequests(address);
    }
  }, [address]);

  if (!address) {
    return <LandingPage onConnect={handleConnect} />;
  }

  return (
    <Dashboard 
      requests={requests} 
      address={address} 
      isLoading={loading} 
    />
  );
}