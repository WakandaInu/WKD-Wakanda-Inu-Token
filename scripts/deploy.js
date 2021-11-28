const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const WakandaInuToken = await ethers.getContractFactory("WakandaInuToken");
  const wakandaInuToken = await WakandaInuToken.deploy();
  await wakandaInuToken.deployed();
  console.log(`WakandaInu Token contract Deployed: ${wakandaInuToken.address}`);

  if (hre.network.name === "mainnet" || hre.network.name === "testnet") {
    await hre.run("verify:verify", {
      address: wakandaInuToken.address,
      constructorArguments: [],
    });
  } else {
    console.log("Contracts deployed to", hre.network.name, "network. Please verify them manually.");
  }
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
