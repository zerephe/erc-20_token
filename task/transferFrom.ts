import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("transferFrom", "Transfer some tokens from address to another address")
  .addParam("from", "Type here address of sender")
  .addParam("to", "Type here address of recipient")
  .addParam("amount", "Amount of tokens")
  .setAction(async (args, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = await hre.ethers.getContractAt("VolkovCoin", contractAddress)

    const result = await volkovToken.transferFrom(args.from, args.to, args.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };