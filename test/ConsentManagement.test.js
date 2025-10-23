import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConsentManagement", function () {
  let consentManagement;
  let patient, researcher;
  
  beforeEach(async function () {
    [patient, researcher] = await ethers.getSigners();
    
    const ConsentManagement = await ethers.getContractFactory("ConsentManagement");
    consentManagement = await ConsentManagement.deploy();
    await consentManagement.deployed();
  });
  
  describe("Consent Management", function () {
    it("should allow patient to give consent", async function () {
      await consentManagement.connect(patient).giveConsent(
        true, false, true, 0, "purpose-hash"
      );
      
      const hasConsent = await consentManagement.hasConsent(
        patient.address, true, false, true
      );
      expect(hasConsent).to.be.true;
    });
    
    it("should allow patient to revoke consent", async function () {
      await consentManagement.connect(patient).giveConsent(
        true, false, true, 0, "purpose-hash"
      );
      
      await consentManagement.connect(patient).revokeConsent();
      
      const hasConsent = await consentManagement.hasConsent(
        patient.address, true, false, true
      );
      expect(hasConsent).to.be.false;
    });
  });
});
