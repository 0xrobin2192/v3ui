import { ethers } from 'ethers';

export const BASE_ANDROMEDA = {
  id: 8453,
  preset: 'andromeda',
  hexId: `0x${Number(8453).toString(16)}`,
  token: 'ETH',
  name: 'base',
  rpcUrl: (INFURA_KEY) =>
    `https://base-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
  label: 'Base',
  isSupported: true,
  publicRpcUrl: 'https://base.publicnode.com',
  isTestnet: false,
};

export const BASE_SEPOLIA = {
  id: 84532,
  preset: 'andromeda',
  hexId: `0x${Number(84532).toString(16)}`,
  token: 'ETH',
  name: 'base-sepolia',
  rpcUrl: (INFURA_KEY) =>
    `https://base-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
  label: 'Base Sepolia',
  isSupported: true,
  publicRpcUrl: 'https://sepolia.base.org',
  isTestnet: true,
};

export const ARBITRUM_SEPOLIA = {
  id: 421614,
  preset: 'main',
  hexId: `0x${Number(421614).toString(16)}`,
  token: 'ETH',
  name: 'arbitrum-sepolia',
  rpcUrl: (INFURA_KEY) =>
    `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
  label: 'Arbitrum Sepolia',
  isSupported: true,
  publicRpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
  isTestnet: true,
};

  export const ARBITRUM = {
  id: 42161,
  preset: 'main',
  hexId: `0x${Number(42161).toString(16)}`,
  token: 'ETH',
  name: 'arbitrum',
  rpcUrl: (INFURA_KEY) =>
    `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
  label: 'Arbitrum',
  isSupported: true,
  publicRpcUrl: 'https://arb1.arbitrum.io/rpc',
  isTestnet: false,
};

const MAINNET = {
  id: 1,
  preset: 'main',
  hexId: '0x1',
  token: 'ETH',
  name: 'mainnet',
  rpcUrl: () => 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
  label: 'Ethereum Mainnet',
  isSupported: true,
  publicRpcUrl: 'https://ethereum.publicnode.com',
  isTestnet: false,
};

export const NETWORKS = [
    BASE_ANDROMEDA,
    MAINNET,
    BASE_SEPOLIA,
    ARBITRUM_SEPOLIA,
    ARBITRUM,
];

export const deploymentsWithERC7412 = [
  '8453-andromeda',
  '84532-andromeda',
  '42161-main',
  '421614-main',
  '42161-arbthetix',
];

class MockProvider extends ethers.providers.JsonRpcProvider {
  constructor() {
    super();
    this.mockResponses = {};
    
    // Set up some default mock responses
    this.setMockResponse('eth_chainId', [], '0x1'); // Mainnet
    this.setMockResponse('eth_blockNumber', [], '0x100000');
  }

  setMockResponse(method, params, response) {
    const key = this.getKey(method, params);
    this.mockResponses[key] = response;
  }

  async send(method, params) {
    const key = this.getKey(method, params);
    if (this.mockResponses.hasOwnProperty(key)) {
      return this.mockResponses[key];
    }
    throw new Error(`No mock response set for method: ${method} with params: ${JSON.stringify(params)}`);
  }

  getKey(method, params) {
    return `${method}:${JSON.stringify(params)}`;
  }
}

const mockProvider = new MockProvider();

export const useProviderForChain = () => mockProvider;
export const useDefaultProvider = () => mockProvider;
export const useWallet = () => ({
  activeWallet: {
    address: '0x1234567890123456789012345678901234567890',
    balance: {
      eth: '10000000000000000000'
    }
  },
  walletsInfo: {
    label: 'MetaMask',
    icon: 'https://example.com/metamask-icon.png'
  },
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
});
export const useGetNetwork = () => MAINNET;
export const useNetwork = () => ({
  network: MAINNET,
  setNetwork: () => Promise.resolve(),
  stubbed: true
});
export const useIsConnected = () => true;
export const useSigner = () => new ethers.VoidSigner('0x1234567890123456789012345678901234567890', mockProvider);
export const useProvider = () => mockProvider;