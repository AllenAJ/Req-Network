export interface RequestSummary {
    requestId: string;
    payee: string;
    expectedAmount: string;
    timestamp: number;
    state: string;
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
  
  declare global {
    interface Window {
      ethereum: any;
    }
  }