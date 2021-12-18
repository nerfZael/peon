// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IPeonQueryable {
  event Query(uint256 queryId, string packageUri, bytes32 func, bytes args);

  function query(
    string calldata packageUri, 
    bytes32 func, 
    bytes calldata args, 
    address callbackAddress, 
    bytes4 callbackFunc, 
    uint256 callbackGasLimit
  ) external payable returns(uint256 queryId);
}