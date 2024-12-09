import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Download, FileText } from 'lucide-react';

interface NavigationBarProps {
  address: string | null;
  onExportJSON: () => void;
  onExportInvoice: () => void;
  onSearch: (query: string) => void;
}

export default function NavigationBar({ 
  address, 
  onExportJSON, 
  onExportInvoice,
  onSearch 
}: NavigationBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="border-b border-gray-800 bg-[#0a051e]/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main navbar content */}
        <div className="h-16 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white mr-8">
              Request Network Analytics
            </h1>
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/tax" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Tax Reports
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onExportJSON}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Download size={16} />
                <span>Export JSON</span>
              </button>
              <button
                onClick={onExportInvoice}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <FileText size={16} />
                <span>Export Invoice</span>
              </button>
            </div>
            
            {address && (
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-white/80 text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search bar - Separate row */}
        <div className="py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search requests..."
              className="w-full md:w-96 bg-gray-900/50 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}