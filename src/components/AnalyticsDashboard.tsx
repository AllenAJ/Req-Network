import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { utils } from 'ethers';
import type { DashboardProps } from '../types';

export default function Dashboard({ requests, address }: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
  
  const stats = {
    totalRequests: requests.length,
    totalValue: requests.reduce((sum, req) => 
      sum + Number(utils.formatEther(req.expectedAmount)), 0)
  };

  const monthlyData: { [key: string]: number } = requests.reduce((acc: { [key: string]: number }, req) => {
    const month = new Date(req.timestamp * 1000).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + Number(utils.formatEther(req.expectedAmount));
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a051e]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0a051e]/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Request Network Analytics</h1>
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
              <span className="text-white/80 text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-gray-400 font-medium mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-white">{stats.totalRequests}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-gray-400 font-medium mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-white">{stats.totalValue.toFixed(2)} ETH</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-gray-400 font-medium mb-2">Network</h3>
            <p className="text-3xl font-bold text-white">Sepolia</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800 mb-8">
          <h3 className="text-lg font-medium text-white mb-6">Monthly Activity</h3>
          <div className="h-[300px]">
            <BarChart width={800} height={300} 
              data={Object.entries(monthlyData).map(([month, value]) => ({ month, value }))}
            >
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </BarChart>
          </div>
        </div>

        {/* Request Table - Updated styling */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Request ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Payee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">State</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.requestId} className="border-b border-gray-800/50 hover:bg-white/5">
                    <td className="px-6 py-4 text-white">{`${request.requestId.slice(0, 8)}...`}</td>
                    <td className="px-6 py-4 text-white">{`${request.payee.slice(0, 8)}...`}</td>
                    <td className="px-6 py-4 text-white font-medium">
                      {utils.formatEther(request.expectedAmount)} ETH
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.state === 'created' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {request.state}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {new Date(request.timestamp * 1000).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}