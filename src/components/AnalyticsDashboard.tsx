import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { utils } from 'ethers';
import { DashboardProps, RequestSummary } from '../types';
import FilterBar from './FilterBar';
import ExportHandler from './ExportHandler';
import ReputationSystem from './ReputationSystem';
import AddressDisplay from './AddressDisplay';
import RequestDetails from './RequestDetails';
import { formatTimestamp } from '@/utils/timeFormatter';
import PaginatedTable from './PaginatedTable';
import Link from 'next/link';
import NavigationBar from './NavigationBar';
import { Award } from 'lucide-react';


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
  const [showExportModal, setShowExportModal] = useState(false);


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

  const stats = useMemo(() => {

    const totalEth = filteredByCurrency.reduce((sum, req) => 
    sum + Number(utils.formatEther(req.expectedAmount)), 0);
    
    const reputationScore = calculateReputationScore({
      successRate: (requests.filter(req => req.state === 'paid').length / requests.length) * 100,
      averagePaymentTime: 0, // You can calculate this if needed
      totalTransactions: requests.length,
      totalValue: totalEth
    });
    
    return {
      totalRequests: filteredByCurrency.length,
      totalValueEth: totalEth,
      totalValueUsd: exchangeRate ? totalEth * exchangeRate.ETH : null,
      uniqueCurrencies: new Set(filteredByCurrency.map(req => req.currencySymbol)).size,
      reputationScore
    };
  }, [filteredByCurrency, exchangeRate, requests]);

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
          <NavigationBar 
            address={address}
            onExportJSON={exportToJSON}
            onExportInvoice={() => setShowExportModal(true)}
            onSearch={setSearchQuery}
          />
          
          <main className="container mx-auto px-4 py-8">
            {selectedRequest ? (
              <RequestDetails 
                request={selectedRequest}
                onBack={() => setSelectedRequest(null)}
              />
            ) : (
              <div id="dashboard-content">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
  {/* Existing stat cards */}
  <div className={`bg-gradient-to-br rounded-2xl p-6 border border-gray-800 ${
    stats.reputationScore >= 80 ? 'from-green-500/10 to-emerald-500/10' :
    stats.reputationScore >= 60 ? 'from-yellow-500/10 to-orange-500/10' :
    'from-red-500/10 to-pink-500/10'
  }`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-400 font-medium mb-2">On-chain Credit Score</h3>
        <p className="text-3xl font-bold text-white">{stats.reputationScore}</p>
      </div>
      <div className={`${
        stats.reputationScore >= 80 ? 'text-green-400 bg-green-400/10' :
        stats.reputationScore >= 60 ? 'text-yellow-400 bg-yellow-400/10' :
        'text-red-400 bg-red-400/10'
      } p-3 rounded-full`}>
        <Award className="w-6 h-6" />
      </div>
    </div>
    <p className="text-sm text-gray-400 mt-2">
      {stats.reputationScore >= 80 ? 'Excellent' :
       stats.reputationScore >= 60 ? 'Good' :
       'Needs Improvement'}
    </p>
  </div>
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
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Value Chart */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-800">
                    <h4 className="text-white mb-4">Payment Activity</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
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
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <ReputationSystem requests={filteredRequests} address={address} />

                {/* Requests Table */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-800">
                  <div className="p-6">
                    <FilterBar requests={filteredRequests} onFilterChange={setFilteredRequests} />
                  </div>
                  <PaginatedTable 
                    requests={filteredRequests} 
                    onRequestSelect={setSelectedRequest}
                    formatUsdValue={formatUsdValue}
                  />
                </div>
              </div>
            )}
          </main>

          {/* Export Modal */}
          {showExportModal && (
            <ExportHandler
              requests={requests}
              address={address}
              onClose={() => setShowExportModal(false)}
            />
          )}
        </div>
      )}
    </>
  );
                      }