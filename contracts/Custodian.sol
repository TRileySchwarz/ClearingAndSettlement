pragma solidity ^0.5.2;


import "./lib/Entity.sol";

/// @title Custodian
/// @dev This is the base contract for a Custodian entity to utilize the Instant Clearing and Settlement Ecosystem.
contract Custodian is Entity {

    /// @dev An event emitted when a trade has been confirmed
    event TradeConfirmed(
        uint256 transactionID,
        uint256 timeStamp
    );

    /// @dev Constructor of the Custodian
    /// @param name Name of the entity
    /// @param version Version of the contracts being deployed
    constructor(
        bytes32 name,
        uint256 version
    )
    Entity(
        name,
        version
    )
        public
    {
        _typeOfEntity = EntityType.CUSTODIAN;
    }

    /// @dev Once the Custodian has verified that the buyer, seller, and exchange have all verified the trade,
    /// the custodian will make this call which verifies everything is confirmed and accurate
    /// @param transactionID A unique transaction ID issues by the exchange that allows the custodian to verify a trade
    /// This serves as a nonce to ensure trades are verified in the correct order
    /// @param timeStamp Corresponds to the timestamp that the custodian confirmed this trade
    function confirmTrade(uint256 transactionID, uint256 timeStamp) external onlyOwner {
        /// !!! Insert Functionality to actually confirm a trade

        emit TradeConfirmed(transactionID, timeStamp);
    }
}
