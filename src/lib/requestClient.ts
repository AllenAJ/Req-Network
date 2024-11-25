import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { providers } from 'ethers';

export const getRequestClient = (provider: providers.Web3Provider) => {
  const web3SignatureProvider = new Web3SignatureProvider(provider);
  
  return new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: 'https://sepolia.gateway.request.network/',
    },
    signatureProvider: web3SignatureProvider,
  });
};