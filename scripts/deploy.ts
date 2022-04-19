import { ethers } from "hardhat";

async function main() {

  const [owner] = await ethers.getSigners()
  const VolkovCoin = await ethers.getContractFactory("VolkovCoin", owner);
  const volkovToken = await VolkovCoin.deploy("VolkovCoin", "VLC");
 
  await volkovToken.deployed();

  console.log("Deployed to:", volkovToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export default {
  solidity: "0.8.4"
};