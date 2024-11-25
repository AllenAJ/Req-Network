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