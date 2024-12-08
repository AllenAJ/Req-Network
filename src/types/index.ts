export interface RequestSummary {
  requestId: string;
  payee: string;
  expectedAmount: string;
  timestamp: number;
  state: string;
  currencySymbol: string;
}

export interface ConnectWalletProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  address?: string;
}

export interface RequestsTableProps {
  requests: RequestSummary[];
  isLoading: boolean;
}

export interface DashboardProps {
  requests: RequestSummary[];
  address: string | null;
  isLoading: boolean;
}
  
  declare global {
    interface Window {
      ethereum: any;
    }
  }
  export interface RequestSummary {
    requestId: string;
    payee: string;
    expectedAmount: string;
    timestamp: number;
    state: string;
    currencySymbol: string;
  }
  
  export interface RequestDetailsProps {
    request: RequestSummary;
    onBack: () => void;
  }
  
  export interface DashboardProps {
    requests: RequestSummary[];
    address: string | null;
    isLoading: boolean;
  }

export interface TransactionData {
  blockNumber: number;
  timestamp: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
}

export interface RequestDetailsProps {
  request: RequestSummary;
  transactionData?: TransactionData;
  paymentReference?: string;
  gateway?: string;
}

export interface PaginatedTableProps {
  requests: RequestSummary[];
  onRequestSelect: (request: RequestSummary) => void;
}