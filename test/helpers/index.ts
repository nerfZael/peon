import { expect } from "chai";
import { ContractTransaction } from "ethers";

export const expectEvent = async (
  tx: ContractTransaction,
  eventName: string,
  args: Record<string, any>
) => {
  const receivedArgs = await getEventArgs(tx, eventName);

  for (const arg of Object.keys(args)) {
    expect(receivedArgs[arg]).to.eql(args[arg], `${arg}`);
  }
};

export const getEventArgs = async (
  tx: ContractTransaction,
  eventName: string
): Promise<Record<string, any>> => {
  const result = await tx.wait();

  const event = result.events?.find((x) => x.event === eventName);

  const receivedArgs = event?.args;

  if (!receivedArgs) {
    throw `Received undefined arguments: ${eventName}`;
  }

  return receivedArgs;
};
