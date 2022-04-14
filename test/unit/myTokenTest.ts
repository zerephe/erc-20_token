import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { Address } from "cluster";

describe("VolkovCoin", function () {

  let volkovToken: Contract;
  let owner: SignerWithAddress;
	let addr1: SignerWithAddress;
	let addr2: SignerWithAddress;
  let zeroAddress: String = ethers.constants.AddressZero;
  
  beforeEach(async function(){
    // Getting ContractFactory and Signers
    const Token = await ethers.getContractFactory("VolkovCoin");
    [owner, addr1, addr2] = await ethers.getSigners();
    
    volkovToken = await Token.deploy("VolkovCoin", "VLC");
    await volkovToken.deployed();
  });

  describe("Deploy", function(){

    it("Should verify the owner", async function () {
      // Expecting stored owner variable to be equal to signer owner 
      expect(await volkovToken.owner()).to.eq(owner.address);
    });

    it("Should be proper address", async function(){
      //Checking with waffle if address is proper
      expect(volkovToken.address).to.be.properAddress;
    });

    it("Should have const 18 decimals", async function(){
      expect(await volkovToken.decimals()).to.eq(18);
    });

    it("Should return name and symbol", async function(){
      expect(await volkovToken.getName()).to.eq("VolkovCoin");
      expect(await volkovToken.getSymbol()).to.eq("VLC");
    });
  });

  describe("Txs", function(){

    it("Should have some tokens after minting", async function(){
      await volkovToken._mint(10000);
      expect(await volkovToken.getTotalSupply()).to.eq(10000);
      expect(await volkovToken.balanceOf(owner.address)).to.eq(10000);
    });

    it("Should reduce total supply after burning", async function(){
      //Minting 10000 tokens
      await volkovToken._mint(10000);
      expect(await volkovToken.getTotalSupply()).to.eq(10000);
      expect(await volkovToken.balanceOf(owner.address)).to.eq(10000);
      
      //Burn 5000 tokens and check if total supply reduced
      await volkovToken._burn(5000);
      expect(await volkovToken.getTotalSupply()).to.eq(5000);
      expect(await volkovToken.balanceOf(owner.address)).to.eq(5000);
    });

    it("Should be reverted if not contract owner", async function(){
      await expect(volkovToken.connect(addr1)._mint(10000)).to.be.revertedWith("Access denied!");
    });

    it("Should be reverted if burn amount exeeded total supply", async function(){
      await expect(volkovToken._burn(10000)).to.be.revertedWith("Burn amount higher than balance!");
    });

    it("Should be transfered some token to specific a address", async function(){
      await volkovToken._mint(10000);
      await volkovToken.transfer(addr1.address, 5000);
      expect(await volkovToken.balanceOf(owner.address)).to.eq(5000);
      expect(await volkovToken.balanceOf(addr1.address)).to.eq(5000);
    });

    it("Should be reverted if transfered to zero address", async function(){
      await volkovToken._mint(10000);
      await expect(volkovToken.transfer(zeroAddress, 5000)).to.be.revertedWith("Recipient can't be zero address!");
    });

    it("Should be reverted if transfer amount exeeded balance", async function(){
      await expect(volkovToken.transfer(addr1.address, 5000)).to.be.revertedWith("Transfer amount exceeded!");
    });

    it("Should be emitted 'Transfer' when mint, burn, or transfer", async function(){
      await expect(volkovToken._mint(10000)).to.emit(volkovToken, 'Transfer')
                                               .withArgs(zeroAddress, owner.address, 10000);
      await expect(volkovToken._burn(5000)).to.emit(volkovToken, 'Transfer')
                                               .withArgs(owner.address, zeroAddress, 5000);
      await expect(volkovToken.transfer(addr1.address, 1000)).to.emit(volkovToken, 'Transfer')
                                               .withArgs(owner.address, addr1.address, 1000);
    });

    it("Should approve allowance for specific contract", async function(){
      await volkovToken._mint(10000);
      await volkovToken.approve(addr1.address, 5000);
      expect(await volkovToken.allowance(addr1.address)).to.eq(5000);
    });

    it("Should emit approval", async function(){
      await volkovToken._mint(10000);
      await expect(volkovToken.approve(addr1.address, 5000)).to.emit(volkovToken, 'Approval')
                                               .withArgs(owner.address, addr1.address, 5000);
    });

    it("Should be reverted if zero address being approved", async function(){
      await volkovToken._mint(10000);
      await expect(volkovToken.approve(zeroAddress, 1000)).to.be.revertedWith("Spender can't be zero address!");
    });

    it("Should transfer tokens from one to another address with owner approval", async function(){
      await volkovToken._mint(10000);
      await volkovToken.transfer(addr1.address, 5000);
      await volkovToken.connect(addr1).approve(owner.address, 4000);
      await volkovToken.transferFrom(addr1.address, addr2.address, 4000);

      expect(await volkovToken.balanceOf(addr1.address)).to.eq(1000);
      expect(await volkovToken.balanceOf(addr2.address)).to.eq(4000);
    });
    
    it("Should revert transfer if spender or recipient is zero address", async function(){
      await expect(volkovToken.transferFrom(zeroAddress, addr2.address, 5000)).to.be.revertedWith("Sender can't be zero address!");
      await expect(volkovToken.transferFrom(addr1.address, zeroAddress, 5000)).to.be.revertedWith("Recipient can't be zero address!");
    });

    it("Should revert transfer if transfer amount exeeded", async function(){
      await volkovToken._mint(10000);
      await volkovToken.transfer(addr1.address, 5000);
      await expect(volkovToken.transferFrom(addr1.address, addr2.address, 6000)).to.be.revertedWith("Transfer amount exceeded!");
    });

    it("Should revert transfer if allowance not approved", async function(){
      await volkovToken._mint(10000);
      await volkovToken.transfer(addr1.address, 5000);
      await volkovToken.connect(addr1).approve(owner.address, 4000);
      await expect(volkovToken.transferFrom(addr1.address, addr2.address, 4500)).to.be.revertedWith("Not enough allowance!");
    });
  });
});
