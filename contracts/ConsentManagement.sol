// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ConsentManagement {
    struct Consent {
        bool aiTraining;
        bool research;
        bool dataSharing;
        uint256 grantedAt;
        uint256 expiresAt;
        string purposeHash;
    }

    mapping(address => Consent) private consents;

    event ConsentGiven(
        address indexed patient,
        bool aiTraining,
        bool research,
        bool dataSharing,
        uint256 expiresAt
    );

    event ConsentRevoked(address indexed patient);

    function giveConsent(
        bool aiTraining,
        bool research,
        bool dataSharing,
        uint256 expiresAt,
        string calldata purposeHash
    ) external {
        consents[msg.sender] = Consent({
            aiTraining: aiTraining,
            research: research,
            dataSharing: dataSharing,
            grantedAt: block.timestamp,
            expiresAt: expiresAt,
            purposeHash: purposeHash
        });
        
        emit ConsentGiven(msg.sender, aiTraining, research, dataSharing, expiresAt);
    }

    function revokeConsent() external {
        delete consents[msg.sender];
        emit ConsentRevoked(msg.sender);
    }

    function hasConsent(
        address patient,
        bool aiTraining,
        bool research,
        bool dataSharing
    ) external view returns (bool) {
        Consent memory consent = consents[patient];
        
        if (consent.expiresAt > 0 && consent.expiresAt < block.timestamp) {
            return false;
        }
        
        if (aiTraining && !consent.aiTraining) return false;
        if (research && !consent.research) return false;
        if (dataSharing && !consent.dataSharing) return false;
        
        return true;
    }
}
