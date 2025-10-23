import { run } from "hardhat";
import fs from "fs";

async function verify() {
  const deployment = JSON.parse(fs.readFileSync("deployments/deployment-prod.json"));
  
  await run("verify:verify", {
    address: deployment.MedicalRecords,
    contract: "contracts/MedicalRecordsOptimized.sol:MedicalRecordsOptimized",
    constructorArguments: [],
  });

  await run("verify:verify", {
    address: deployment.ConsentManagement, 
    contract: "contracts/ConsentManagementOptimized.sol:ConsentManagementOptimized",
    constructorArguments: [],
  });
}

verify();
