#!/usr/bin/env bash

./node_modules/.bin/truffle-flattener ./contracts/Broker.sol > ./flats/BrokerFlat.sol
./node_modules/.bin/truffle-flattener ./contracts/Custodian.sol > ./flats/CustodianFlat.sol
./node_modules/.bin/truffle-flattener ./contracts/Exchange.sol > ./flats/ExchangeFlat.sol
./node_modules/.bin/truffle-flattener ./contracts/EntityFactory.sol > ./flats/EntityFactoryFlat.sol
