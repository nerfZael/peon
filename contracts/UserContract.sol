// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IPeonQueryable.sol";

contract UserContract {
  event Query(uint256 queryId);
  event Response(uint256 queryId, string response);

  struct QueryInfo {
    bool exists;
    string responseStr;
  }

  mapping(uint256 => QueryInfo) public queryInfos;
  address peonAddress;
  uint256 public latestQueryId;

  constructor(address _peonAddress) {
    peonAddress = _peonAddress;
  }

  function someFunc(string calldata packageUri, string calldata method, string calldata argStr) public payable {
    bytes32 methodHash = keccak256(abi.encodePacked(method));
    bytes memory params = abi.encode(argStr);

    uint256 queryId = IPeonQueryable(peonAddress)
      .query{value: msg.value}(
        packageUri,
        methodHash, 
        params, 

        address(this), 
        this.callback.selector,
        105000
      );

    queryInfos[queryId] = QueryInfo(true, "");

    emit Query(queryId);
  }

  function callback(uint256 queryId, string calldata responseStr) public {
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