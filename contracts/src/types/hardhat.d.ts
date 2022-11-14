/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Multicall3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall3__factory>;
    getContractFactory(
      name: "IRewardsManagerModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRewardsManagerModule__factory>;
    getContractFactory(
      name: "RewardDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RewardDistributor__factory>;
    getContractFactory(
      name: "RewardDistributorMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RewardDistributorMock__factory>;
    getContractFactory(
      name: "WETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETH9__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IRewardDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRewardDistributor__factory>;
    getContractFactory(
      name: "IRewardsManagerModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRewardsManagerModule__factory>;

    getContractAt(
      name: "Multicall3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall3>;
    getContractAt(
      name: "IRewardsManagerModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRewardsManagerModule>;
    getContractAt(
      name: "RewardDistributor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RewardDistributor>;
    getContractAt(
      name: "RewardDistributorMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RewardDistributorMock>;
    getContractAt(
      name: "WETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETH9>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IRewardDistributor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRewardDistributor>;
    getContractAt(
      name: "IRewardsManagerModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRewardsManagerModule>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
