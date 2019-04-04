const EntityFactoryABI = [
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'name': '_entityMapping',
    'outputs': [
      {
        'name': '',
        'type': 'bool',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'entityType',
        'type': 'uint256',
      },
      {
        'name': 'name',
        'type': 'bytes32',
      },
    ],
    'name': 'createEntity',
    'outputs': [
      {
        'name': '_entity',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'FACTORY_VERSION',
    'outputs': [
      {
        'name': '',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'entityAddress',
        'type': 'address',
      },
    ],
    'name': 'EntityCreated',
    'type': 'event',
  },
];

function EntityFactory (web3, userAccounts, globalsCallback, updateTransactionStatus) {
  this.entityFactoryAddress = '0xfAbbc43256AC2a47b20DeAb7EE00Bd14a30D48F7'; // Most up to date version of EntityFactory
  this.web3 = web3;

  this.EntityFactory = web3.eth.contract(EntityFactoryABI);
  this.entityFactory = this.EntityFactory.at(this.entityFactoryAddress);

  this.userAccount = userAccounts[0];
  this.globalsCallback = globalsCallback;
  this.updateTransactionStatus = updateTransactionStatus;

  this.entityFactoryVersion = 'Not set yet...'

  this.globalMethods = [
    'updateEntityFactoryVersion',
  ];

  this.currentTransactions = [];
  this.processTransactionHash();
}

const method = EntityFactory.prototype;

/**
 * ------------------------------------------------------------------------------------------------
 * Helpers for TokenFactory.js
 * ------------------------------------------------------------------------------------------------
 */

method.newTransactionHash = function (txHash) {
  this.currentTransactions.push(txHash);
};

method.processTransactionHash = function () {
  const _this = this;
  _this.processTransactionHashHelper(0, _this.currentTransactions.length, []);
};

method.processTransactionHashHelper = function (index, length, indexesToBeRemoved) {
  const _this = this;
  if (index < length) {
    _this.web3.eth.getTransactionReceipt(_this.currentTransactions[index].hash, function (error, result) {
      if (!error && result !== null) { // has processed // Not sure if need to switch back to if (!error) {
        if (result.status === '0x0') {
          _this.updateTransactionStatus(
            false,
            _this.currentTransactions[index].fail,
            _this.currentTransactions[index].hash
          );
        } else {
          indexesToBeRemoved.push(index);
          // console.log("pushed "+index+" into indexesToBeRemoved");
          _this.updateTransactionStatus(
            true,
            _this.currentTransactions[index].success,
            _this.currentTransactions[index].hash
          );
          _this.updateGlobals(0, function () {
          });
          console.log('update globals complete');
        }
      } else { // has not processed, still waiting
      }
      _this.processTransactionHashHelper(++index, length, indexesToBeRemoved);
    });
  } else {
    if (indexesToBeRemoved.length > 0) {
      for (let i = indexesToBeRemoved.length - 1; i >= 0; i--) {
        _this.currentTransactions.splice(indexesToBeRemoved[i], 1);
      }
    } else {
    }
    setTimeout(function () { _this.processTransactionHash(); }, 2000);
  }
};

/**
 * ------------------------------------------------------------------------------------------------
 * Methods To Update Global Variables
 * ------------------------------------------------------------------------------------------------
 */

// Internal Method which is called when tx's get processed.
method.updateGlobals = function (index, callback) {
  console.log('Updating globals...');
  const _this = this;

  this[_this.globalMethods[index]](function (error, result) {
    if (!error) {
      index++;

      if (index < _this.globalMethods.length) {
        _this.updateGlobals(index, callback);
      } else {
        _this.globalsCallback(_this);
        callback(null, null);
      }
    } else {
      callback(error, null);
    }
  });
};

method.updateEntityFactoryVersion = function (callback) {
  const _this = this;
  _this.entityFactory.FACTORY_VERSION(function (error, result) {
    if (!error) {
      _this.entityFactoryVersion = result;
      console.log('This is the result of EntityFactoryVersion update: ' + result);
      callback(null, result);
    } else {
      callback(error, null);
    }
  });
};

/**
 * ------------------------------------------------------------------------------------------------
 * Entity Factory methods
 * ------------------------------------------------------------------------------------------------
 */

// Creates a new Broker entity contract.
method.deployNewEntity = function (entityType, name, callback) {
  console.log('The deploy new entity button was pushed for the following values: ');
  console.log(entityType);
  console.log(name);

  const _this = this;
  // Converts the string input into bytes32
  const bytes32Name = this.web3.fromAscii(name);

  _this.entityFactory.createEntity(entityType, bytes32Name, { from: this.userAccount }, function (error, result) {
    if (!error) {
      _this.newTransactionHash({
        hash: result,
        success: 'The entity was successfully deployed...',
        fail: 'The entity failed to deploy...',
      });
      callback(null, result);
    } else {
      callback(error, null);
    }
  });
};
