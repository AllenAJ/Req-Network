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