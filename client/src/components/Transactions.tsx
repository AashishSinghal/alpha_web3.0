import * as React from "react";
import { Copy } from ".";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

interface ITransactionCard {
  id: number;
  message: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
  keyword: string;
}

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  keyword,
}: ITransactionCard) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <div className="flex items-center">
            <a
              href={`https://ropsten.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noopener noreferrer "
            >
              <p className="text-white text-base ">
                From : {shortenAddress(addressFrom)}
              </p>
            </a>
            <Copy copyThis={addressFrom} />
          </div>
          <div className="flex items-center">
            <a
              href={`https://ropsten.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noopener noreferrer "
            >
              <p className="text-white text-base ">
                To : {shortenAddress(addressTo)}
              </p>
            </a>
            <Copy copyThis={addressTo} />
          </div>
          <p className="text-white text-base">Amount : {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message : {message}</p>
            </>
          )}
        </div>
        <img
          src={
            gifUrl ||
            `https://media4.giphy.com/media/eeL8EcBBTwSMLACw6F/giphy.gif?cid=63a75e74bf2v86pt7gnhw63e82ndjjir18m83n14ib3u0z27&rid=giphy.gif&ct=g`
          }
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl z-10">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};
const Transactions = () => {
  const { currentAccount, transactions } = React.useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your Account to see the Latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction: any, index: number) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
