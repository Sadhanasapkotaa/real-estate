const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const realEstatePaymentContract = await ethers.deployContract("RealEstatePayment");
    const contract_address = await realEstatePaymentContract.getAddress();
    console.log("Contract address:", contract_address);
    saveFrontendFiles(contract_address);
    saveBackendFiles(contract_address);
}

function saveFrontendFiles(contract_address) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "frontend", "contracts");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ RealEstatePayment: contract_address }, undefined, 2)
    );
  
    const RealEstatePaymentArtifact = artifacts.readArtifactSync("RealEstatePayment");
  
    fs.writeFileSync(
      path.join(contractsDir, "RealEstatePayment.json"),
      JSON.stringify(RealEstatePaymentArtifact, null, 2)
    );
}

function saveBackendFiles(contract_address) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "backend", "contracts");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ RealEstatePayment: contract_address }, undefined, 2)
    );
  
    const RealEstatePaymentArtifact = artifacts.readArtifactSync("RealEstatePayment");
  
    fs.writeFileSync(
      path.join(contractsDir, "RealEstatePayment.json"),
      JSON.stringify(RealEstatePaymentArtifact, null, 2)
    );
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });