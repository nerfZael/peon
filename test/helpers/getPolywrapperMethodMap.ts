import { Web3ApiClient } from "@web3api/client-js";
import { parseSchema } from "@web3api/schema-parse";
import { solidityKeccak256 } from "ethers/lib/utils";

export const getPolywrapperMethodMap = async (client: Web3ApiClient, polywrapperUri: string): Promise<Record<string, any>> => {
  const map: any = {};

  const schema = await client.getSchema(`w3://ens/rinkeby/${polywrapperUri}`);

  const typeInfo = parseSchema(schema);

  for(const queryType of typeInfo.queryTypes) {
    for(const method of queryType.methods) {
      const argTypes = method.arguments.map(x => x.type.toLowerCase()).join(',');
      const argNames = method.arguments.map(x => x.name);

      const methodSignature = `${queryType.type.toLowerCase()}.${method.name}(${argTypes})`;

      const methodHash = solidityKeccak256(["string"],[methodSignature]);

      map[methodHash] = {
        argTypes: argTypes.split(','),
        argNames,
        queryOrMutation: queryType.type.toLowerCase(),
        methodName: method.name,
        returnTypes: [method.return.type.toLowerCase()]
      };
    }
  }

  return map;
};


