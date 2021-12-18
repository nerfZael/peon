import { Web3ApiClient } from "@web3api/client-js";
import { BigNumber, BytesLike } from "ethers";
import { defaultAbiCoder, keccak256, solidityKeccak256 } from "ethers/lib/utils";
import { IPeon } from "../../typechain";
import { getPolywrapperMethodMap } from "./getPolywrapperMethodMap";
import { query } from "./query";

export const processQuery = async (
  polywrapClient: Web3ApiClient,
  peonContract: IPeon, 
  queryId: BigNumber, 
  packageUri: string, 
  func: BytesLike, 
  args: BytesLike
) => {
  const polywrapperUri = packageUri;

  const methods = await getPolywrapperMethodMap(polywrapClient, polywrapperUri);

  const methodInfo = methods[func.toString()];
  if(!methodInfo) {
    throw "Function with the specified signature does not exist";
  }

  let decodedArgs: any[] = defaultAbiCoder.decode(methodInfo.argTypes, args) as unknown as any;

  const response = await query(polywrapClient, polywrapperUri, methodInfo.queryOrMutation, methodInfo.methodName,
    methodInfo.argNames, decodedArgs)

  let responseData: BytesLike = defaultAbiCoder.encode(
    ["uint256"].concat(methodInfo.returnTypes), 
    [queryId, response]
  );

  const responseHash = keccak256(
    responseData
  );

  const respondTx = await peonContract.respond(
    queryId,
    responseHash,
    responseData
  );

  await respondTx.wait();
};

