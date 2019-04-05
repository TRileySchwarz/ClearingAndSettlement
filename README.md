# clearingAndSettlement 

A series of Solidity Smart Contracts responsible for handling a public immutable ledger that facilitates the clearing and settlement of off chain assets. 

The current state of 
CDS clearing and settlement is outdated and inefficient. 
Given the technology available there is certainly opportunity to drastically improve this from T+3 -> T+0.
Through the use of blockchain technology, we can leverage Ethereum' public, secure, trustless consensus, and immutable database that fulfills all of the requirements for instant clearing and settling.

What makes this solution unique is it takes the positives of blockchain, but avoids the risks and issues associated with tokens such as ERC20.
The idea being that traditional securities have a plethora of regulation and compliance standards that numerous exchanges already currently use and have been approved. This system is merely a strategy 
to handle the transfer of information during the backend processes. In short, this is not a customer facing product, but rather an internal CDS ecosystem. This allows us to do away with 
several aspects that hinder or would otherwise make the process of CDS on a blockchain overly complicated and risky. 

This system does not actually manage digital assets, rather it manages the representation of a digital asset transfer database(ledger). 
For example, if there is a discrepancy in a trade and the custodian wants to rectify it, we can theoretically restart at a position in time right before the issue. We do this by redeploying contracts and populating the database with the given balances
of each stakeholder at the corresponding time and simply resume trading. 
Similarly if a private key gets lost, the contracts can just be redeployed. The assets are not lost, as this was just a ledger of them. This is contrary to the way tokens like ERC20 are handled in a similar process, as the asset itself is not located in that unique contract.


The project is reliant on the participation of the following stakeholders...

## Ecosystem via. Proof of Concept and Rinkeby

The Entity Factory Interface can be used anyone to launch their own entities on the Rinkeby test network. 

** The next version of this is going to contain a 
automated Javascript program that actively parses the Rinkeby network and looks for the trades emitted by Brokers and Exchanges.
When it finds a matching pair, it will execute the confirmTrade function which will replicate how the Custodian can automate the verification process.

<kbd> 

![alt text](/screens/EntityFactoryUICapture.png?raw=true)

</kbd> 

## Exchange
The Exchange entity is responsible for pairing both a buyer and a seller (brokers), generating a unique transactionID that simultaneously serves as a nonce to ensure 
that trades are verified chronologically. 

    // The Exchange events emited are as follows:
    emit Trade(TransactionID, TimeStamp, BuyInvestor, BuyBroker, SellInvestor, SellBroker, Amount, Asset);
    
<kbd> 

![alt text](/screens/ExchangeUICapture.png?raw=true)
    
</kbd> 
    
## Broker
The Broker entity is responsible for transmitting their clients trade details. This may take the form of either a buyOrder, or a sellOrder. 
This information is only available after a successful trade on an exchange.

    // The Broker events emited are as follows:
    emit BuyOrder(TransactionID, TimeStamp, Amount, Asset, Investor, Exchange);
    emit SellOrder(TransactionID, TimeStamp, Amount, Asset, Investor, Exchange);

<kbd> 
   
![alt text](/screens/BrokerUICapture.png?raw=true)

</kbd>
    
## Custodian
The Custodian is responsible for verifying that all three events, Trade, BuyOrder, and SellOrder all match up accordingly. They must do this in chronological order to ensure correct accounting(hence the nonce/TransactionUUID).

    // The Custodian events emited are as follows:
    emit TradeConfirmed(TransactionID, TimeStamp);
    
<kbd> 
    
![alt text](/screens/CustodianUICapture.png?raw=true)
    
</kbd>     



## Questions to answer

- How often does the custodian catch an error, and what does the resolution response look like?
- Do we really need to store database in the broker contracts? or can we just emit events?
- How do we note denomination? Set a maximum amount of decimals per asset?
- 3d mapping? assetid -> investorAddress -> balance? Needs an add asset button

## TODO

- Implement balance updates
- Test Ownable inheritence
- Test event emit for all entity types
- Create Interface Contracts
- Batch trade input
- Implement Cancel trade for all parties
- Deal with Bytes32 conversion in tests
- Deal with constructor modifier order from solhint warning



&nbsp;
## Running Tests
*Ensure there is no ganache-cli currently running

From the project root 
    
    $ npm install

Run truffle tests - port 8545

    $ sh scripts/test.sh

Run tests with coverage - port 8555

    $ sh scripts/coverage.sh


## Solidity Linter - [solhint](https://protofire.github.io/solhint/)

    $ npm run lint:sol


## Generating Flat Files - [truffle-flattener](https://www.npmjs.com/package/truffle-flattener)


    $ npm run generateFlats
    
&nbsp;
## Debugging Smart Contracts in IntelliJ Ultimate IDE
     
For more information on debugging your smart contracts inside of IntelliJ follow the instructions here
    
https://github.com/TRileySchwarz/truffle-intellij-debug



&nbsp;
### Author

- T. Riley Schwarz








