import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  console.log("🚀 Deploying MEDIRA Smart Contracts...");
  
  // Deploy MedicalRecords
  const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy();
  await medicalRecords.deployed();
  
  // Deploy ConsentManagement
  const ConsentManagement = await ethers.getContractFactory("ConsentManagement");
  const consentManagement = await ConsentManagement.deploy();
  await consentManagement.deployed();
  
  console.log("✅ MedicalRecords deployed to:", medicalRecords.address);
  console.log("✅ ConsentManagement deployed to:", consentManagement.address);
  
  const deploymentInfo = {
    MedicalRecords: medicalRecords.address,
    ConsentManagement: consentManagement.address,
    network: network.name,
    timestamp: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    `deployments/deployment-${network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("📄 Deployment info saved to deployments/ directory");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
