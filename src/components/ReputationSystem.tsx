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