const ExchangeABI = [
  {
    'constant': true,
    'inputs': [],
    'name': '_version',
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
    'constant': true,
    'inputs': [],
    'name': '_typeOfEntity',
    'outputs': [
      {
        'name': '',
        'type': 'uint8',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'isOwner',
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
        'name': 'transactionID',
        'type': 'uint256',
      },
      {
        'name': 'timeStamp',
        'type': 'uint256',
      },
      {
        'name': 'buyInvestor',
        'type': 'address',
      },
      {
        'name': 'buyBroker',
        'type': 'address',
      },
      {
        'name': 'sellInvestor',
        'type': 'address',
      },
      {
        'name': 'sellBroker',
        'type': 'address',
      },
      {
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'name': 'asset',
        'type': 'uint256',
      },
    ],
    'name': 'enterTrade',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': '_name',
    'outputs': [
      {
        'name': '',
        'type': 'bytes32',
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
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'name': 'name',
        'type': 'bytes32',
      },
      {
        'name': 'version',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'transactionID',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'timeStamp',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'buyInvestor',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'buyBroker',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'sellInvestor',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'sellBroker',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'asset',
        'type': 'uint256',
      },
    ],
    'name': 'Trade',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address',
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'OwnershipTransferred',
    'type': 'event',
  },
];

function Exchange (web3, userAccounts, globalsCallback, updateTransactionStatus) {
  this.web3 = web3;

  this.Exchange = web3.eth.contract(ExchangeABI);

  this.userAccount = userAccounts[0];
  this.globalsCallback = globalsCallback;
  this.updateTransactionStatus = updateTransactionStatus;

  this.entityVersion = 'Not set yet...';
  this.entityName = 'Not set yet...';

  this.globalMethods = [
    'updateEntityVersion',
    'updateEntityName',
  ];

  this.currentTransactions = [];
  this.processTransactionHash();
}

const method = Exchange.prototype;

/**
 * ------------------------------------------------------------------------------------------------
 * Helpers for Exchange.js
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

// Sets the entity address for the details to query from.
// Parameters... address = hex address of the desired Exchange entity.
method.setCurrentEntityAddress = function (address) {
  this.exchange = this.Exchange.at(address);

  this.updateGlobals(0, function () {
  });
  const _this = this;
  setInterval(function () { _this.updateGlobals(0, function (err, result) {}); }, 5000);
};

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

method.updateEntityVersion = function (callback) {
  const _this = this;
  _this.exchange._version(function (error, result) {
    if (!error) {
      _this.entityVersion = result;
      console.log('This is the result of entity Version update: ' + result);
      callback(null, result);
    } else {
      callback(error, null);
    }
  });
};

method.updateEntityName = function (callback) {
  const _this = this;
  _this.exchange._name(function (error, result) {
    if (!error) {
      result = this.web3.toAscii(result);

      _this.entityName = result;
      console.log('This is the result of exchange Name update: ' + result);
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

// Creates a new buyOrder
method.createTradeOrder = function (arrayOfArguments, callback) {
  console.log('The new Trade order button was pushed for the following values: ');
  console.log(arrayOfArguments);

  const _this = this;

  _this.exchange.enterTrade(...arrayOfArguments, { from: this.userAccount }, function (error, result) {
    if (!error) {
      _this.newTransactionHash({
        hash: result,
        success: 'The trade was successfully deployed...',
        fail: 'The trade failed to deploy...',
      });
      callback(null, result);
    } else {
      callback(error, null);
    }
  });
};
