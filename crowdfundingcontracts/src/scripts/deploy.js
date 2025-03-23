const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Define campaign details
    const name = "Tech Startup Fundraiser";
    const description = "Raising funds for an innovative tech project.";
    const goal = hre.ethers.parseEther("10"); // 10 ETH goal
    const durationInDays = 30; // Campaign lasts for 30 days

    // Deploy contract with constructor arguments
    const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy(
        deployer.address,
        name,
        description,
        goal,
        durationInDays
    );

    await crowdfunding.waitForDeployment();

    console.log("Crowdfunding contract deployed at:", await crowdfunding.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
