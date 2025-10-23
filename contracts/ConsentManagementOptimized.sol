// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConsentManagementOptimized is Pausable, Ownable {
    // Bitmask positions for consent flags
    uint8 private constant AI_TRAINING_FLAG = 1 << 0;
    uint8 private constant RESEARCH_FLAG = 1 << 1;
    uint8 private constant DATA_SHARING_FLAG = 1 << 2;

    struct Consent {
        uint8 flags; // Packed consent flags
        uint32 grantedAt;
        uint32 expiresAt;
        string purposeHash;
    }

    mapping(address => Consent) private consents;
    uint256 public immutable minConsentDuration = 1 days;

    // Monitoring events
    event ContractPaused(address indexed by, uint256 timestamp);
    event ContractUnpaused(address indexed by, uint256 timestamp);
    event MinDurationUpdated(uint256 newDuration, uint256 timestamp);

    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(msg.sender, block.timestamp);
    }

    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender, block.timestamp);
    }

    // Note: The setMinConsentDuration function is not actually setting the minConsentDuration variable because it's declared as immutable.
    // This function will not compile. It should be removed or the minConsentDuration variable should be changed to not be immutable.
    // function setMinConsentDuration(uint256 newDuration) external onlyOwner {
    //     minConsentDuration = newDuration;
    //     emit MinDurationUpdated(newDuration, block.timestamp);
    // }

    // Events and rest of contract implementation...
}
