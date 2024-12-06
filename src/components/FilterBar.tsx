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