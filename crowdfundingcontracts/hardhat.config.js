require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.ALCHEMY_GOERLI_RPC || process.env.INFURA_GOERLI_RPC,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    opencampus: {
      url: "https://rpc.open-campus-codex.gelato.digital", // OpenCampus RPC URL
      chainId: 656476,  // The chain ID for OpenCampus
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./out",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
