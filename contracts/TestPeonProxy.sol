// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IPeonQueryable.sol";

contract TestPeonProxy is IPeonQueryable {
  struct QueryInfo {
    address callbackAddress;
    bytes4 callbackFunc;
  }

  address public peonAddress;
  address public owner;
  mapping(uint256 => QueryInfo) queries;
  mapping(address => uint256) public userBalances;
  uint256 public peonFee = 0.2 ether;

  constructor(address _owner) {
    owner = _owner;
  }

  function deposit() public payable {
    userBalances[msg.sender] = userBalances[msg.sender] + msg.value;
  }

  function withdraw(uint256 amount) public {
    uint256 balance = userBalances[msg.sender];

    require(balance >= amount, "Not enough funds");

    userBalances[msg.sender] = balance - amount;

    (bool sent,) = payable(msg.sender).call{value: amount}("");
    require(sent, "Failed to send funds");
  }

  function withdrawAll() public {
    uint256 balance = userBalances[msg.sender];

    require(balance > 0, "No funds");

    userBalances[msg.sender] = 0;

    (bool sent,) = payable(msg.sender).call{value: balance}("");
    require(sent, "Failed to send funds");
  }

  function setPeon(address _peonAddress) public {
    require(msg.sender == owner, "You are not the owner");
    peonAddress = _peonAddress;
  }

  function setPeonFee(uint256 _peonFee) public {
    require(msg.sender == owner, "You are not the owner");
    peonFee = _peonFee;
  }

  function query(string calldata packageUri, bytes32 func, bytes calldata args, address callbackAddress, bytes4 callbackFunc, uint256 callbackGasLimit) public payable override returns(uint256) {
    if(msg.value < peonFee) {
      require(userBalances[msg.sender] > peonFee - msg.value, "Not enough funds");

      userBalances[msg.sender] = userBalances[msg.sender] + msg.value - peonFee;
    }

    uint256 queryId = IPeonQueryable(peonAddress)
      .query{value: peonFee}(
        packageUri, 
        func, 
        args, 
        address(this), 
        this.respond.selector, 
        callbackGasLimit
      );

    queries[queryId] = QueryInfo(callbackAddress, callbackFunc);

    emit Query(queryId, packageUri, func, args);

    return queryId;
  }

  function respond() public {
    bytes memory msgData = msg.data;
    
    uint256 encodedQueryId;

    assembly {
      encodedQueryId := mload(add(add(msgData, 32), 4))
    }

    QueryInfo memory queryInfo = queries[encodedQueryId];
    
    bytes4 callbackFunc = queryInfo.callbackFunc;
    
    assembly {
      mstore(add(msgData, 32), callbackFunc)
    }

    (bool success, ) = queryInfo.callbackAddress.call(msgData);
    require(success);
  }

  function processArgData(bytes memory data) private pure returns(bytes32 encodedQueryId) {
    assembly {
      encodedQueryId := mload(add(add(data, 32), 4))
    }

    return encodedQueryId;
  }
}