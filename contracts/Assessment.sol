
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    // NEW: Added a greeting state variable
    string public greeting;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    // NEW: Added an event for setting a new greeting
    event GreetingSet(string newGreeting);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        // NEW: Initialize greeting
        greeting = "Hello, Metacrafters!";
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        emit Withdraw(_withdrawAmount);
    }

    // NEW: Added function to set a new greeting
    function setGreeting(string memory _newGreeting) public {
        require(msg.sender == owner, "You are not the owner of this account");
        greeting = _newGreeting;
        emit GreetingSet(_newGreeting);
    }

    // NEW: Added function to get the current greeting
    function getGreeting() public view returns(string memory) {
        return greeting;
    }
}