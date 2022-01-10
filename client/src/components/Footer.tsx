import * as React from "react";
import Logo from "../assets/images/logo.png";
import LogoOnly from "../assets/images/logo2.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4 px-4">
        <div className=" flex md:flex-[0.5] flex-initial justify-start items-center">
          <img src={LogoOnly} alt="logo" className="w-10 cursor-pointer mr-3" />
          <span className="text-white text-2xl font-extrabold">ALPHA</span>
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Market
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Exchanges
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Wallets
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Contact Me</p>
        <a
          href="https://aashishsinghal.com"
          target="_blank"
          rel="noopener noreferrer "
          className="text-white text-sm text-center "
        >
          www.aashishsinghal.com
        </a>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
      <div className="sm:w-[90%] w-full flex justify-between items-center">
        <p className="text-white text-sm text-center">@Aashishsinghal</p>
        <p className="text-white text-sm text-center">
          All Rights Reserved &copy;
        </p>
      </div>
    </div>
  );
};

export default Footer;
