import React, { useState, useMemo } from 'react';
import { utils } from 'ethers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RequestSummary } from '@/types';
import { PieChart, Pie, Cell, Legend } from 'recharts';

// Inside your TaxReports component, add this tax-focused mock data:
const categoryData = [
  { name: 'Business Operations', value: 30 },
  { name: 'Professional Services', value: 25 },
  { name: 'Travel & Entertainment', value: 15 },
  { name: 'Equipment & Software', value: 20 },
  { name: 'Marketing & Advertising', value: 10 }
];

const COLORS = ['#60A5FA', '#34D399', '#F87171', '#FBBF24', '#A78BFA'];

interface TaxReportsProps {
  requests: RequestSummary[];
}

const TaxReports: React.FC<TaxReportsProps> = ({ requests }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('CSV');

  // Calculate financial metrics
  const financialData = useMemo(() => {
    const filteredRequests = requests.filter(req => {
      const timestamp = new Date(req.timestamp * 1000);
      return (!startDate || timestamp >= new Date(startDate)) &&
             (!endDate || timestamp <= new Date(endDate));
    });

    const totalIncome = filteredRequests.reduce((sum, req) => 
      sum + Number(utils.formatEther(req.expectedAmount)), 0);

    // Simple mock data for expenses (you would replace this with real expense data)
    const expenses = totalIncome * 0.3; // Mock 30% expenses
    const netIncome = totalIncome - expenses;
    
    return {
      totalIncome,
      expenses,
      netIncome,
      taxEstimate: netIncome * 0.2 // Mock 20% tax rate
    };
  }, [requests, startDate, endDate]);

  // Generate monthly data for the chart
  const monthlyData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      const monthStr = month.toLocaleString('default', { month: 'numeric', year: '2-digit' });
      
      const monthRequests = requests.filter(req => {
        const reqDate = new Date(req.timestamp * 1000);
        return reqDate.getMonth() === month.getMonth() &&
               reqDate.getFullYear() === month.getFullYear();
      });

      const income = monthRequests.reduce((sum, req) => 
        sum + Number(utils.formatEther(req.expectedAmount)), 0);
      
      data.unshift({
        month: monthStr,
        income,
        expenses: income * 0.3 // Mock expenses
      });
    }
    return data;
  }, [requests]);

  const handleGenerateReport = () => {
    // Implementation for generating and downloading the report would go here
    console.log('Generating report...');
  };

  const handlePreview = () => {
    // Implementation for previewing the report would go here
    console.log('Previewing report...');
  };

  return (
    <div className="space-y-8">
      {/* Mock Data Notice */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
          <p className="text-yellow-500 font-medium">Prototype Mode</p>
            <p className="text-yellow-500/80 text-sm">
              This is a proof of concept using simulated calculations (30% expenses, sample tax rates). 
              For production use, this would integrate with tax authority APIs and financial data providers 
              (like Plaid, Codat) to fetch real expense data and apply jurisdiction-specific tax rules.
            </p>
          </div>
        </div>
      </div>      {/* Report Generation Form */}
      <div className="bg-gray-900/50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Generate Tax Report</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">End Date</label>
            <input
              type="date"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Format</label>
          <select
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option>CSV</option>
            <option>PDF</option>
            <option>JSON</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handlePreview}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Preview
          </button>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400">Total Income</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {financialData.totalIncome.toFixed(2)} ETH
              </p>
            </div>
            <div className="text-blue-400 bg-blue-400/10 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">Current Period</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400">Total Expenses</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {financialData.expenses.toFixed(2)} ETH
              </p>
            </div>
            <div className="text-red-400 bg-red-400/10 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Income</span>
              <span className="text-white">{financialData.totalIncome.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expenses</span>
              <span className="text-white">{financialData.expenses.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Net</span>
              <span className="text-white">{financialData.netIncome.toFixed(2)} ETH</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400">Net Income</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {financialData.netIncome.toFixed(2)} ETH
              </p>
            </div>
            <div className="text-green-400 bg-green-400/10 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Taxable Income</span>
              <span className="text-white">{financialData.netIncome.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Deductions</span>
              <span className="text-white">{(financialData.expenses * 0.5).toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax Estimate</span>
              <span className="text-white">{financialData.taxEstimate.toFixed(2)} ETH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Breakdown</h3>
          <h4 className="text-sm text-gray-400 mb-6">Income vs Expenses</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
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
                <Line type="monotone" dataKey="income" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-gray-800">
  <h3 className="text-lg font-semibold text-white mb-4">Category Distribution</h3>
  <h4 className="text-sm text-gray-400 mb-6">Tax Deductible Expenses by Category</h4>
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#fff'
          }}
          formatter={(value: any) => `${value}%`}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value: string) => (
            <span className="text-white text-sm">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-400">
      * Sample distribution of tax deductible expenses
    </p>
    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#60A5FA]"></span>
        Business Operations: Office rent, utilities, supplies
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
        Professional Services: Legal, accounting, consulting
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#F87171]"></span>
        Travel & Entertainment: Business trips, client meetings
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FBBF24]"></span>
        Equipment & Software: Hardware, licenses, subscriptions
      </li>
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span>
        Marketing & Advertising: Promotions, ads, events
      </li>
    </ul>
  </div>
</div>
      </div>
    </div>
  );
};

export default TaxReports;