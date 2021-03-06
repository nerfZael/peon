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

interface IPeonReceivableInterface extends ethers.utils.Interface {
  functions: {
    "respond(uint256,bytes32,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "respond",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "respond", data: BytesLike): Result;

  events: {
    "Response(uint256,address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Response"): EventFragment;
}

export type ResponseEvent = TypedEvent<
  [BigNumber, string, string] & {
    queryId: BigNumber;
    executor: string;
    responseHash: string;
  }
>;

export class IPeonReceivable extends BaseContract {
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

  interface: IPeonReceivableInterface;

  functions: {
    respond(
      queryId: BigNumberish,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  respond(
    queryId: BigNumberish,
    responseHash: BytesLike,
    response: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    respond(
      queryId: BigNumberish,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Response(uint256,address,bytes32)"(
      queryId?: null,
      executor?: null,
      responseHash?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { queryId: BigNumber; executor: string; responseHash: string }
    >;

    Response(
      queryId?: null,
      executor?: null,
      responseHash?: null
    ): TypedEventFilter<
      [BigNumber, string, string],
      { queryId: BigNumber; executor: string; responseHash: string }
    >;
  };

  estimateGas: {
    respond(
      queryId: BigNumberish,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    respond(
      queryId: BigNumberish,
      responseHash: BytesLike,
      response: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
