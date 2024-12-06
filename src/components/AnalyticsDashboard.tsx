import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { utils } from 'ethers';
import { DashboardProps, RequestSummary } from '../types';
import FilterBar from './FilterBar';
import ExportHandler from './ExportHandler';
import ReputationSystem from './ReputationSystem';
import AddressDisplay from './AddressDisplay';

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
                  <span className="text-white/80 text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
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
          {new Date(request.timestamp * 1000).toLocaleDateString()}
        </td>
      </tr>
    );
  })}
</tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}