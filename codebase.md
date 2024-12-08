# .eslintrc.json

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .vercel/project.json

```json
{"orgId":"team_KHAELfOHJMd9bgdTf3izvyOL","projectId":"prj_ylI3S5GEZ89vc5Eop1uJvtwbmavd"}
```

# .vercel/README.txt

```txt
> Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you link a directory to a Vercel project.

> What does the "project.json" file contain?
The "project.json" file contains:
- The ID of the Vercel project that you linked ("projectId")
- The ID of the user or team your Vercel project is owned by ("orgId")

> Should I commit the ".vercel" folder?
No, you should not share the ".vercel" folder with anyone.
Upon creation, it will be automatically added to your ".gitignore" file.

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // For development only
    },
  };
  
  export default nextConfig;
```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "request-analytics",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@requestnetwork/request-client.js": "^0.50.0",
    "@requestnetwork/web3-signature": "^0.8.1",
    "ethers": "^5.7.2",
    "html2canvas": "^1.4.1",
    "jspdf": "^2.5.2",
    "lucide-react": "^0.468.0",
    "next": "15.0.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",    
    "recharts": "^2.13.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# src/app/fonts/GeistVF.woff

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

```

# src/app/layout.tsx

```tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Network Analytics',
  description: 'Analytics dashboard for Request Network on Sepolia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

# src/app/page.tsx

```tsx
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
```

# src/components/AddressDisplay.tsx

```tsx
import { useState } from 'react';

interface AddressDisplayProps {
  address: string;
}

const AddressDisplay = ({ address }: AddressDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-mono">
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </span>
      <button
        onClick={copyToClipboard}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        {copied ? '✓' : '📋'}
      </button>
    </div>
  );
};

export default AddressDisplay;
```

# src/components/AnalyticsDashboard.tsx

```tsx
import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { utils } from 'ethers';
import { DashboardProps, RequestSummary } from '../types';
import FilterBar from './FilterBar';
import ExportHandler from './ExportHandler';
import ReputationSystem from './ReputationSystem';
import AddressDisplay from './AddressDisplay';
import RequestDetails from './RequestDetails';
import { formatTimestamp } from '@/utils/timeFormatter';

interface ExchangeRate {
  ETH: number;
}

export default function Dashboard({ requests, address, isLoading }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<RequestSummary[]>(requests);
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [selectedView, setSelectedView] = useState<'invoice' | 'settlement'>('invoice');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestSummary | null>(null);
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setExchangeRate({ ETH: data.ethereum.usd });
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);

  // Get unique currencies
  const currencies = useMemo(() => {
    const currencySet = new Set<string>();
    requests.forEach(req => {
      if (req.currencySymbol) {
        currencySet.add(req.currencySymbol);
      }
    });
    return ['all', ...Array.from(currencySet)];
  }, [requests]);

  // Filter requests by selected currency
  const filteredByCurrency = useMemo(() => {
    if (selectedCurrency === 'all') return requests;
    return requests.filter(req => req.currencySymbol === selectedCurrency);
  }, [requests, selectedCurrency]);

  const formatUsdValue = (ethValue: number) => {
    if (!exchangeRate) return 'Loading...';
    const usdValue = ethValue * exchangeRate.ETH;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(usdValue);
  };

  const stats = useMemo(() => {
    const totalEth = filteredByCurrency.reduce((sum, req) => 
      sum + Number(utils.formatEther(req.expectedAmount)), 0);
    
    return {
      totalRequests: filteredByCurrency.length,
      totalValueEth: totalEth,
      totalValueUsd: exchangeRate ? totalEth * exchangeRate.ETH : null,
      uniqueCurrencies: new Set(filteredByCurrency.map(req => req.currencySymbol)).size
    };
  }, [filteredByCurrency, exchangeRate]);

  // Process data for charts
  const chartData = useMemo(() => {
    const monthlyStats = filteredByCurrency.reduce((acc: any, req) => {
      const date = new Date(req.timestamp * 1000);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const ethAmount = Number(utils.formatEther(req.expectedAmount));
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          requestCount: 0,
          totalValue: 0,
          totalValueUsd: 0,
          paidCount: 0,
          paidValue: 0,
          paidValueUsd: 0
        };
      }
      
      acc[monthKey].requestCount += 1;
      acc[monthKey].totalValue += ethAmount;
      if (exchangeRate) {
        acc[monthKey].totalValueUsd += ethAmount * exchangeRate.ETH;
      }
      
      if (req.state === 'paid') {
        acc[monthKey].paidCount += 1;
        acc[monthKey].paidValue += ethAmount;
        if (exchangeRate) {
          acc[monthKey].paidValueUsd += ethAmount * exchangeRate.ETH;
        }
      }
      
      return acc;
    }, {});

    return Object.values(monthlyStats).sort((a: any, b: any) => a.month.localeCompare(b.month));
  }, [filteredByCurrency, exchangeRate]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen bg-[#0a051e] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-white/80">Loading requests...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#0a051e]">
          <header className="border-b border-gray-800 bg-[#0a051e]/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Request Network Analytics</h1>
                <ExportHandler requests={requests} address={address} />
              </div>
  
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search requests..."
                    className="bg-gray-900/50 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
          {selectedRequest ? (
  <RequestDetails 
    request={selectedRequest}
    onBack={() => setSelectedRequest(null)}
  />
) : (
              <div id="dashboard-content">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-gray-400 font-medium mb-2">Total Requests</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalRequests}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-gray-400 font-medium mb-2">Total Value (ETH)</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalValueEth.toFixed(2)} ETH</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-gray-400 font-medium mb-2">Total Value (USD)</h3>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalValueUsd ? formatUsdValue(stats.totalValueEth) : 'Loading...'}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-gray-400 font-medium mb-2">Network</h3>
                    <p className="text-3xl font-bold text-white">Sepolia</p>
                  </div>
                </div>
  
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Request Count Chart */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h4 className="text-white mb-4">Request Activity</h4>
                    <div className="h-[300px]">
                      <LineChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#fff'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="requestCount"
                          name="Created"
                          stroke="#60a5fa"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="paidCount"
                          name="Paid"
                          stroke="#34d399"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </div>
                  </div>
  
                  {/* Value Chart */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h4 className="text-white mb-4">Payment Activity</h4>
                    <div className="h-[300px]">
                      <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#fff'
                          }}
                          formatter={(value: any) => [`${value.toFixed(2)} ETH`, '']}
                        />
                        <Legend />
                        <Bar
                          dataKey="totalValue"
                          name="Requested Value"
                          fill="#60a5fa"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="paidValue"
                          name="Paid Value"
                          fill="#34d399"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </div>
                  </div>
                </div>
  
                <ReputationSystem requests={filteredRequests} address={address} />
  
                {/* Requests Table */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-800">
                  <div className="p-6">
                    <FilterBar requests={filteredRequests} onFilterChange={setFilteredRequests} />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Request ID</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Payee</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount (ETH)</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount (USD)</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">State</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((request) => {
                          const ethAmount = Number(utils.formatEther(request.expectedAmount));
                          return (
                            <tr key={request.requestId} className="border-b border-gray-800/50 hover:bg-white/5">
                              <td className="px-6 py-4">
                                <AddressDisplay address={request.requestId} />
                              </td>
                              <td className="px-6 py-4">
                                <AddressDisplay address={request.payee} />
                              </td>
                              <td className="px-6 py-4 text-white font-medium">
                                {ethAmount.toFixed(4)} ETH
                              </td>
                              <td className="px-6 py-4 text-white font-medium">
                                {formatUsdValue(ethAmount)}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  request.state === 'created' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                                }`}>
                                  {request.state}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-white">
                                {formatTimestamp(request.timestamp)}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => setSelectedRequest(request)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
                      }
```

# src/components/ConnectWallet.tsx

```tsx
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
```

# src/components/ExportHandler.tsx

```tsx
import React from 'react';
import { utils } from 'ethers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RequestSummary } from '../types';

// Type definitions
interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: string;
  discount?: string;
  tax?: {
    amount: number;
  };
  total: string;
}

interface InvoiceData {
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  from: {
    address: string;
    firstName?: string;
    lastName?: string;
    taxRegistration?: string;
    businessName?: string;
    streetAddress?: string;
    city?: string;
    country?: string;
  };
  to: {
    address: string;
    firstName?: string;
    lastName?: string;
    taxRegistration?: string;
    businessName?: string;
    streetAddress?: string;
    city?: string;
    country?: string;
  };
  amount: string;
  currency: string;
  status: string;
  network: string;
  paymentChain: string;
  invoiceCurrency: string;
  settlementCurrency: string;
  items?: InvoiceItem[];
  note?: string;
}

interface ExportHandlerProps {
  requests: RequestSummary[];
  address: string | null;
}

declare global {
  interface Window {
    html2pdf: any;
  }
}

const RENDER_DELAY_MS = 3000;

export default function ExportHandler({ requests, address }: ExportHandlerProps) {
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const exportToJSON = () => {
    const data = {
      address,
      exportDate: new Date().toISOString(),
      requests: requests.map(req => ({
        ...req,
        expectedAmount: utils.formatEther(req.expectedAmount),
        date: new Date(req.timestamp * 1000).toISOString(),
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'request-network-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatRequestId = (requestId: string) => {
    return `Request ${requestId.slice(0, 8)}...`;
  };

  const ensureHtml2PdfLoaded = async () => {
    if (typeof window.html2pdf === 'undefined') {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      );
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const exportToPDF = async (request: RequestSummary) => {
    await ensureHtml2PdfLoaded();
    const invoiceData = createInvoiceData(request);
    const content = generateInvoiceHTML(invoiceData);

    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    await sleep(RENDER_DELAY_MS);

    const opt = {
      margin: 10,
      filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      },
    };

    try {
      await window.html2pdf().from(element).set(opt).save();
    } finally {
      document.body.removeChild(element);
    }
  };

  const createInvoiceData = (request: RequestSummary): InvoiceData => {
    return {
      invoiceNumber: request.requestId,
      issuedDate: new Date(request.timestamp * 1000).toLocaleDateString(),
      dueDate: new Date(request.timestamp * 1000 + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      from: {
        address: address || 'Unknown',
        firstName: '',
        lastName: '',
        taxRegistration: '',
        businessName: '',
        streetAddress: '',
        city: '',
        country: ''
      },
      to: {
        address: request.payee,
        firstName: '',
        lastName: '',
        taxRegistration: '',
        businessName: '',
        streetAddress: '',
        city: '',
        country: ''
      },
      amount: utils.formatEther(request.expectedAmount),
      currency: request.currencySymbol,
      status: request.state,
      network: 'Sepolia',
      paymentChain: 'Ethereum',
      invoiceCurrency: request.currencySymbol,
      settlementCurrency: request.currencySymbol,
      items: []
    };
  };

  const generateInvoiceHTML = (invoiceData: InvoiceData): string => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Request Network Invoice - ${invoiceData.invoiceNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px;
              line-height: 1.6;
              color: #333;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .header h1 {
              margin: 0;
              color: #333;
              font-size: 28px;
            }
            .dates {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .address-container {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
              background-color: #FBFBFB;
              padding: 20px;
              gap: 40px;
            }
            .address-block {
              flex: 1;
            }
            .address-block h3 {
              margin: 0 0 10px 0;
              color: #666;
            }
            .address {
              font-family: monospace;
              font-size: 12px;
              word-break: break-all;
              margin: 5px 0;
            }
            .payment-details {
              margin: 30px 0;
            }
            .amount {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin: 10px 0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              background: ${invoiceData.status === 'paid' ? '#dcfce7' : '#fee2e2'};
              color: ${invoiceData.status === 'paid' ? '#166534' : '#991b1b'};
            }
            .network-info {
              margin-top: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border: 1px solid #eee;
            }
            th {
              background-color: #f8f8f8;
              font-weight: 600;
              color: #666;
            }
            .note {
              margin-top: 30px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1>REQUEST NETWORK INVOICE</h1>
              <p>Invoice #${invoiceData.invoiceNumber}</p>
            </div>

            <div class="dates">
              <div>
                <strong>Issued Date:</strong>
                <p>${invoiceData.issuedDate}</p>
              </div>
              <div>
                <strong>Payment Due:</strong>
                <p>${invoiceData.dueDate}</p>
              </div>
            </div>

            <div class="address-container">
              <div class="address-block">
                <h3>From:</h3>
                <p class="address">${invoiceData.from.address}</p>
                ${invoiceData.from.businessName ? `<p>${invoiceData.from.businessName}</p>` : ''}
                ${invoiceData.from.firstName ? `<p>${invoiceData.from.firstName} ${invoiceData.from.lastName}</p>` : ''}
                ${invoiceData.from.streetAddress ? `<p>${invoiceData.from.streetAddress}</p>` : ''}
                ${invoiceData.from.city ? `<p>${invoiceData.from.city}, ${invoiceData.from.country}</p>` : ''}
                ${invoiceData.from.taxRegistration ? `<p>VAT: ${invoiceData.from.taxRegistration}</p>` : ''}
              </div>
              <div class="address-block">
                <h3>To:</h3>
                <p class="address">${invoiceData.to.address}</p>
                ${invoiceData.to.businessName ? `<p>${invoiceData.to.businessName}</p>` : ''}
                ${invoiceData.to.firstName ? `<p>${invoiceData.to.firstName} ${invoiceData.to.lastName}</p>` : ''}
                ${invoiceData.to.streetAddress ? `<p>${invoiceData.to.streetAddress}</p>` : ''}
                ${invoiceData.to.city ? `<p>${invoiceData.to.city}, ${invoiceData.to.country}</p>` : ''}
                ${invoiceData.to.taxRegistration ? `<p>VAT: ${invoiceData.to.taxRegistration}</p>` : ''}
              </div>
            </div>

            <div class="payment-details">
              <h3>Payment Details</h3>
              <p class="amount">${invoiceData.amount} ${invoiceData.currency}</p>
              <p><strong>Status:</strong> <span class="status-badge">${invoiceData.status}</span></p>
            </div>

            <div class="network-info">
              <h3>Network Information</h3>
              <table>
                <tr>
                  <th>Network</th>
                  <td>${invoiceData.network}</td>
                </tr>
                <tr>
                  <th>Payment Chain</th>
                  <td>${invoiceData.paymentChain}</td>
                </tr>
                <tr>
                  <th>Invoice Currency</th>
                  <td>${invoiceData.invoiceCurrency}</td>
                </tr>
                <tr>
                  <th>Settlement Currency</th>
                  <td>${invoiceData.settlementCurrency}</td>
                </tr>
                <tr>
                  <th>Request ID</th>
                  <td>${invoiceData.invoiceNumber}</td>
                </tr>
              </table>
            </div>

            ${invoiceData.items && invoiceData.items.length > 0 ? `
              <div class="items-table">
                <h3>Invoice Items</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoiceData.items.map((item: InvoiceItem) => `
                      <tr>
                        <td>${item.name || '-'}</td>
                        <td>${item.quantity || '-'}</td>
                        <td>${item.unitPrice || '-'} ${invoiceData.currency}</td>
                        <td>${item.discount || '-'}</td>
                        <td>${item.tax?.amount ? `${item.tax.amount}%` : '-'}</td>
                        <td>${item.total || '-'} ${invoiceData.currency}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}

            ${invoiceData.note ? `
              <div class="note">
                <h3>Note:</h3>
                <p>${invoiceData.note}</p>
              </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={exportToJSON}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Export to JSON
      </button>
      
      <div className="relative group">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
        >
          Export Invoice
        </button>
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg hidden group-hover:block z-50">
          {requests.map((request) => (
          <button
          key={request.requestId}
          onClick={() => exportToPDF(request)}
          className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex flex-col gap-1 border-b border-gray-800 last:border-0"
        >
          <span className="text-gray-500 text-xs font-mono">
            {formatRequestId(request.requestId)}
          </span>
          {/* <span className="text-gray-500 text-xs font-mono">
            {request.requestId}
          </span> */}
        </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

# src/components/FilterBar.tsx

```tsx
import { useState } from 'react';
import { utils } from 'ethers';
import { RequestSummary } from '../types';

interface FilterBarProps {
  requests: RequestSummary[];
  onFilterChange: (filtered: RequestSummary[]) => void;
}

export default function FilterBar({ requests, onFilterChange }: FilterBarProps) {
  const [sortBy, setSortBy] = useState('date');
  const [filterState, setFilterState] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const applyFilters = () => {
    let filtered = [...requests];

    if (filterState !== 'all') {
      filtered = filtered.filter(req => req.state === filterState);
    }

    if (minAmount) {
      filtered = filtered.filter(req => 
        Number(utils.formatEther(req.expectedAmount)) >= Number(minAmount)
      );
    }

    if (maxAmount) {
      filtered = filtered.filter(req => 
        Number(utils.formatEther(req.expectedAmount)) <= Number(maxAmount)
      );
    }

    switch(sortBy) {
      case 'date':
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'amount':
        filtered.sort((a, b) => 
          Number(utils.formatEther(b.expectedAmount)) - 
          Number(utils.formatEther(a.expectedAmount))
        );
        break;
    }

    onFilterChange(filtered);
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        className="bg-gray-900/50 text-white px-4 py-2 rounded-lg"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          applyFilters();
        }}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      <select
        className="bg-gray-900/50 text-white px-4 py-2 rounded-lg"
        value={filterState}
        onChange={(e) => {
          setFilterState(e.target.value);
          applyFilters();
        }}
      >
        <option value="all">All States</option>
        <option value="created">Created</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="number"
        placeholder="Min Amount (ETH)"
        className="bg-gray-900/50 text-white px-4 py-2 rounded-lg"
        value={minAmount}
        onChange={(e) => {
          setMinAmount(e.target.value);
          applyFilters();
        }}
      />

      <input
        type="number"
        placeholder="Max Amount (ETH)"
        className="bg-gray-900/50 text-white px-4 py-2 rounded-lg"
        value={maxAmount}
        onChange={(e) => {
          setMaxAmount(e.target.value);
          applyFilters();
        }}
      />
    </div>
  );
}   
```

# src/components/LandingPage.tsx

```tsx
'use client';

import React from 'react';
import { Globe, FileText, TrendingUp, Shield } from 'lucide-react';
import ConnectWallet from './ConnectWallet';

interface LandingPageProps {
  onConnect: (address: string) => void;
}

export default function LandingPage({ onConnect }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-[#0a051e]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Request Network Analytics
            <span className="text-blue-500"> (Sepolia)</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Track, analyze, and manage your Request Network payments with powerful analytics and insights
          </p>
          <ConnectWallet onConnect={onConnect} isConnected={false} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">Track payment patterns, monitor success rates, and analyze transaction trends</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <div className="bg-purple-500/10 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Reputation System</h3>
            <p className="text-gray-400">Build trust with a comprehensive payment reliability scoring system</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <div className="bg-green-500/10 p-3 rounded-lg w-fit mb-4">
              <FileText className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Professional Exports</h3>
            <p className="text-gray-400">Generate detailed reports and professional invoices from your payment data</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <div className="bg-yellow-500/10 p-3 rounded-lg w-fit mb-4">
              <Globe className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Web3 Native</h3>
            <p className="text-gray-400">Seamlessly integrate with MetaMask and interact with the Sepolia testnet</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Decentralized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Real-time</div>
              <div className="text-gray-400">Data Updates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Secure</div>
              <div className="text-gray-400">Web3 Integration</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

# src/components/ReputationSystem.tsx

```tsx
import React, { useMemo } from 'react';
import { utils } from 'ethers';  // Change this line
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import AIReputationSystem, { PaymentData, AIInsights } from '../lib/aiSystem';

interface ReputationScore {
  address: string;
  totalTransactions: number;
  averagePaymentTime: number;
  successRate: number;
  totalValue: number;
  reputationScore: number;
  paymentHistory: {
    date: string;
    amount: number;
    paymentTime: number;
  }[];
}

interface ReputationSystemProps {
  requests: any[];
  address: string | null;
}

const ReputationSystem = ({ requests, address }: ReputationSystemProps) => {
  const aiSystem = new AIReputationSystem();

  const calculateReputationScore = ({
    successRate,
    averagePaymentTime,
    totalTransactions,
    totalValue
  }: {
    successRate: number;
    averagePaymentTime: number;
    totalTransactions: number;
    totalValue: number;
  }) => {
    // Weights for different factors
    const weights = {
      successRate: 0.4,
      paymentTime: 0.3,
      transactionCount: 0.2,
      value: 0.1
    };

    // Normalize payment time (0-100, where 0 days = 100 points, 30+ days = 0 points)
    const paymentTimeScore = Math.max(0, 100 - (averagePaymentTime / 30) * 100);

    // Normalize transaction count (logarithmic scale)
    const transactionScore = Math.min(100, (Math.log(totalTransactions + 1) / Math.log(100)) * 100);

    // Normalize value (logarithmic scale, assuming 100 ETH as max)
    const valueScore = Math.min(100, (Math.log(totalValue + 1) / Math.log(100)) * 100);

    // Calculate weighted score
    return Math.round(
      successRate * weights.successRate +
      paymentTimeScore * weights.paymentTime +
      transactionScore * weights.transactionCount +
      valueScore * weights.value
    );
  };

  const AddressLabel = ({ address, currentUserAddress }: { address: string; currentUserAddress: string }) => {
    if (address === currentUserAddress) {
      return <span className="text-blue-400 text-sm">(Your Address)</span>;
    }
    
    // Check if this address has sent requests to the current user
    const hasSentRequests = requests.some(req => req.payee === address);
    // Check if this address has received requests from the current user
    const hasReceivedRequests = requests.some(req => req.payee === currentUserAddress);
  
    if (hasSentRequests) {
      return <span className="text-yellow-400 text-sm">(Request Sender)</span>;
    }
    if (hasReceivedRequests) {
      return <span className="text-green-400 text-sm">(Request Receiver)</span>;
    }
    
    return null;
  };

  const reputationScores = useMemo(() => {
    // Group requests by payer/payee
    const addressMap = new Map<string, {
      sent: any[];
      received: any[];
    }>();
    
    requests.forEach(req => {
      // Initialize both addresses if not seen before
      const payerAddr = address!; // current user address
      const payeeAddr = req.payee;
    
      if (!addressMap.has(payerAddr)) {
        addressMap.set(payerAddr, { sent: [], received: [] });
      }
      if (!addressMap.has(payeeAddr)) {
        addressMap.set(payeeAddr, { sent: [], received: [] });
      }
    
      // Record the transaction for both parties
      addressMap.get(payeeAddr)!.received.push(req);
      addressMap.get(payerAddr)!.sent.push(req);
    });

    // Calculate reputation scores
    const scores = new Map<string, ReputationScore>();

    addressMap.forEach((data, addr) => {
      const { sent, received } = data;
      const allTransactions = [...sent, ...received];

      if (allTransactions.length === 0) return;

      // Calculate metrics
      const totalTransactions = allTransactions.length;
      const successfulTransactions = allTransactions.filter(tx => 
        // Check for both 'paid' and 'complete' states
        tx.state === 'paid' || tx.state === 'complete'
      ).length;
      const successRate = (successfulTransactions / totalTransactions) * 100;

      // Calculate average payment time (assuming paid transactions have a paidTimestamp)
      const paymentTimes = allTransactions
      .filter(tx => tx.state === 'paid' && tx.paidTimestamp)
      .map(tx => {
        // Calculate time difference in days
        const created = new Date(tx.timestamp * 1000);
        const paid = new Date(tx.paidTimestamp * 1000);
        return (paid.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      });
      const averagePaymentTime = paymentTimes.length > 0 
        ? paymentTimes.reduce((a, b) => a + b, 0) / paymentTimes.length / (24 * 3600) // Convert to days
        : 0;

      // Calculate total value
      const totalValue = allTransactions.reduce((sum, tx) => 
        sum + Number(utils.formatEther(tx.expectedAmount)), 0);

      // Calculate reputation score (0-100)
      const reputationScore = calculateReputationScore({
        successRate,
        averagePaymentTime,
        totalTransactions,
        totalValue
      });

      
      // Store payment history for trends
      const paymentHistory = allTransactions.map(tx => ({
        date: new Date(tx.timestamp * 1000).toISOString().split('T')[0],
        amount: Number(utils.formatEther(tx.expectedAmount)),
        paymentTime: tx.paidTimestamp ? (tx.paidTimestamp - tx.timestamp) / (24 * 3600) : 0
      }));

      const uniqueAddresses = new Set([...requests.map(req => req.payee), address]);

      const maxValue = Math.max(...paymentHistory.map(h => h.amount));
    const normalizedHistory = paymentHistory.map(h => ({
      ...h,
      normalizedAmount: (h.amount / maxValue) * 100
    }));

      scores.set(addr, {
        address: addr,
        totalTransactions,
        averagePaymentTime,
        successRate,
        totalValue,
        reputationScore,
        paymentHistory
      });
    });

    return Array.from(scores.values());
  }, [requests, address]);

const processRequestsForAI = (requests: any[]): PaymentData[] => {
    return requests.map(req => ({
      amount: Number(utils.formatEther(req.expectedAmount)),
      timeToPay: req.state === 'paid' ? 
        ((req.paidTimestamp || req.timestamp) - req.timestamp) / (24 * 3600) : 0,
      isOnTime: req.state === 'paid',
      frequency: 1, // You can calculate this based on your needs
      successRate: req.state === 'paid' ? 1 : 0
    }));
  };

  // Get AI predictions and insights
  const getAIInsights = (requests: any[]) => {
    const processedData = processRequestsForAI(requests);
    return {
      score: aiSystem.calculateReputationScore(address || '', processedData),
      riskLevel: aiSystem.getPaymentRiskLevel(address || '', processedData),
      predictedNextPayment: aiSystem.getPredictedPaymentDate(processedData),
      insights: aiSystem.generateInsights(processedData)
    };
  };

  // Add this inside your component where you want to display AI insights
  const aiInsights = getAIInsights(requests);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Payment Reputation Scores</h2>
            {/* AI Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">AI Analysis</h3>
          <div className="space-y-4">
            <div>
              <span className="text-gray-400">Risk Level:</span>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                aiInsights.riskLevel === 'LOW' ? 'bg-green-500/20 text-green-400' :
                aiInsights.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {aiInsights.riskLevel}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Predicted Next Payment:</span>
              <span className="ml-2 text-white">
                {aiInsights.predictedNextPayment.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
          <ul className="space-y-2">
            {aiInsights.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span className="text-gray-300">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reputationScores.map(score => (
          <div 
            key={score.address}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
            <div>
  <h3 className="text-gray-400 font-medium">Address</h3>
  <p className="text-white font-mono">
    {`${score.address.slice(0, 6)}...${score.address.slice(-4)}`}
    <AddressLabel address={score.address} currentUserAddress={address!} />
  </p>
</div>
              <div className={`text-2xl font-bold ${
                score.reputationScore >= 80 ? 'text-green-400' :
                score.reputationScore >= 60 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {score.reputationScore}
              </div>
            </div>
            
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-white">{score.successRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Payment Time</span>
                <span className="text-white">{score.averagePaymentTime.toFixed(1)} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Transactions</span>
                <span className="text-white">{score.totalTransactions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Value</span>
                <span className="text-white">{score.totalValue.toFixed(2)} ETH</span>
              </div>
            </div>

            {/* Payment History Chart */}
            <div className="mt-4 h-[150px]">
              <BarChart
                width={300}
                height={150}
                data={score.paymentHistory}
                margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#fff"
                  tick={false}
                />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="amount" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReputationSystem;
```

# src/components/RequestDetails.tsx

```tsx
import { useState } from 'react';
import { utils } from 'ethers';
import { RequestDetailsProps } from '../types';
import AddressDisplay from './AddressDisplay';

const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  });
};

const RequestDetails = ({ request, onBack }: RequestDetailsProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(request.requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="text-white/80 hover:text-white"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-white">Request Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-mono">{request.requestId}</span>
          <button 
            onClick={copyToClipboard}
            className="text-white/60 hover:text-white/80"
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Status</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              request.state === 'created' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {request.state}
            </span>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Network</h3>
            <p>Sepolia</p>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Payee</h3>
          <AddressDisplay address={request.payee} />
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Expected Amount</h3>
          <p>{utils.formatEther(request.expectedAmount)} {request.currencySymbol}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Created</h3>
          <p>{formatTimestamp(request.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
```

# src/components/RequestsTable.tsx

```tsx
import { utils } from 'ethers';
import type { RequestsTableProps } from '../types';

export default function RequestsTable({ requests, isLoading }: RequestsTableProps) {
  if (isLoading) return <div>Loading requests...</div>;
  
  if (requests.length === 0) return <div>No requests found</div>;

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-gray-800">Request ID</th>
            <th className="px-6 py-3 text-left text-gray-800">Payee</th>
            <th className="px-6 py-3 text-left text-gray-800">Amount</th>
            <th className="px-6 py-3 text-left text-gray-800">State</th>
            <th className="px-6 py-3 text-left text-gray-800">Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.requestId} className="border-t hover:bg-gray-100 transition-colors">
              <td className="px-6 py-4 text-gray-800">{`${request.requestId.slice(0, 8)}...`}</td>
              <td className="px-6 py-4 text-gray-800">{`${request.payee.slice(0, 8)}...`}</td>
              <td className="px-6 py-4 font-semibold text-blue-600">
                {utils.formatUnits(request.expectedAmount, 18)}
              </td>
              <td className="px-6 py-4 text-gray-800">{request.state}</td>
              <td className="px-6 py-4 text-gray-800">
                {new Date(request.timestamp * 1000).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

# src/lib/aiSystem.ts

```ts
// src/lib/aiSystem.ts

export interface PaymentData {
  amount: number;
  timeToPay: number;
  isOnTime: boolean;
  frequency: number;
  successRate: number;
}

export interface AIInsights {
  score: number;
  riskLevel: string;
  predictedNextPayment: Date;
  insights: string[];
}

export default class AIReputationSystem {
  private weights = {
    paymentHistory: 0.3,
    timelinessScore: 0.25,
    amountReliability: 0.2,
    frequencyScore: 0.15,
    volatilityScore: 0.1
  };

  public calculateReputationScore(address: string, payments: PaymentData[]): number {
    if (payments.length === 0) return 0;

    const successRate = this.calculateSuccessRate(payments);
    const timeliness = this.calculateTimelinessScore(payments);
    const amountReliability = this.calculateAmountReliability(payments);
    const frequencyScore = this.calculateFrequencyScore(payments);
    const volatilityScore = this.calculateVolatilityScore(payments);

    const finalScore = (
      successRate * this.weights.paymentHistory +
      timeliness * this.weights.timelinessScore +
      amountReliability * this.weights.amountReliability +
      frequencyScore * this.weights.frequencyScore +
      volatilityScore * this.weights.volatilityScore
    );

    return Math.min(100, Math.max(0, finalScore));
  }

  private calculateSuccessRate(payments: PaymentData[]): number {
    const successful = payments.filter(p => p.isOnTime).length;
    return (successful / payments.length) * 100;
  }

  private calculateTimelinessScore(payments: PaymentData[]): number {
    const decay = 0.1;
    return payments.reduce((score, payment) => {
      const daysLate = Math.max(0, payment.timeToPay - 30);
      return score + (100 * Math.exp(-decay * daysLate));
    }, 0) / payments.length;
  }

  private calculateAmountReliability(payments: PaymentData[]): number {
    const amounts = payments.map(p => p.amount);
    const mean = amounts.reduce((a, b) => a + b) / amounts.length;
    const variance = amounts.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / amounts.length;
    const standardDeviation = Math.sqrt(variance);
    
    return Math.max(0, 100 - (standardDeviation / mean) * 100);
  }

  private calculateFrequencyScore(payments: PaymentData[]): number {
    const averageFrequency = payments.reduce((acc, p) => acc + p.frequency, 0) / payments.length;
    return Math.min(100, averageFrequency * 10);
  }

  private calculateVolatilityScore(payments: PaymentData[]): number {
    const timeDeltas = payments.slice(1).map((payment, i) => {
      return Math.abs(payment.timeToPay - payments[i].timeToPay);
    });
    
    const averageVolatility = timeDeltas.length > 0 
      ? timeDeltas.reduce((a, b) => a + b, 0) / timeDeltas.length 
      : 0;
    return Math.max(0, 100 - averageVolatility);
  }

  public getPredictedPaymentDate(payments: PaymentData[]): Date {
    if (payments.length < 2) return new Date();

    const intervals = payments.slice(1).map((payment, i) => {
      return payment.timeToPay - payments[i].timeToPay;
    });

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return new Date(Date.now() + averageInterval * 24 * 60 * 60 * 1000);
  }

  public getPaymentRiskLevel(address: string, payments: PaymentData[]): string {
    const score = this.calculateReputationScore(address, payments);
    
    if (score >= 80) return 'LOW';
    if (score >= 60) return 'MEDIUM';
    return 'HIGH';
  }

  public generateInsights(payments: PaymentData[]): string[] {
    const insights: string[] = [];
    const score = this.calculateReputationScore('', payments);

    if (score < 60) {
      insights.push('Payment reliability needs improvement');
      if (payments.filter(p => !p.isOnTime).length > payments.length * 0.3) {
        insights.push('High rate of late payments detected');
      }
    }

    const volatility = this.calculateVolatilityScore(payments);
    if (volatility < 50) {
      insights.push('Payment patterns are irregular');
    }

    if (insights.length === 0) {
      insights.push('Payment history looks healthy');
      insights.push('Consistent payment patterns detected');
    }

    return insights;
  }
}
```

# src/lib/requestClient.ts

```ts
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { providers } from 'ethers';

export const getRequestClient = (provider: providers.Web3Provider) => {
  const web3SignatureProvider = new Web3SignatureProvider(provider);
  
  return new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: 'https://sepolia.gateway.request.network/',
    },
    signatureProvider: web3SignatureProvider,
  });
};
```

# src/types/index.ts

```ts
export interface RequestSummary {
  requestId: string;
  payee: string;
  expectedAmount: string;
  timestamp: number;
  state: string;
  currencySymbol: string;
}

export interface ConnectWalletProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  address?: string;
}

export interface RequestsTableProps {
  requests: RequestSummary[];
  isLoading: boolean;
}

export interface DashboardProps {
  requests: RequestSummary[];
  address: string | null;
  isLoading: boolean;
}
  
  declare global {
    interface Window {
      ethereum: any;
    }
  }
  export interface RequestSummary {
    requestId: string;
    payee: string;
    expectedAmount: string;
    timestamp: number;
    state: string;
    currencySymbol: string;
  }
  
  export interface RequestDetailsProps {
    request: RequestSummary;
    onBack: () => void;
  }
  
  export interface DashboardProps {
    requests: RequestSummary[];
    address: string | null;
    isLoading: boolean;
  }

export interface TransactionData {
  blockNumber: number;
  timestamp: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
}

export interface RequestDetailsProps {
  request: RequestSummary;
  transactionData?: TransactionData;
  paymentReference?: string;
  gateway?: string;
}


```

# src/utils/formatters.ts

```ts

```

# src/utils/timeFormatter.ts

```ts
export const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp * 1000; // Convert timestamp to milliseconds
    
    // Convert diff to minutes/hours/days
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
  
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 30) {
      return `${days}d ago`;
    } else {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    }
  };
  
  export const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC'
    }) + ' UTC';
  };
```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

