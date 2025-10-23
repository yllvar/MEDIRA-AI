// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalRecordsOptimized is ReentrancyGuard, Pausable, Ownable {
    struct MedicalRecord {
        bytes32 dataHash;
        uint32 timestamp;
        address uploadedBy;
        string encryptedMetadata;
    }

    struct AccessGrant {
        uint32 grantedAt;
        uint32 expiresAt;
        bool isActive;
    }

    struct PatientData {
        uint256 recordCount;
        mapping(uint256 => MedicalRecord) records;
        mapping(address => AccessGrant) accessGrants;
    }

    mapping(address => PatientData) private patientData;
    uint256 public immutable grantAccessTimeLock = 1 days;

    // Monitoring events
    event ContractPaused(address indexed by, uint256 timestamp);
    event ContractUnpaused(address indexed by, uint256 timestamp);
    event TimeLockUpdated(uint256 newTimeLock, uint256 timestamp);
    
    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(msg.sender, block.timestamp);
    }

    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender, block.timestamp);
    }

    function setGrantAccessTimeLock(uint256 newTimeLock) external onlyOwner {
        grantAccessTimeLock = newTimeLock;
        emit TimeLockUpdated(newTimeLock, block.timestamp);
    }
    
    // Events and rest of contract implementation...
}
