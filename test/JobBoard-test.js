const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("JobBoard Contract", function () {
  let jobBoard, stakingToken;
  let owner, employer, applicant;
  // Use ethers.parseEther for ethers v6
  const initialStake = ethers.parseEther("1000");

  beforeEach(async function () {
    // Retrieve signers
    [owner, employer, applicant] = await ethers.getSigners();

    // Deploy a mock ERC20 token for staking using our ERC20Mock contract
    const Token = await ethers.getContractFactory("ERC20Mock");
    stakingToken = await Token.deploy("StakeToken", "STK", employer.address, initialStake);
    await stakingToken.waitForDeployment(); // Updated for ethers v6

    // Deploy the JobBoard contract with the stakingToken address
    const JobBoard = await ethers.getContractFactory("JobBoard");
    jobBoard = await JobBoard.deploy(stakingToken.target);
    await jobBoard.waitForDeployment(); // Updated for ethers v6

    // Approve the JobBoard contract to spend tokens on behalf of the employer
    await stakingToken.connect(employer).approve(jobBoard.target, initialStake);
  });

  describe("Posting a Job", function () {
    it("should allow posting a valid job", async function () {
      const stakeAmount = ethers.parseEther("10");

      // Post a job with a safe AI rating (e.g., 1)
      await expect(
        jobBoard.connect(employer).postJob("Frontend Developer", "Develop UI", 1, stakeAmount)
      ).to.emit(jobBoard, "JobPosted")
       .withArgs(1, employer.address, false);

      const job = await jobBoard.jobListings(1);
      expect(job.employer).to.equal(employer.address);
      expect(job.title).to.equal("Frontend Developer");
      expect(job.aiRating).to.equal(1);
      expect(job.stakeAmount).to.equal(stakeAmount);
      expect(job.status).to.equal(0); // 0 = Active (according to the enum)
      expect(job.flaggedAsMisleading).to.equal(false);
    });

    it("should flag a job if AI rating is 2 or 3", async function () {
      const stakeAmount = ethers.parseEther("10");

      // Post a job with AI rating 2, which should be flagged as misleading
      await expect(
        jobBoard.connect(employer).postJob("Backend Developer", "Develop API", 2, stakeAmount)
      ).to.emit(jobBoard, "JobPosted")
       .withArgs(1, employer.address, true);

      const job = await jobBoard.jobListings(1);
      expect(job.flaggedAsMisleading).to.equal(true);
    });

    it("should revert posting if AI rating is 4 or 5", async function () {
      const stakeAmount = ethers.parseEther("10");

      // Attempt to post a job with a high AI rating (e.g., 4) should be blocked
      await expect(
        jobBoard.connect(employer).postJob("Fullstack Developer", "Build everything", 4, stakeAmount)
      ).to.be.revertedWith("Job listing is too misleading");
    });
  });

  describe("Confirming an Interview", function () {
    beforeEach(async function () {
      // Post a valid job first
      const stakeAmount = ethers.parseEther("10");
      await jobBoard.connect(employer).postJob("Designer", "Design stuff", 1, stakeAmount);
    });

    it("should allow confirming an interview and return staked tokens", async function () {
      // Capture employer's token balance before confirmation
      const initialBalance = await stakingToken.balanceOf(employer.address);

      // Confirm the interview
      await expect(jobBoard.connect(applicant).confirmInterview(1))
        .to.emit(jobBoard, "InterviewConfirmed")
        .withArgs(1);

      // Verify that tokens are returned to the employer
      const finalBalance = await stakingToken.balanceOf(employer.address);
      expect(finalBalance).to.be.above(initialBalance);
      
      // Verify that the job status is updated
      const job = await jobBoard.jobListings(1);
      expect(job.status).to.equal(1); // 1 = Interviewed
    });
  });

  describe("Reporting a Fake Job", function () {
    beforeEach(async function () {
      // Post a valid job first
      const stakeAmount = ethers.parseEther("10");
      await jobBoard.connect(employer).postJob("QA Engineer", "Test software", 1, stakeAmount);
    });

    it("should allow reporting a fake job and transfer stake to reporter", async function () {
      // Capture reporter's (applicant's) token balance before reporting
      const initialBalance = await stakingToken.balanceOf(applicant.address);

      // Report the job as fake
      await expect(jobBoard.connect(applicant).reportFakeJob(1))
        .to.emit(jobBoard, "JobReportedFake")
        .withArgs(1, applicant.address);

      // Verify that tokens are transferred to the reporter
      const finalBalance = await stakingToken.balanceOf(applicant.address);
      expect(finalBalance).to.be.above(initialBalance);

      // Verify that the job status is updated
      const job = await jobBoard.jobListings(1);
      expect(job.status).to.equal(2); // 2 = Fake
    });
  });
});
