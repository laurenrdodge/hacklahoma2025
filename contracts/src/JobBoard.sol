// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract JobBoard {
    // Token used for staking (could be a dedicated staking token)
    IERC20 public stakingToken;
    uint256 public jobIdCounter;

    enum JobStatus { Active, Interviewed, Fake }
    
    struct JobListing {
        uint256 id;
        address employer;
        string title;
        string description;
        uint8 aiRating; // AI rating out of 5 for misleading content
        uint256 stakeAmount;
        JobStatus status;
        bool flaggedAsMisleading;
    }
    
    mapping(uint256 => JobListing) public jobListings;
    
    event JobPosted(uint256 jobId, address employer, bool flaggedAsMisleading);
    event InterviewConfirmed(uint256 jobId);
    event JobReportedFake(uint256 jobId, address reporter);

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
        jobIdCounter = 1;
    }
    
    /**
     * @dev Post a job listing. Requires staking tokens.
     * @param _title The job title.
     * @param _description The job description.
     * @param _aiRating The AI-determined rating (0-5).
     * @param _stakeAmount The amount of tokens staked.
     */
    function postJob(
        string memory _title,
        string memory _description,
        uint8 _aiRating,
        uint256 _stakeAmount
    ) public {
        require(_stakeAmount > 0, "Stake must be greater than zero");
        // If AI rating is 4 or 5, block posting.
        require(_aiRating < 4, "Job listing is too misleading");

        // Flag listing if AI rating indicates potential issues (2 or 3)
        bool flagged = _aiRating >= 2;

        // Transfer staking tokens from employer to the contract
        require(
            stakingToken.transferFrom(msg.sender, address(this), _stakeAmount),
            "Token transfer failed"
        );

        // Create the job listing
        jobListings[jobIdCounter] = JobListing({
            id: jobIdCounter,
            employer: msg.sender,
            title: _title,
            description: _description,
            aiRating: _aiRating,
            stakeAmount: _stakeAmount,
            status: JobStatus.Active,
            flaggedAsMisleading: flagged
        });
        
        emit JobPosted(jobIdCounter, msg.sender, flagged);
        jobIdCounter++;
    }
    
    /**
     * @dev Called by a candidate to confirm that they were interviewed.
     * Tokens are returned to the employer.
     * @param _jobId The ID of the job listing.
     */
    function confirmInterview(uint256 _jobId) public {
        JobListing storage job = jobListings[_jobId];
        require(job.status == JobStatus.Active, "Job is not active");
        
        job.status = JobStatus.Interviewed;
        
        // Return the staked tokens back to the employer
        require(
            stakingToken.transfer(job.employer, job.stakeAmount),
            "Token transfer failed"
        );
        
        emit InterviewConfirmed(_jobId);
    }
    
    /**
     * @dev Called by an applicant if they suspect the listing is fake.
     * The staked tokens are transferred to the reporter.
     * @param _jobId The ID of the job listing.
     */
    function reportFakeJob(uint256 _jobId) public {
        JobListing storage job = jobListings[_jobId];
        require(job.status == JobStatus.Active, "Job is not active");
        
        job.status = JobStatus.Fake;
        
        // Compensate the reporter
        require(
            stakingToken.transfer(msg.sender, job.stakeAmount),
            "Token transfer failed"
        );
        
        emit JobReportedFake(_jobId, msg.sender);
    }
}
