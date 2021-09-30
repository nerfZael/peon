import { Web3ApiClient } from "@web3api/client-js";
import { BytesLike, ethers } from "ethers";
import {
  defaultAbiCoder,
  keccak256
} from "ethers/lib/utils";
import { IPEON } from "../typechain";
import { getPolywrapperMethodMap } from "./getPolywrapperMethodMap";
import { query } from "./query";

export const processQuery = async (
  polywrapClient: Web3ApiClient,
  peonContract: IPEON,
  queryId: BytesLike,
  packageUri: string,
  func: BytesLike,
  args: BytesLike
) => {
  const polywrapperUri = packageUri;

  const methods = await getPolywrapperMethodMap(polywrapClient, polywrapperUri);

  const methodInfo = methods[func.toString()];
  if (!methodInfo) {
    throw "Function with the specified signature does not exist";
  }

  let decodedArgs: any[] = defaultAbiCoder.decode(
    methodInfo.argTypes,
    args
  ) as unknown as any;

  const response = await query(
    polywrapClient,
    polywrapperUri,
    methodInfo.queryOrMutation,
    methodInfo.methodName,
    methodInfo.argNames,
    decodedArgs
  );

  let responseData: BytesLike = defaultAbiCoder.encode(
    ["bytes32"].concat(methodInfo.returnTypes),
    [queryId, response]
  );

  const responseHash = keccak256(responseData);

  console.log("Sending response...");

  const respondTx = await peonContract.respond(
    queryId,
    responseHash,
    responseData,
    {
      gasPrice: ethers.utils.parseUnits("1.5", "gwei"),
    }
  );

  await respondTx.wait();
};
