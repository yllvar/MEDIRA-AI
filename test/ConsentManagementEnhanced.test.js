import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConsentManagementEnhanced", function () {
  let consentManagement;
  let owner, patient, researcher;
  
  beforeEach(async function () {
    [owner, patient, researcher] = await ethers.getSigners();
    
    const ConsentManagement = await ethers.getContractFactory("ConsentManagementEnhanced");
    consentManagement = await ConsentManagement.deploy();
    await consentManagement.deployed();
  });
  
  describe("Security Features", function () {
    it("should initialize with owner", async function () {
      expect(await consentManagement.owner()).to.equal(owner.address);
    });
    
    it("should enforce minimum consent duration", async function () {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 5000; // Less than 1 day
      
      await expect(
        consentManagement.connect(patient).giveConsent(
          true, false, true, futureTimestamp, "purpose-hash"
        )
      ).to.be.revertedWith("Expiry must be at least 1 day in future");
    });
    
    it("should validate purpose hash", async function () {
      await expect(
        consentManagement.connect(patient).giveConsent(
          true, false, true, 0, ""
        )
      ).to.be.revertedWith("Purpose hash cannot be empty");
    });
    
    it("should allow owner to pause contract", async function () {
      await consentManagement.connect(owner).pause();
      
      await expect(
        consentManagement.connect(patient).giveConsent(
          true, false, true, 0, "purpose-hash"
        )
      ).to.be.revertedWith("Pausable: paused");
    });
  });
  
  // Include all existing tests from ConsentManagement.test.js with enhanced contract
});
