require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL ="https://eth-sepolia.g.alchemy.com/v2/RftshmrcddqMuJY8OTWBRrR-PUBgibgY";
const SEPOLIA_PRIVATE_KEY =
  "09049a6d636459450583a07aef71ce427f69a6e72fc83b1e9bd81da428292ba1";

module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};