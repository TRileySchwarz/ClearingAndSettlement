pragma solidity ^0.5.2;


import "./lib/Entity.sol";

/// @title Exchange
/// @dev The base contract for an Exchange entity to utilize the Instant Clearing and Settlement Ecosystem
contract Exchange is Entity {

    /// @dev An event emitted when a trade has been executed
    event Trade(
        uint256 transactionID,
        uint256 timeStamp,
        address buyInvestor,
        address buyBroker,
        address sellInvestor,
        address sellBroker,
        uint256 amount,
        uint256 asset
    );

    /// @dev Constructor of the Entity
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
        _typeOfEntity = EntityType.EXCHANGE;
    }

    /// @dev Allows the owner of the contract to emit a Trade event
    /// This will update the internal ledger of this contract
    /// Requires:
    ///     - msg.sender is the owner
    /// @param transactionID A unique transaction ID issues by the exchange that allows the custodian to verify a trade
    /// This serves as a nonce to ensure trades are verified in the correct order
    /// @param timeStamp TimeStamp of the trade being entered
    /// @param buyInvestor Indicates the Buyers Investor ID
    /// @param buyBroker Indicates the Buyers Broker ID
    /// @param sellInvestor Indicates the Sellers Investor ID
    /// @param sellBroker Indicates the Sellers Broker ID
    /// @param amount Amount of the asset being bought
    /// @param asset Corresponding asset ID
    function enterTrade(
        uint256 transactionID,
        uint256 timeStamp,
        address buyInvestor,
        address buyBroker,
        address sellInvestor,
        address sellBroker,
        uint256 amount,
        uint256 asset
    )
        external
        onlyOwner
    {
        /// !!! Insert functionality to actually edit balances

        emit Trade(
            transactionID,
            timeStamp,
            buyInvestor,
            buyBroker,
            sellInvestor,
            sellBroker,
            amount,
            asset
        );
    }
}
