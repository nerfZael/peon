import { Web3ApiClient } from "@web3api/client-js";
import { ethers, Signer } from "ethers";
import { PeonClientConfig } from "./config/PeonClientConfig";
import { processQuery } from "./helpers/processQuery";
import { IPEON__factory } from "./typechain";

export class PeonClient {
  private peonClientSigner: Signer;
  private polywrapClient: Web3ApiClient;

  constructor(deps: {
    peonClientSigner: Signer;
    polywrapClient: Web3ApiClient
  }) {
    this.peonClientSigner = deps.peonClientSigner;
    this.polywrapClient = deps.polywrapClient;
  }

  async run(peonAddress: string): Promise<void> {
    console.log(`Listening for queries @ ${peonAddress}...`);
    const peonContract = IPEON__factory.connect(peonAddress, this.peonClientSigner);

    peonContract.on(peonContract.filters.Query(), async (queryId, packageUri, func, args) => {
      console.log(`Found query for uri=${packageUri}, queryId=${queryId}`);
      await processQuery(this.polywrapClient, peonContract, queryId, packageUri, func, args);
      console.log(`Finished processing query`);
    });
  }
}