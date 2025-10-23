import { expect } from "chai";
import { ethers } from "hardhat";

describe("MedicalRecords", function () {
  let medicalRecords;
  let patient, doctor, unauthorized;
  
  beforeEach(async function () {
    [patient, doctor, unauthorized] = await ethers.getSigners();
    
    const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.deployed();
  });
  
  describe("Record Management", function () {
    it("should allow patient to add medical record", async function () {
      const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test data"));
      const metadata = "encrypted metadata";
      
      await expect(medicalRecords.connect(patient).addRecord(dataHash, metadata))
        .to.emit(medicalRecords, "RecordAdded")
        .withArgs(patient.address, 0, dataHash, await ethers.provider.getBlock('latest').then(b => b.timestamp));
    });
    
    it("should prevent unauthorized users from adding records", async function () {
      const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test data"));
      const metadata = "encrypted metadata";
      
      await expect(
        medicalRecords.connect(unauthorized).addRecord(dataHash, metadata)
      ).to.be.reverted;
    });
  });
  
  describe("Access Control", function () {
    it("should allow patient to grant access to doctor", async function () {
      await medicalRecords.connect(patient).grantAccess(doctor.address, 0);
      
      const hasAccess = await medicalRecords.hasAccess(patient.address, doctor.address);
      expect(hasAccess).to.be.true;
    });
    
    it("should prevent unauthorized access to records", async function () {
      const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test data"));
      await medicalRecords.connect(patient).addRecord(dataHash, "metadata");
      
      await expect(
        medicalRecords.connect(unauthorized).getRecord(patient.address, 0)
      ).to.be.revertedWith("Unauthorized access");
    });
  });
});
