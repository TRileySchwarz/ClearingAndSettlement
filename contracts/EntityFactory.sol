pragma solidity ^0.5.2;


import "./Broker.sol";
import "./Custodian.sol";
import "./Exchange.sol";

/// @title Entity Factory
/// @dev This factory allows entities to launch their
contract EntityFactory {

    /// @dev Indicates the entity factory version
    uint256 public constant FACTORY_VERSION = 1;

    /// @dev Every time an entity is created this event is emited
    event EntityCreated(address entityAddress);

    /// @dev A mapping of entities that have been deployed from this factory
    mapping(address => bool) public _entityMapping;

    /// @dev Responsible for deploying an entity to participate in Instant Clearing and Settlement Ecosystem
    /// The owner of this entity is set to the tx.origin
    /// Requires:
    ///     - The entityType must be a valid number between 1-3 inclusively
    /// @param entityType An uint256 which indicates what type of entity to be deployed
    ///     - entityType = 1 = BROKER
    ///     - entityType = 2 = CUSTODIAN
    ///     - entityType = 3 = EXCHANGE
    /// @param name Name of the entity to be deployed
    /// @return Address of the entity that has been deployed
    function createEntity(uint256 entityType, bytes32 name) public returns (address _entity){
        require(entityType > 0 && entityType < 4, "EntityType is invalid");

        if (entityType == 1) {
            _entity = address(new Broker(name, FACTORY_VERSION));
        } else  if (entityType == 2) {
            _entity = address(new Custodian(name, FACTORY_VERSION));
        } else if (entityType == 3) {
            _entity = address(new Exchange(name, FACTORY_VERSION));
        }

        _entityMapping[_entity] = true;

        emit EntityCreated(_entity);
    }
}
