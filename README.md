# Package Execution Oracle Networks (PEONs)

The goal of PEON is to be a fully modular, composable and flexible standard for creating oracle networks.
The way it achieves that is by defining contract and package(program) interfaces which an oracle network needs to implement.

Link to the full document: https://hackmd.io/@nerfZael/SkYSopVXF

## In this repo
You will find the code for:
* An example user contract(UserContract.sol) that queries a polywrapper
* An example PEON contract(TestPeonImplementation.sol) that's a basic implementation of the PEON standard
* IPEON interface(IPEON.sol)
* A proof of concept oracle node that listens to any arbitrary polywrapper query emitted from a PEON contract, executes it and relays the results back to the contract.

## Example use

Querying a polywrapper("my-polywrapper.eth") from a smart contract.

my-polywrapper.eth schema:

```typescript
type Query {
  doSomething(arg1: String!, arg2: uint256!): String!
}
```

Query my-polywrapper.eth from a smart contract
```typescript
function someFunc(string calldata packageUri, string calldata method, string calldata argStr) public {
  //eg. my-polywrapper.eth
  string memory packageUri;
  //eg. query.doSomething(string,uint256)
  string memory method;
  //eg. "hello"
  string memory arg1;
  //eg. 235
  uint256 memory arg2;

  bytes32 methodHash = keccak256(abi.encodePacked(method));
  bytes memory params = abi.encode(arg1, arg2);

  //Call the query method on the PEON contract
  //It returns a queryId that uniquely identifies your query
  bytes32 queryId = IPEON(peonAddress)
    .query(
      packageUri,
      methodHash, 
      params, 

      //callback contract address
      address(this), 
      //callback function
      this.callback.selector
    );

  emit Query(queryId);
}

//Function that gets called by the PEON contract
function callback(bytes32 queryId, string calldata responseStr) public {
  //responseStr is the return of the "doSomething" method

  emit Response(queryId, responseStr);
}
```
