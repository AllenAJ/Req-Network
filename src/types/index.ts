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
  }
  
  export interface DashboardProps {
  requests: RequestSummary[];
  address: string | null;
  isLoading: boolean;
}