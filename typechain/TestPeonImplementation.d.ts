/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TestPeonImplementationInterface extends ethers.utils.Interface {
  functions: {
    "query(string,bytes32,bytes,address,bytes4)": FunctionFragment;
    "respond(bytes32,bytes32,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "query",
    values: [string, BytesLike, BytesLike, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "respond",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "query", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "respond", data: BytesLike): Result;

  events: {
    "Query(bytes32,string,bytes32,bytes)": EventFragment;
    "Response(bytes32,address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Query"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Response"): EventFragment;
}

export type QueryEvent = TypedEvent<
  [string, string, string, string] & {
    queryId: string;
    packageUri: string;
    func: string;
    args: string;
  }
>;

export type ResponseEvent = TypedEvent<
  [string, string, string] & {
    queryId: string;
    executor: string;
    responseHash: string;
  }
>;

export class TestPeonImplementation extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TestPeonImplementationInterface;

  functions: {
    query(
      packageUri: string,
      func: BytesLike,
      args: BytesLike,
      callbackAddress: string,
      callbackFunc: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    respond(
      queryId: BytesLike,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  query(
    packageUri: string,
    func: BytesLike,
    args: BytesLike,
    callbackAddress: string,
    callbackFunc: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  respond(
    queryId: BytesLike,
    responseHash: BytesLike,
    response: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    query(
      packageUri: string,
      func: BytesLike,
      args: BytesLike,
      callbackAddress: string,
      callbackFunc: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    respond(
      queryId: BytesLike,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Query(bytes32,string,bytes32,bytes)"(
      queryId?: null,
      packageUri?: null,
      func?: null,
      args?: null
    ): TypedEventFilter<
      [string, string, string, string],
      { queryId: string; packageUri: string; func: string; args: string }
    >;

    Query(
      queryId?: null,
      packageUri?: null,
      func?: null,
      args?: null
    ): TypedEventFilter<
      [string, string, string, string],
      { queryId: string; packageUri: string; func: string; args: string }
    >;

    "Response(bytes32,address,bytes32)"(
      queryId?: null,
      executor?: null,
      responseHash?: null
    ): TypedEventFilter<
      [string, string, string],
      { queryId: string; executor: string; responseHash: string }
    >;

    Response(
      queryId?: null,
      executor?: null,
      responseHash?: null
    ): TypedEventFilter<
      [string, string, string],
      { queryId: string; executor: string; responseHash: string }
    >;
  };

  estimateGas: {
    query(
      packageUri: string,
      func: BytesLike,
      args: BytesLike,
      callbackAddress: string,
      callbackFunc: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    respond(
      queryId: BytesLike,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    query(
      packageUri: string,
      func: BytesLike,
      args: BytesLike,
      callbackAddress: string,
      callbackFunc: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    respond(
      queryId: BytesLike,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}