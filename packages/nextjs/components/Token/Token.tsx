import React from "react";
import { Toggle } from "../index";
import { AiFillLock, AiOutlineCloseCircle } from "react-icons/ai";

interface IToken {
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setSlippage: React.Dispatch<React.SetStateAction<string>>;
  slippage: string;
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
}
const Token = ({ setOpenSetting, setSlippage, slippage, deadline, setDeadline }: IToken) => {
  return (
    <div className="p-4 absolute bg-white shadow-lg w-full sm:w-[30rem] h-[25rem] rounded-md">
      <div className="">
        <div className="flex items-center justify-between">
          <h4 className="text-[1.2rem]">Setting</h4>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary"
            onClick={() => setOpenSetting(false)}
          >
            <AiOutlineCloseCircle size={24} color="white" />
          </div>
        </div>
        <p className="flex items-center gap-3">
          Slippage tolerance{""}
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <AiFillLock color="white" />
          </div>
        </p>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-secondary p-2">auto</button>
          <input
            className="bg-transparent rounded-lg border-primary border-2 outline-none w-[80%] p-2"
            type="text"
            placeholder={slippage}
            onChange={e => setSlippage(e.target.value)}
          />
        </div>

        <p className="flex items-center gap-3">
          Deatline Time{""}
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <AiFillLock color="white" />
          </div>
        </p>

        <div className="flex items-center gap-3 mb-2">
          <input
            className="bg-transparent rounded-lg border-primary border-2 outline-none w-[80%] p-2"
            type="text"
            placeholder={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
          <button className="rounded-lg bg-secondary p-2">minutes</button>
        </div>

        <h2>Interface Setting</h2>

        <div className="flex items-center justify-between">
          <p className="">Transaction deadline</p>
          <Toggle label="No" />
        </div>
      </div>
    </div>
  );
};

export default Token;
