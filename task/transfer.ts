import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("transfer", "Transfer some tokens")
  .addParam("to", "Type here address of recipient")
  .addParam("amount", "Amount of tokens")
  .setAction(async (taskArgs, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = await hre.ethers.getContractAt("VolkovCoin", contractAddress)

    const result = await volkovToken.transfer(taskArgs.to, taskArgs.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };