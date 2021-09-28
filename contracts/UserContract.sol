// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IPEON.sol";
import "hardhat/console.sol";

contract UserContract {
  event Query(bytes32 queryId);
  event Response(bytes32 queryId, string response);

  struct QueryInfo {
    bool exists;
    string responseStr;
  }

  mapping(bytes32 => QueryInfo) public queryInfos;
  address peonAddress;
  bytes32 public latestQueryId;

  constructor(address _peonAddress) {
    peonAddress = _peonAddress;
  }

  function someFunc(string calldata packageUri, string calldata method, string calldata argStr) public {
    bytes32 methodHash = keccak256(abi.encodePacked(method));
    bytes memory params = abi.encode(argStr);

    bytes32 queryId = IPEON(peonAddress)
      .query(
        packageUri,
        methodHash, 
        params, 

        address(this), 
        this.callback.selector
      );

    queryInfos[queryId] = QueryInfo(true, "");

    emit Query(queryId);
  }

  function callback(bytes32 queryId, string calldata responseStr) public {
    assert(msg.sender == peonAddress);

    QueryInfo storage queryInfo = queryInfos[queryId];
    assert(queryInfo.exists);

    queryInfo.responseStr = responseStr;

    latestQueryId = queryId;
    
    emit Response(queryId, responseStr);
  }

  function getLatestQuery() public view returns(QueryInfo memory){
    return queryInfos[latestQueryId];
  }
}