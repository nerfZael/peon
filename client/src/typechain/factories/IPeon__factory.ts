/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IPeon, IPeonInterface } from "../IPeon";

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
        internalType: "string",
        name: "packageUri",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "func",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "Query",
    type: "event",
  },
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
        internalType: "string",
        name: "packageUri",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "func",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "callbackAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "callbackFunc",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "callbackGasLimit",
        type: "uint256",
      },
    ],
    name: "query",
    outputs: [
      {
        internalType: "uint256",
        name: "queryId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
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

export class IPeon__factory {
  static readonly abi = _abi;
  static createInterface(): IPeonInterface {
    return new utils.Interface(_abi) as IPeonInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IPeon {
    return new Contract(address, _abi, signerOrProvider) as IPeon;
  }
}