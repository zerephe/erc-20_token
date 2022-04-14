import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import {abi} from '../artifacts/contracts/VolkovCoin.sol/VolkovCoin.json';

dotenv.config();

task("mint", "Mint some tokens")
  .addParam("amount", "Amount of tokens")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = new hre.ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const result = await volkovToken._mint(taskArgs.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };