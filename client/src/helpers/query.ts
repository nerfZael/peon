import { Web3ApiClient } from "@web3api/client-js";
import { buildFuncCall } from "./buildFuncCall";

export const query = async (
  client: Web3ApiClient,
  uri: string,
  queryOrMutation: "query" | "mutation",
  funcName: string,
  argsNames: string[],
  argValues: any[]
): Promise<string> => {
  const call = buildFuncCall(funcName, argsNames, argValues);

  const { data, errors } = await client.query({
    uri: `w3://ens/rinkeby/${uri}`,
    query: `${queryOrMutation} {
      ${call.signature}
    }`,
    variables: call.variables
  });

  if (errors || !data) {
    console.log(errors);
    throw errors;
  }

  return data[funcName] as string;
};