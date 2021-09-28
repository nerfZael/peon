import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deterministic } = hre.deployments;
  const useProxy = !hre.network.live;
  const signer = await ethers.getSigner(deployer);

  const d = await(
    await deterministic("TestPeonImplementation", {
      contract: "TestPeonImplementation",
      from: deployer,
      args: [[deployer]],
      log: true,
    })
  ).deploy();

  await(
    await deterministic("UserContract", {
      contract: "UserContract",
      from: deployer,
      args: [d.address],
      log: true,
    })
  ).deploy();

  return !useProxy;
};
export default func;
func.id = "deploy";
func.tags = ["peon"];
