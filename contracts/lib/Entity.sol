pragma solidity ^0.5.2;


import "./Ownable.sol";

/// @title Entity
/// @dev The entity contract that the base contracts from the Instant Clearing and Settlement Ecosystem inherit
contract Entity is Ownable {

    enum EntityType{
        BROKER,
        CUSTODIAN,
        EXCHANGE
    }

    // @dev This is used to identity which type of entity the corresponding contract represents
    EntityType public _typeOfEntity;
    // @dev Name of the entity
    bytes32 public _name;
    // @dev Version of the contracts
    uint256 public _version;

    /// @dev Constructor of the Entity
    /// @param name Name of the entity
    /// @param version Version of the contracts being deployed
    constructor(bytes32 name, uint256 version) public {
        _name = name;
        _version = version;
    }
}
