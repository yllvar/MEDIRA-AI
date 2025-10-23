import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  console.log("🚀 Deploying to Production...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MedicalRecords = await ethers.getContractFactory("MedicalRecordsOptimized");
  const medicalRecords = await MedicalRecords.deploy();
  await medicalRecords.deployed();

  const ConsentManagement = await ethers.getContractFactory("ConsentManagementOptimized");
  const consentManagement = await ConsentManagement.deploy();
  await consentManagement.deployed();

  const deploymentInfo = {
    MedicalRecords: medicalRecords.address,
    ConsentManagement: consentManagement.address,
    network: "polygon",
    timestamp: new Date().toISOString(),
    deployer: deployer.address
  };

  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }
  
  fs.writeFileSync("deployments/deployment-prod.json", JSON.stringify(deploymentInfo, null, 2));
  console.log("✅ Contracts deployed to Polygon mainnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
