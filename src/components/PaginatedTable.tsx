import React, { useState } from 'react';
import { utils } from 'ethers';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AddressDisplay from './AddressDisplay';
import { formatTimestamp } from '@/utils/timeFormatter';
import { RequestSummary } from '@/types';

interface PaginatedTableProps {
  requests: RequestSummary[];
  onRequestSelect: (request: RequestSummary) => void;
  formatUsdValue: (ethAmount: number) => string;
}

const PaginatedTable = ({ requests, onRequestSelect, formatUsdValue }: PaginatedTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
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
            {currentRequests.map((request) => {
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
                      onClick={() => onRequestSelect(request)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1}-{Math.min(endIndex, requests.length)} of {requests.length} requests
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/5'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/5'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;