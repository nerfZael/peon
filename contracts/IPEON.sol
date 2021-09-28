// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IPEON {
  event Query(bytes32 queryId, string packageUri, bytes32 func, bytes args);
  event Response(bytes32 queryId, address executor, bytes32 responseHash);

  function query(
    string calldata packageUri, 
    bytes32 func, 
    bytes calldata args, 
    address callbackAddress, 
    bytes4 callbackFunc
  ) external returns(bytes32 queryId);

  function respond(
    bytes32 queryId, 
    bytes32 responseHash, 
    bytes calldata response
  ) external;
}