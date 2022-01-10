import * as React from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

interface ITransactionContext {
  connectWallet: any;
  currentAccount: string;
  formData: IFormData;
  setFormData: any;
  handleChange: (e: any, name: any) => void;
  sendTransaction: any;
  transactions: any;
  isLoading: boolean;
}

export const TransactionContext = React.createContext(
  {} as ITransactionContext
);

// "ethereum" Does not exits on the browser window by default by installing Metamask extension added it onto the window object. so the code works but gives error in development since IDE does not know this fact
// A global Extension to window object for ethereum
declare global {
  interface Window {
    ethereum: any;
    reload: () => void;
  }
}

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transationContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transationContract;
};

interface ITransactionProvider {
  children: React.ReactNode;
}

interface IFormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

interface ITransaction {
  receiver: any;
  sender: any;
  timestamp: { toNumber: () => number };
  message: any;
  keyword: any;
  amount: { _hex: string };
}

export const TransactionProvider = ({ children }: ITransactionProvider) => {
  const [currentAccount, setCurrentAccount] = React.useState<any>();
  const [formData, setFormData] = React.useState<IFormData>({} as IFormData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [transactionCount, setTransactionCount] = React.useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (
    // e: { preventDefault: () => void; target: { value: any } },
    e: any,
    name: any
  ) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structTransactions = availableTransactions.map(
        (transaction: ITransaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      console.log(availableTransactions, structTransactions);
      setTransactions(structTransactions);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No Accounts Found");
      }
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask !");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask !");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmt = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //210000 GWEI
            value: parsedAmt._hex, // 0.00001 in Hex Value
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmt,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  React.useEffect(() => {
    checkIfTransactionsExist();
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
