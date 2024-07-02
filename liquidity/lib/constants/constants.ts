export const GWEI_DECIMALS = 9;
export const GAS_LIMIT_MULTIPLIER = 1.5;

export const INFURA_KEY = process.env.INFURA_KEY || '8678fe160b1f4d45ad3f3f71502fc57b';
export const ONBOARD_KEY = 'sec_jykTuCK0ZuqXWf3wNYqizxs2';

export const getSubgraphUrl = (networkName = 'optimism-mainnet') => {
  switch (networkName) {
    case 'mainnet':
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-mainnet/api';
    case 'sepolia':
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-sepolia/api';
    case 'optimism-mainnet':
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-optimism-mainnet/api';
    case 'arbitrum':
      return `https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-arbitrum-mainnet/api`;
    case 'base-sepolia':
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-base-sepolia-andromeda/api';
    case 'base':
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-base-mainnet-andromeda/api';
    default:
      return `https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-${networkName}/api`;
  }
};

export const getAprUrl = (networkId = 8453) => {
  switch (networkId) {
    case 8453:
      return 'https://api.synthetix.io/v3/base/sc-pool-apy';
    case 42161:
      return 'https://api.synthetix.io/v3/arbitrum/sc-pool-apy';
    default:
      return `https://api.synthetix.io/v3/base/sc-pool-apy`;
  }
};

export const SESSION_STORAGE_KEYS = {
  TERMS_CONDITIONS_ACCEPTED: 'TERMS_CONDITIONS_ACCEPTED',
};

export const offchainMainnetEndpoint =
  process.env.PYTH_MAINNET_ENDPOINT || 'https://synthetixab.rpc.p2p.world/';

export const offchainTestnetEndpoint =
  process.env.PYTH_TESTNET_ENDPOINT || 'https://synthetixab.rpc.p2p.world/';
