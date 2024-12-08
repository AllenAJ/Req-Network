import { useState } from 'react';

interface AddressDisplayProps {
  address: string;
}

const AddressDisplay = ({ address }: AddressDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-mono">
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </span>
      <button
        onClick={copyToClipboard}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        {copied ? '✓' : '📋'}
      </button>
    </div>
  );
};

export default AddressDisplay;