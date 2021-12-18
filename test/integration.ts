import hre, { ethers, deployments, getNamedAccounts } from "hardhat";
import chai, { expect, use } from "chai";
import {
  BytesLike,
} from "ethers/lib/utils";
import {
  IPeon,
  IPeon__factory,
  TestPeonProxy,
  TestPeonProxy__factory,
  UserContract, UserContract__factory
} from "../typechain";
import { providers, Signer } from "ethers";
import { Web3ApiClient } from "@web3api/client-js";
import { processQuery } from "./helpers/processQuery";
import { setupWeb3ApiClient } from "./helpers/web3Api/setupClient";
import * as dotenv from 'dotenv';

dotenv.config();

describe("PEON", () => {
  let userContract: UserContract;
  let peonImpl: IPeon;
  let peonProxy: TestPeonProxy;

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

    peonImpl = IPeon__factory.connect(
      deploys["TestPeonImplementation"].address,
      ethers.provider
    );

    peonProxy = TestPeonProxy__factory.connect(
      deploys["TestPeonProxy"].address,
      ethers.provider
    );

    userContract = UserContract__factory.connect(
      deploys["UserContract"].address,
      ethers.provider
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
      "implementation1.eth",
      "query.speak(string)",
      "hello",
      {
        value: ethers.utils.parseEther("1.0")
      }
    );

    const receipt = await queryTx.wait();

    console.log("1", await getBalance(userContract.address));
    console.log("2", await getBalance(peonProxy.address));
    console.log("3", await getBalance(peonImpl.address));

    const queryId: BytesLike = receipt.events![2].args!.queryId;

    await nodePromise;

    console.log("1", await getBalance(userContract.address));
    console.log("2", await getBalance(peonProxy.address));
    console.log("3", await getBalance(peonImpl.address));

    const queryInfo = await userContract.queryInfos(queryId);
    expect(queryInfo.exists).to.equal(true);
    console.log(queryInfo);
  });

  const getBalance = async(address: string) => {
    return ethers.utils.formatEther(await ethers.provider.getBalance(address));
  };
});
