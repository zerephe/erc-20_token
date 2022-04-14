import * as dotenv from "dotenv";
import { task } from "hardhat/config";
import { abi } from '../artifacts/contracts/VolkovCoin.sol/VolkovCoin.json';

dotenv.config();

task("transferFrom", "Transfer some tokens from address to another address")
  .addParam("from", "Type here address of sender")
  .addParam("to", "Type here address of recipient")
  .addParam("amount", "Amount of tokens")
  .setAction(async (args, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = new hre.ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const result = await volkovToken.transferFrom(args.from, args.to, args.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };