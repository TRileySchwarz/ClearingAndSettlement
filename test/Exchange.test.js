// const { assertRevert } = require('./helpers/assertRevert');
// const expectEvent = require('./helpers/expectEvent');

// const BigNumber = web3.BigNumber;

// const {
//   TestConstants,
// } = require('./testConstants');
//
// const web3 = require('web3')
//
// const ExchangeEntity = artifacts.require('Exchange');

contract('Exchange.sol', function (accounts) {
  // let exchangeEntity;
  // const defaultName = web3.utils.fromAscii('TestName');
  // const contractVersion = 1;

  beforeEach(async function () {
    // exchangeEntity = await ExchangeEntity.new(defaultName, contractVersion);
  });

  describe('constructor()', function () {
    it('name field value is set correctly', async function () {
      // const name = await exchangeEntity._name.call();
      //
      // assert.equal(web3.utils.toAscii(name), 'TestName', 'The name field was not set correctly in constructor');
    });
  });
});
