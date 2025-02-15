async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    const initialStake = ethers.parseEther("1000");
    const stakingToken = await ERC20Mock.deploy("StakeToken", "STK", deployer.address, initialStake);
    await stakingToken.waitForDeployment();
    console.log("Staking Token deployed to:", stakingToken.target);
  
    const JobBoard = await ethers.getContractFactory("JobBoard");
    const jobBoard = await JobBoard.deploy(stakingToken.target);
    await jobBoard.waitForDeployment();
    console.log("JobBoard deployed to:", jobBoard.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  