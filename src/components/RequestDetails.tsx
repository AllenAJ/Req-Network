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