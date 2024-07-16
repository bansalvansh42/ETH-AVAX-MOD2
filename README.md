# ETH-AVAX-MOD2

# Project Title

Function Frontend

## Description

This solidity code is the solution to the assessment of the "ETH PROOF: Intermediate ETH + AVAX Course" by Metacrafters. The requirements of the assessment are:

    For this project, create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application.


## Solution Overview


## Features

- **Balance Management**: Allows the owner to deposit and withdraw funds.
- **Greeting Management**: Allows the owner to set and get a greeting message.



### State Variables

- `address payable public owner`: The owner of the contract.
- `uint256 public balance`: The current balance of the contract.
- `string public greeting`: The greeting message.

### Events

- `event Deposit(uint256 amount)`: Emitted when a deposit is made.
- `event Withdraw(uint256 amount)`: Emitted when a withdrawal is made.
- `event GreetingSet(string newGreeting)`: Emitted when a new greeting is set.
### Executing Program

Follow these steps to set up and run the solution:

1. Clone the repository to your local machine.
2. Install the project dependencies by running the following command in the terminal:
   `npm install`
3. Deploy the smart contract to a local Ethereum network. You can use tools like Hardhat or Ganache for local development and testing. Make sure to update the network provider URL and contract address in the `index.js` file.
4. Use `npx hardhat node` to setup hardhat environment.
5. `npx hardhat run --network localhost scripts/deploy.js `to deploy in the localhost.

## Authors

Contributors' names 
Vansh Bansal

