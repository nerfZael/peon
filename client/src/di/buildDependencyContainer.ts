import * as awilix from "awilix";
import { ethers } from "ethers";
import { NameAndRegistrationPair } from "awilix";
import { EthersConfig } from "../config/EthersConfig";
import { PolywrapClientConfig } from "../config/PolywrapClientConfig";
import { IpfsConfig } from "../config/IpfsConfig";
import { PeonClientConfig } from "../config/PeonClientConfig";
import { setupWeb3ApiClient } from "../web3Api/setupClient";
import { PeonClient } from "../PeonClient";

export const buildDependencyContainer = (
  extensionsAndOverrides?: NameAndRegistrationPair<unknown>
): awilix.AwilixContainer<any> => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    ipfsConfig: awilix.asClass(IpfsConfig).singleton(),
    peonClientConfig: awilix.asClass(PeonClientConfig).singleton(),
    ethersConfig: awilix.asClass(EthersConfig).singleton(),
    polywrapClientConfig: awilix.asClass(PolywrapClientConfig).singleton(),
    ethersProvider: awilix
      .asFunction(({ ethersConfig }) => {
        return ethers.providers.getDefaultProvider(
          ethersConfig.providerNetwork
        );
      })
      .singleton(),
    polywrapClient: awilix
      .asFunction(({ polywrapClientConfig, ethersProvider }) => {
        return setupWeb3ApiClient({
          ethersProvider: ethersProvider,
          ipfsProvider: polywrapClientConfig.ipfsProvider,
        });
      })
      .singleton(),
    peonClientSigner: awilix
      .asFunction(({ peonClientConfig, ethersProvider }) => {
        return new ethers.Wallet(
          peonClientConfig.clientPrivateKey,
          ethersProvider
        );
      })
      .singleton(),
    peonClient: awilix.asClass(PeonClient).singleton(),
    ...extensionsAndOverrides,
  });

  return container;
};
