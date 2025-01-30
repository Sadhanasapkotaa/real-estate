// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstatePayment  {
    address public immutable owner;

    event PropertyBooked(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function bookProperty() external payable {
        require(msg.value > 0, "Payment must be > 0");

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit PropertyBooked(msg.sender, msg.value);
    }
}