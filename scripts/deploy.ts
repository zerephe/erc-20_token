import { ethers } from "hardhat";

async function main() {

  const VolkovCoin = await ethers.getContractFactory("VolkovCoin");
  const volkovToken = await VolkovCoin.deploy("Hello, Hardhat!");

  await volkovToken.deployed();

  console.log("Greeter deployed to:", volkovToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
