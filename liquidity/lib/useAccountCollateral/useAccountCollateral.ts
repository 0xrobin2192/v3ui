import { stringToHash } from '@snx-v3/tsHelpers';
import { useDefaultProvider, useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { Wei, wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAllCollateralPriceUpdates } from '../useCollateralPriceUpdates';

export type AccountCollateralType = {
  tokenAddress: string;
  availableCollateral: Wei;
  totalAssigned: Wei;
  totalDeposited: Wei;
  totalLocked: Wei;
  symbol: string;
  displaySymbol: string;
};

export const loadAccountCollateral = async ({
  accountId,
  tokenAddresses,
  CoreProxy,
}: {
  accountId: string;
  tokenAddresses: string[];
  CoreProxy: ethers.Contract;
}) => {
  const calls = await Promise.all(
    tokenAddresses.flatMap((tokenAddress) => [
      CoreProxy.populateTransaction.getAccountAvailableCollateral(accountId, tokenAddress),
      CoreProxy.populateTransaction.getAccountCollateral(accountId, tokenAddress),
    ])
  );

  const decoder = (multicallEncoded: string | string[]) => {
    if (!Array.isArray(multicallEncoded)) throw Error('Expected array');
    return tokenAddresses.map((tokenAddress, i) => {
      const [availableCollateral] = CoreProxy.interface.decodeFunctionResult(
        'getAccountAvailableCollateral',
        multicallEncoded[i * 2]
      );
      const { totalAssigned, totalDeposited, totalLocked } =
        CoreProxy.interface.decodeFunctionResult(
          'getAccountCollateral',
          multicallEncoded[i * 2 + 1]
        );
      return {
        tokenAddress,
        availableCollateral: wei(availableCollateral),
        totalAssigned: wei(totalAssigned),
        totalDeposited: wei(totalDeposited),
        totalLocked: wei(totalLocked),
        symbol: '',
        displaySymbol: '',
        decimals: '',
      };
    });
  };
  return { decoder, calls };
};

export type AccountCollateralWithSymbol = AccountCollateralType & { symbol: string };

// export function useAccountCollateral({ accountId }: { accountId?: string }) {}
export function useAccountCollateral({
  accountId,
  includeDelegationOff,
}: {
  accountId?: string;
  includeDelegationOff?: boolean;
}) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const { data: collateralTypes } = useCollateralTypes(includeDelegationOff);

  const provider = useDefaultProvider();
  const { data: priceUpdateTxn } = usePriceUpdateTxn();

  const { data: systemToken } = useSystemToken();

  const tokens = React.useMemo(() => {
    if (collateralTypes && systemToken) {
      return collateralTypes.map(({ tokenAddress }) => tokenAddress).concat([systemToken.address]);
    }
  }, [collateralTypes, systemToken]);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'AccountCollateral', { accountId }],
    enabled: Boolean(network && provider && CoreProxy && accountId && tokens),
    queryFn: async function () {
      if (!(network && provider && CoreProxy && accountId && tokens)) {
        throw new Error('OMG');
      }

      const calls = await Promise.all(
        tokenAddresses.flatMap((tokenAddress) => [
          CoreProxy.populateTransaction.getAccountAvailableCollateral(accountId, tokenAddress),
          CoreProxy.populateTransaction.getAccountCollateral(accountId, tokenAddress),
        ])
      );

      const allCalls = [...calls];
      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }
      const data = await erc7412Call(network, provider, allCalls, decoder, 'useAccountCollateral');

      return data.map((x) => {
        if (`${systemToken.address}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()) {
          return Object.assign(x, {
            symbol: systemToken.symbol,
            displaySymbol: systemToken.name,
          });
        }
        const collateralType = collateralTypes.find(
          (c) => `${c.tokenAddress}`.toLowerCase() === `${x.tokenAddress}`.toLowerCase()
        );
        return Object.assign(x, {
          symbol: collateralType?.symbol ?? '',
          displaySymbol: collateralType?.displaySymbol ?? '',
          decimals: collateralType?.decimals ?? '18',
        });
      });
    },
  });
}

import { usePriceUpdateTxn } from '@snx-v3/usePriceUpdateTxn';

export function useAccountSpecificCollateral(accountId?: string, collateralAddress?: string) {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const provider = useProvider();
  const { data: priceUpdateTxn } = usePriceUpdateTxn();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountSpecificCollateral',
      { accountId },
      { token: collateralAddress },
    ],
    enabled: Boolean(
      network && provider && CoreProxy && accountId && collateralAddress && priceUpdateTxn
    ),
    queryFn: async function () {
      if (!(network && provider && CoreProxy && accountId && collateralAddress && priceUpdateTxn)) {
        throw 'OMFG';
      }
      const { calls, decoder } = await loadAccountCollateral({
        accountId,
        tokenAddresses: [collateralAddress],
        CoreProxy,
      });
      const data = await erc7412Call({
        network,
        provider,
        calls,
        decoder,
        logLabel: 'useAccountSpecificCollateral',
        priceUpdateTxn,
      });

      return data.at(0);
    },
  });
}
