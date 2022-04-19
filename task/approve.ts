import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("approve", "Approve address to use your tokens")
  .addParam("spender", "Type here address of spender")
  .addParam("amount", "Amount of tokens")
  .setAction(async (args, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = await hre.ethers.getContractAt("VolkovCoin", contractAddress)

    const result = await volkovToken.approve(args.spender, args.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };