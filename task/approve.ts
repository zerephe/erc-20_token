import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import {abi} from '../artifacts/contracts/VolkovCoin.sol/VolkovCoin.json';

dotenv.config();

task("approve", "Approve address to use your tokens")
  .addParam("spender", "Type here address of spender")
  .addParam("amount", "Amount of tokens")
  .setAction(async (args, hre) => {
    const [signer] = await hre.ethers.getSigners()
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const volkovToken = new hre.ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const result = await volkovToken.approve(args.spender, args.amount);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };