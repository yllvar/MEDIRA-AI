// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/AccessControl.sol";

contract MedicalRecords is ReentrancyGuard, Pausable, Ownable, AccessControl {
    struct MedicalRecord {
        bytes32 dataHash;
        string encryptedMetadata;
        uint256 timestamp;
        address uploadedBy;
    }

    struct AccessGrant {
        bool isActive;
        uint256 grantedAt;
        uint256 expiresAt;
    }

    mapping(address => uint256) private recordCount;
    mapping(address => mapping(uint256 => MedicalRecord)) private records;
    mapping(address => mapping(address => AccessGrant)) private accessGrants;
    
    // Time lock for critical operations
    uint256 public grantAccessTimeLock = 1 days;
    
    event RecordAdded(address indexed patient, uint256 indexed recordId, bytes32 dataHash, uint256 timestamp);
    event AccessGranted(address indexed patient, address indexed doctor, uint256 expiresAt);
    event AccessRevoked(address indexed patient, address indexed doctor);
    event RecordAccessed(address indexed patient, address indexed accessor, uint256 indexed recordId, uint256 timestamp);

    constructor() Ownable(msg.sender) {
        // Initial owner check
        require(msg.sender != address(0), "Invalid owner address");
    }

    modifier onlyPatientOrAuthorized(address patient) {
        require(
            msg.sender == patient || 
            (accessGrants[patient][msg.sender].isActive && 
            (accessGrants[patient][msg.sender].expiresAt == 0 || 
             accessGrants[patient][msg.sender].expiresAt > block.timestamp)),
            "Unauthorized access"
        );
        _;
    }

    function addRecord(bytes32 dataHash, string memory encryptedMetadata) external nonReentrant whenNotPaused {
        require(dataHash != bytes32(0), "Invalid data hash");
        require(bytes(encryptedMetadata).length > 0, "Metadata cannot be empty");
        
        uint256 recordId = recordCount[msg.sender];
        records[msg.sender][recordId] = MedicalRecord({
            dataHash: dataHash,
            encryptedMetadata: encryptedMetadata,
            timestamp: block.timestamp,
            uploadedBy: msg.sender
        });
        recordCount[msg.sender]++;
        emit RecordAdded(msg.sender, recordId, dataHash, block.timestamp);
    }

    function grantAccess(address doctor, uint256 expiresAt) external whenNotPaused {
        require(doctor != address(0), "Invalid doctor address");
        require(expiresAt == 0 || expiresAt > block.timestamp + grantAccessTimeLock, "Expiry must be at least 1 day in future");
        
        accessGrants[msg.sender][doctor] = AccessGrant({
            isActive: true,
            grantedAt: block.timestamp,
            expiresAt: expiresAt
        });
        emit AccessGranted(msg.sender, doctor, expiresAt);
    }

    function revokeAccess(address doctor) external whenNotPaused {
        accessGrants[msg.sender][doctor].isActive = false;
        emit AccessRevoked(msg.sender, doctor);
    }

    // Emergency pause functionality
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Update time lock duration (only owner)
    function setGrantAccessTimeLock(uint256 newTimeLock) external onlyOwner {
        grantAccessTimeLock = newTimeLock;
    }

    function getRecord(address patient, uint256 recordId) external onlyPatientOrAuthorized(patient) whenNotPaused returns (MedicalRecord memory) {
        require(recordId < recordCount[patient], "Invalid record ID");
        if (msg.sender != patient) {
            emit RecordAccessed(patient, msg.sender, recordId, block.timestamp);
        }
        return records[patient][recordId];
    }

    function getRecordCount(address patient) external view returns (uint256) {
        return recordCount[patient];
    }

    function hasAccess(address patient, address doctor) external view returns (bool) {
        return accessGrants[patient][doctor].isActive && 
               (accessGrants[patient][doctor].expiresAt == 0 || 
                accessGrants[patient][doctor].expiresAt > block.timestamp);
    }
}
