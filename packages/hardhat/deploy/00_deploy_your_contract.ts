import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  console.log(deployer);
  await deploy("YourContract", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  //swag token
  await deploy("SwagToken", {
    from: deployer,

    args: [],
    log: true,
    autoMine: true,
  });

  //light token
  await deploy("LightToken", {
    from: deployer,

    args: [],
    log: true,
    autoMine: true,
  });
  // SwapMultiHop
  await deploy("SwapMultiHop", {
    from: deployer,

    args: [],
    log: true,
    autoMine: true,
  });
  //SingleSwapToken
  await deploy("SingleSwapToken", {
    from: deployer,

    args: [],
    log: true,
    autoMine: true,
  });
  //LiquidityExamples
  // await deploy("LiquidityExamples", {
  //   from: deployer,

  //   args: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
  //   log: true,
  //   autoMine: true,
  // });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
