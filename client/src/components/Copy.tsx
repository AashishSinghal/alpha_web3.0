import * as React from "react";

import { IoCopy } from "react-icons/io5";

interface ICopy {
  copyThis: string;
}

const Copy = ({ copyThis }: ICopy) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(copyThis);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
    <div className="relative">
      <IoCopy
        className={`text-white h-[25px] w-[25px] m-[3px] p-[5px]`}
        onClick={handleCopy}
      />
      <div
        className={`blue-glassmorphism absolute left-10 top-0 w-max text-white text-xs px-[10px] py-[5px] transition-opacity duration-300 ease-in-out ${
          !isCopied ? "opacity-0" : "opacity-100"
        }`}
      >
        Copied !
      </div>
    </div>
  );
};

export default Copy;
