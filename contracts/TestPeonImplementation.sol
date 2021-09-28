// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IPEON.sol";
import "hardhat/console.sol";

contract TestPeonImplementation is IPEON {
  struct QueryInfo {
    address callbackAddress;
    bytes4 callbackFunc;
    bool executed;
    mapping(address => bool) executorsResponded;
    mapping(bytes32 => uint256) executorResponses;
  }

  mapping(address => bool) authorizedExecutors;
  mapping(bytes32 => QueryInfo) queries;
  uint256 executorCnt;
  uint256 queryCnt;

  constructor(address[] memory _authorizedExecutors) {
    for(uint256 i; i < _authorizedExecutors.length; i++) {
      authorizedExecutors[_authorizedExecutors[i]] = true;
    }
  }

  function query(string calldata packageUri, bytes32 func, bytes calldata args, address callbackAddress, bytes4 callbackFunc) public override returns(bytes32) {
    queryCnt++;
    bytes32 queryId = bytes32(queryCnt);

    QueryInfo storage queryInfo = queries[queryId];
    queryInfo.callbackAddress = callbackAddress;
    queryInfo.callbackFunc = callbackFunc;
    queryInfo.executed = false;

    emit Query(queryId, packageUri, func, args);

    return queryId;
  }

  function respond(bytes32 queryId, bytes32 responseHash, bytes calldata response) public override {
    require(keccak256(abi.encodePacked(response)) == responseHash, "Response hash is invalid");
   
    QueryInfo storage queryInfo = queries[queryId];

    require(!queryInfo.executed, "Query has already been executed");
    require(authorizedExecutors[msg.sender], "You are not authorized to respond");
    require(!queryInfo.executorsResponded[msg.sender], "You have already responded");

    queryInfo.executorsResponded[msg.sender] = true;
    queryInfo.executorResponses[responseHash]++;

    if(!consensus(queryInfo, responseHash)) {
      return;
    }

    queryInfo.executed = true;

    bytes memory queryIdBytes = new bytes(32);

    for(uint i = 0; i<32; i++){
      queryIdBytes[i] = response[i];
    }

    bytes32 encodedQueryId;
    assembly {
      encodedQueryId := mload(add(queryIdBytes, 32))
    }
    require(encodedQueryId == queryId, "Bad encoding");

    bytes memory data = bytes.concat(queryInfo.callbackFunc, response);

    (bool success, ) = queryInfo.callbackAddress.call(data);
    require(success);
 
    emit Response(queryId, msg.sender, responseHash);
  }

  function consensus(QueryInfo storage queryInfo, bytes32 responseHash) private view returns(bool) {
    return queryInfo.executorResponses[responseHash] >= 1;
  }
}

