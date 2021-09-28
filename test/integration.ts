import hre, { ethers, deployments, getNamedAccounts } from "hardhat";
import chai, { expect } from "chai";
import {
  BytesLike,
} from "ethers/lib/utils";
import {
  IPEON,
  IPEON__factory,
  UserContract, UserContract__factory
} from "../typechain";
import { Signer } from "ethers";
import { Web3ApiClient } from "@web3api/client-js";
import { processQuery } from "./helpers/processQuery";
import { setupWeb3ApiClient } from "./helpers/web3Api/setupClient";
import * as dotenv from 'dotenv';

dotenv.config();

describe("PEON", () => {
  let userContract: UserContract;
  let peonImpl: IPEON;

  let owner: Signer;
  let nodeOperator: Signer;
  let user: Signer;
  let polywrapClient: Web3ApiClient;

  before(async () => {
    const [
      _owner,
      _user,
    ] = await ethers.getSigners();
    owner = _owner;
    nodeOperator = _owner;
    user = _user;
  });

  beforeEach(async () => {
    const deploys = await deployments.fixture(["peon"]);

    const provider = ethers.getDefaultProvider();

    peonImpl = IPEON__factory.connect(
      deploys["TestPeonImplementation"].address,
      provider
    );

    userContract = UserContract__factory.connect(
      deploys["UserContract"].address,
      provider
    );

    polywrapClient = setupWeb3ApiClient({
      ethersProvider: process.env.ETHERS_PROVIDER!,
      ipfsProvider: process.env.IPFS_PROVIDER!
    });
  
  });

  it("can query", async () => {

    peonImpl = peonImpl.connect(nodeOperator);
    userContract = userContract.connect(user);

    const nodePromise = new Promise((resolve) => {
      peonImpl.on(peonImpl.filters.Query(), async (queryId, packageUri, func, args) => {
        await processQuery(polywrapClient, peonImpl, queryId, packageUri, func, args);
        resolve(null);
      });
    });

    const queryTx = await userContract.someFunc(
      "implementation2.eth",
      "query.speak(string)",
      "hello"
    );

    const receipt = await queryTx.wait();

    const queryId: BytesLike = receipt.events![1].args!.queryId;

    await nodePromise;

    const queryInfo = await userContract.queryInfos(queryId);
    expect(queryInfo.exists).to.equal(true);
    console.log(queryInfo);
  });
});
