pragma solidity ^0.5.2;


import "./lib/Entity.sol";

/// @title Broker
/// @dev The base contract for a Broker entity to utilize the Instant Clearing and Settlement Ecosystem
contract Broker is Entity {

    /// @dev An event emitted when a BuyOrder has been executed
    event BuyOrder(
        uint256 transactionID,
        uint256 timeStamp,
        uint256 amount,
        uint256 asset,
        address investor,
        address exchange
    );

    /// @dev An event emitted when a SellOrder has been executed
    event SellOrder(
        uint256 transactionID,
        uint256 timeStamp,
        uint256 amount,
        uint256 asset,
        address investor,
        address exchange
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
        _typeOfEntity = EntityType.BROKER;
    }

    /// @dev Allows the owner of the contract to emit a BuyOrder event after a successful trade on an exchange
    /// This will update the internal ledger of this contract
    /// Requires:
    ///     - msg.sender is the owner
    /// @param transactionID A unique transaction ID issues by the exchange that allows the custodian to verify a trade
    /// This serves as a nonce to ensure trades are verified in the correct order
    /// @param timeStamp TimeStamp of the trade being entered
    /// @param amount Amount of the asset being bought
    /// @param asset Corresponding asset ID
    /// @param investor Corresponding investor ID
    /// @param exchange Corresponding exchange where the trade took place
    function buyOrder(
        uint256 transactionID,
        uint256 timeStamp,
        uint256 amount,
        uint256 asset,
        address investor,
        address exchange
    )
        external
        onlyOwner
    {
        /// !!! Insert functionality to actually edit balances

        emit BuyOrder(
            transactionID,
            timeStamp,
            amount,
            asset,
            investor,
            exchange
        );
    }

    /// @dev Allows the owner of the contract to emit a SellOrder event after a successful trade on an exchange.
    /// This will update the internal ledger of this contract
    /// Requires:
    ///     - msg.sender is the owner
    /// @param transactionID A unique transaction ID issues by the exchange that allows the custodian to verify a trade
    /// This serves as a nonce to ensure trades are verified in the correct order
    /// @param timeStamp TimeStamp of the trade being entered
    /// @param amount Amount of the asset being bought
    /// @param asset Corresponding asset ID
    /// @param investor Corresponding investor ID
    /// @param exchange Corresponding exchange where the trade took place
    function sellOrder(
        uint256 transactionID,
        uint256 timeStamp,
        uint256 amount,
        uint256 asset,
        address investor,
        address exchange
    )
        external
        onlyOwner
    {
        /// !!! Insert functionality to actually edit balances

        emit SellOrder(
            transactionID,
            timeStamp,
            amount,
            asset,
            investor,
            exchange
        );
    }
}
