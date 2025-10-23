import { expect } from "chai";
import { ethers } from "hardhat";

describe("MedicalRecordsEnhanced", function () {
  let medicalRecords;
  let owner, patient, doctor, unauthorized;
  
  beforeEach(async function () {
    [owner, patient, doctor, unauthorized] = await ethers.getSigners();
    
    const MedicalRecords = await ethers.getContractFactory("MedicalRecordsEnhanced");
    medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.deployed();
  });
  
  describe("Security Features", function () {
    it("should initialize with owner", async function () {
      expect(await medicalRecords.owner()).to.equal(owner.address);
    });
    
    it("should enforce time lock for access grants", async function () {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 5000; // Less than 1 day
      
      await expect(
        medicalRecords.connect(patient).grantAccess(doctor.address, futureTimestamp)
      ).to.be.revertedWith("Expiry must be at least 1 day in future");
    });
    
    it("should allow owner to pause contract", async function () {
      await medicalRecords.connect(owner).pause();
      const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test data"));
      
      await expect(
        medicalRecords.connect(patient).addRecord(dataHash, "metadata")
      ).to.be.revertedWith("Pausable: paused");
    });
    
    it("should prevent non-owners from pausing", async function () {
      await expect(
        medicalRecords.connect(patient).pause()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  
  describe("Record Management", function () {
    it("should validate record inputs", async function () {
      await expect(
        medicalRecords.connect(patient).addRecord(ethers.constants.HashZero, "metadata")
      ).to.be.revertedWith("Invalid data hash");
      
      await expect(
        medicalRecords.connect(patient).addRecord("0x123", "")
      ).to.be.revertedWith("Metadata cannot be empty");
    });
  });
  
  // Include all existing tests from MedicalRecords.test.js with enhanced contract
});
