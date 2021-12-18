/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IPeonReceivable,
  IPeonReceivableInterface,
} from "../IPeonReceivable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "queryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "responseHash",
        type: "bytes32",
      },
    ],
    name: "Response",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "queryId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "responseHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
    ],
    name: "respond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IPeonReceivable__factory {
  static readonly abi = _abi;
  static createInterface(): IPeonReceivableInterface {
    return new utils.Interface(_abi) as IPeonReceivableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPeonReceivable {
    return new Contract(address, _abi, signerOrProvider) as IPeonReceivable;
  }
}
