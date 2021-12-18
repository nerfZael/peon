// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IPeonQueryable.sol";
import "./IPeonReceivable.sol";

contract TestPeonImplementation is IPeonQueryable, IPeonReceivable {
  struct QueryInfo {
    address callbackAddress;
    bytes4 callbackFunc;
    uint256 callbackGasLimit;
    bool executed;
    mapping(address => bool) executorsResponded;
    mapping(bytes32 => uint256) executorResponses;
  }

  mapping(address => bool) authorizedExecutors;
  mapping(uint256 => QueryInfo) queries;
  uint256 executorCnt;
  uint256 queryCnt;
  address public owner;
  uint256 public queryFee = 0.1 ether;

  constructor(address _owner, address[] memory _authorizedExecutors) {
    owner = _owner;
    for(uint256 i; i < _authorizedExecutors.length; i++) {
      authorizedExecutors[_authorizedExecutors[i]] = true;
    }
  }

  function setQueryFee(uint256 _queryFee) public {
    require(msg.sender == owner, "You are not the owner");
    queryFee = _queryFee;
  }

  function query(
    string calldata packageUri, 
    bytes32 func, 
    bytes calldata args, 
    address callbackAddress, 
    bytes4 callbackFunc, 
    uint256 callbackGasLimit
  ) public payable override returns(uint256) {
    require(msg.value >= queryFee);
    require(callbackGasLimit <= 1000000);
    
    queryCnt++;
    uint256 queryId = queryCnt;

    QueryInfo storage queryInfo = queries[queryId];
    queryInfo.callbackAddress = callbackAddress;
    queryInfo.callbackFunc = callbackFunc;
    queryInfo.callbackGasLimit = callbackGasLimit;
    queryInfo.executed = false;

    emit Query(queryId, packageUri, func, args);

    return queryId;
  }

  function respond(uint256 queryId, bytes32 responseHash, bytes calldata response) public override {
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

    uint256 encodedQueryId;
    bytes memory responseData = response;

    assembly {
      encodedQueryId := mload(add(responseData, 32))
    }
    
    require(encodedQueryId == queryId, "Bad encoding");

    bytes memory data = bytes.concat(queryInfo.callbackFunc, response);

    (bool success,) = queryInfo.callbackAddress.call{gas: queryInfo.callbackGasLimit}(data);

    withdrawAll();

    emit Response(queryId, msg.sender, responseHash);
  }

  function consensus(QueryInfo storage queryInfo, bytes32 responseHash) private view returns(bool) {
    return queryInfo.executorResponses[responseHash] >= 1;
  }

  function withdrawAll() private {
    (bool sent,) = payable(msg.sender).call{value: address(this).balance}("");
    require(sent, "Failed to send funds");
  }
}

