
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  // NEW: Added state for greeting
  const [greeting, setGreeting] = useState("");



  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  // const handleAccount = (account) => {
  //   if (account) {
  //     console.log ("Account connected: ", account);
  //     setAccount(account);
  //   }
  //   else {
  //     console.log("No account found");
  //   }
  // }

  const handleAccount = (accounts) => { // CHECKS IF THERE ARE ACCOUNTS BEFORE SETTING THE STATE
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
      getATMContract();
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  // NEW: Added function to get the greeting
  const getGreeting = async () => {
    if (atm) {
      setGreeting(await atm.getGreeting());
    }
  }




  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
        setNewGreeting("Deposit successful!");
      } catch (error) {
        console.error("Error during deposit:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
        setNewGreeting("Withdrawal successful!");
      } catch (error) {
        console.error("Error during withdrawal:", error);
      }
    }
  };


// NEW: Added function to set a new greeting
  const setNewGreeting = async (newGreeting) => {
    if (atm) {
      try {
        let tx = await atm.setGreeting(newGreeting);
        await tx.wait();
        getGreeting();
      } catch (error) {
        console.error("Error setting greeting:", error);
      }
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p className="text-error">Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} className="button button-connect">Connect Metamask Wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    // NEW: Get the greeting if it hasn't been fetched yet
    if (greeting === "") {
      getGreeting();
    }

    return (
      <div className="user-info">
        <div className="info-card">
          <h2>Account Information</h2>
          <p><strong>Your Account:</strong> {account}</p>
          <p><strong>Your Balance:</strong> {balance} ETH</p>
          <p><strong>Greeting:</strong> {greeting}</p>
        </div>
        <div className="actions">
          <h2>Actions</h2>
          <div className="button-group">
            <button onClick={deposit} className="button button-deposit">Deposit 1 ETH</button>
            <button onClick={withdraw} className="button button-withdraw">Withdraw 1 ETH</button>
            <button onClick={() => setNewGreeting("New Greeting")} className="button button-greeting">Set New Greeting</button>

          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <div className="app-wrapper">
      <main className="container">
        <header>
          <h1>Metacrafters ATM</h1>
        </header>
        {initUser()}
      </main>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f0f2f5;
          color: #333;
          line-height: 1.6;
        }
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        header {
          text-align: center;
          margin-bottom: 30px;
        }
        h1 {
          color: #2c3e50;
          font-size: 2.5em;
          margin-bottom: 10px;
        }
        h2 {
          color: #34495e;
          margin-bottom: 15px;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .info-card, .actions {
          background-color: #ecf0f1;
          padding: 20px;
          border-radius: 8px;
        }
        .info-card p {
          margin-bottom: 10px;
        }
        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1em;
          transition: background-color 0.3s, transform 0.1s;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .button:active {
          transform: translateY(0);
        }
        .button-connect {
          background-color: #3498db;
          color: white;
        }
        .button-connect:hover {
          background-color: #2980b9;
        }
        .button-deposit {
          background-color: #2ecc71;
          color: white;
        }
        .button-deposit:hover {
          background-color: #27ae60;
        }
        .button-withdraw {
          background-color: #e74c3c;
          color: white;
        }
        .button-withdraw:hover {
          background-color: #c0392b;
        }
        .button-greeting {
          background-color: #f39c12;
          color: white;
        }
        .button-greeting:hover {
          background-color: #d35400;
        }
        .text-error {
          color: #e74c3c;
          text-align: center;
        }
        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}















