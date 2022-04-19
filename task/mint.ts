import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("mint", "Mint some tokens")
  .addParam("to", "Address of recipient")
  .addParam("amount", "Amount of tokens")
  .setAction(async (taskArgs, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = await hre.ethers.getContractAt("VolkovCoin", contractAddress)

    const result = await volkovToken._mint(taskArgs.to, taskArgs.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };