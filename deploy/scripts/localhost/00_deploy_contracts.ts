import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { TestPeonProxy, TestPeonProxy__factory } from "../../../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deterministic } = hre.deployments;
  const useProxy = !hre.network.live;
  const signer = await ethers.getSigner(deployer);

  const proxy = await(
    await deterministic("TestPeonProxy", {
      contract: "TestPeonProxy",
      from: deployer,
      args: [deployer],
      log: true,
    })
  ).deploy();

  const peon = await(
    await deterministic("TestPeonImplementation", {
      contract: "TestPeonImplementation",
      from: deployer,
      args: [deployer, [deployer]],
      log: true,
    })
  ).deploy();

  await(
    await deterministic("UserContract", {
      contract: "UserContract",
      from: deployer,
      args: [proxy.address],
      log: true,
    })
  ).deploy();

  const proxyContract = TestPeonProxy__factory.connect(proxy.address, signer);
  await proxyContract.setPeon(peon.address);

  return !useProxy;
};
export default func;
func.id = "deploy";
func.tags = ["peon"];
