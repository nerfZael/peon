// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IPeonReceivable {
  event Response(uint256 queryId, address executor, bytes32 responseHash);

  function respond(
    uint256 queryId, 
    bytes32 responseHash, 
    bytes calldata response
  ) external;
}