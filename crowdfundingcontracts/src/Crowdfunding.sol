// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    string public name;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    address public owner;
    bool public paused;

    enum CampaignState { Active, Successful, Failed }
    CampaignState public state;

    struct Tier {
        string name;
        uint256 amount;
        uint256 backers;
    }

    struct Backer {
        uint256 totalContribution;
        bool[] fundedTiers;
    }

    Tier[] public tiers;
    mapping(address => Backer) public backers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier campaignOpen() {
        require(state == CampaignState.Active, "Campaign is not active.");
        _;
    }

    modifier notPaused() {
        require(!paused, "Contract is paused.");
        _;
    }

    event Funded(address indexed backer, uint256 tierIndex, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);
    event Refunded(address indexed backer, uint256 amount);
    event TierAdded(string name, uint256 amount);
    event TierRemoved(uint256 index);

    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) {
        name = _name;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
        owner = _owner;
        state = CampaignState.Active;
    }

    function checkAndUpdateCampaignState() internal {
        if (state == CampaignState.Active) {
            if (block.timestamp >= deadline) {
                state = address(this).balance >= goal ? CampaignState.Successful : CampaignState.Failed;
            } else {
                state = address(this).balance >= goal ? CampaignState.Successful : CampaignState.Active;
            }
        }
    }

    function fund(uint256 _tierIndex) public payable campaignOpen notPaused {
        require(_tierIndex < tiers.length, "Invalid tier.");
        require(msg.value == tiers[_tierIndex].amount, "Incorrect amount.");

        tiers[_tierIndex].backers++;
        backers[msg.sender].totalContribution += msg.value;
        backers[msg.sender].fundedTiers.push(true);

        checkAndUpdateCampaignState();
        emit Funded(msg.sender, _tierIndex, msg.value);
    }

    function addTier(string memory _name, uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount must be greater than 0.");
        tiers.push(Tier(_name, _amount, 0));
        emit TierAdded(_name, _amount);
    }

    function removeTier(uint256 _index) public onlyOwner {
        require(_index < tiers.length, "Tier does not exist.");
        for (uint256 i = _index; i < tiers.length - 1; i++) {
            tiers[i] = tiers[i + 1];
        }
        tiers.pop();
        emit TierRemoved(_index);
    }

    function withdraw() public onlyOwner {
        checkAndUpdateCampaignState();
        require(state == CampaignState.Successful, "Campaign not successful.");

        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner).transfer(balance);
        emit Withdrawn(owner, balance);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public {
        checkAndUpdateCampaignState();
        require(state == CampaignState.Failed, "Refunds not available.");
        uint256 amount = backers[msg.sender].totalContribution;
        require(amount > 0, "No contribution to refund");

        backers[msg.sender].totalContribution = 0;
        payable(msg.sender).transfer(amount);
        emit Refunded(msg.sender, amount);
    }

    function hasFundedTier(address _backer, uint256 _tierIndex) public view returns (bool) {
        return backers[_backer].fundedTiers[_tierIndex];
    }

    function getTiers() public view returns (string[] memory, uint256[] memory, uint256[] memory) {
        string[] memory names = new string[](tiers.length);
        uint256[] memory amounts = new uint256[](tiers.length);
        uint256[] memory backersCount = new uint256[](tiers.length);

        for (uint256 i = 0; i < tiers.length; i++) {
            names[i] = tiers[i].name;
            amounts[i] = tiers[i].amount;
            backersCount[i] = tiers[i].backers;
        }
        return (names, amounts, backersCount);
    }

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    function getCampaignStatus() public view returns (CampaignState) {
        if (state == CampaignState.Active && block.timestamp > deadline) {
            return address(this).balance >= goal ? CampaignState.Successful : CampaignState.Failed;
        }
        return state;
    }

    function extendDeadline(uint256 _daysToAdd) public onlyOwner campaignOpen {
        deadline += _daysToAdd * 1 days;
    }
}
