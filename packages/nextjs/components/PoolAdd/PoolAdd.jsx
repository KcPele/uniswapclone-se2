import React, { useContext, useState } from "react";
import Image from "next/image";
//INTERNAL IMPORT
import images from "../../assets";
import { SearchToken, Token } from "../index";
import { AiOutlineSetting } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { SwapTokenContext } from "~~/context/SwapContext";

const PoolAdd = ({ setClosePool }) => {
  const { createLiquidityAndPool, tokenData } = useContext(SwapTokenContext);

  const [openModel, setOpenModel] = useState(false);
  const [openTokenModelOne, setOpenTokenModelOne] = useState(false);
  const [openTokenModelTwo, setOpenTokenModelTwo] = useState(false);
  const [active, setActive] = useState(1);
  const [openFee, setOpenFee] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  //NEW STATE

  const [fee, setFee] = useState(0);
  const [slippage, setSlippage] = useState(25);
  const [deadline, setDeadline] = useState(10);
  const [tokenAmountOne, setTokenAmountOne] = useState(0);
  const [tokenAmountTwo, setTokenAmountTwo] = useState(0);

  //TOKEN 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });
  //TOKEN 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const feePairs = [
    {
      fee: "0.05%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 500,
    },
    {
      fee: "0.3%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 3000,
    },
    {
      fee: "1%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 10000,
    },
  ];

  return (
    <div className="">
      <div className="bg-white rounded-md shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="">
            <BsArrowLeft size={30} onClick={() => setClosePool(false)} />
          </div>
          <div className="">
            <p>Add Liqudity</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <p>
              {tokenOne.name || ""} {tokenOne.tokenBalance.slice(0, 7) || ""}
              {""}
              {""}
              {tokenTwo.name || ""} {tokenTwo.tokenBalance.slice(0, 7) || ""}
            </p>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary"
              onClick={() => setOpenModel(true)}
            >
              <AiOutlineSetting size={24} color="white" />
            </div>
          </div>
        </div>

        {/* //SELECT PRICE RANGE */}
        <div className="grid md:grid-cols-2 bg-secondary p-4 gap-4 rounded-md">
          {/* //LEFT */}
          <div className="">
            <h4>Select Pair</h4>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="cursor-pointer flex items-center gap-2 bg-primary rounded-md p-1"
                onClick={() => setOpenTokenModelOne(true)}
              >
                <p>
                  <Image src={images.etherlogo} alt="image" width={20} height={20} />
                </p>
                <p>{tokenOne.name || "ETH"}</p>
                <p>🡫</p>
              </div>
              <div
                className="cursor-pointer flex items-center gap-2 bg-primary rounded-md p-1"
                onClick={() => setOpenTokenModelTwo(true)}
              >
                <p>
                  <Image src={images.etherlogo} alt="image" width={20} height={20} />
                </p>
                <p>{tokenTwo.name || "Select"}</p>
                <p>🡫</p>
              </div>
            </div>
            {/* //FEE */}
            <div className="flex items-center py-2 px-4 justify-between border-2 border-primary mt-4 rounded-md">
              <div className="">
                <h4>Fee teir</h4>
                <p>The % you will earn in fees</p>
              </div>
              {openFee ? (
                <button onClick={() => setOpenFee(false)}>Hide</button>
              ) : (
                <button onClick={() => setOpenFee(true)}>Show</button>
              )}
            </div>

            {/* //FEE LIST */}
            {openFee && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {feePairs.map((el, i) => (
                  <div
                    className="border-2 border-primary rounded-md p-1 cursor-pointer"
                    key={i + 1}
                    onClick={() => (setActive(i + 1), setFee(el.feeSystem))}
                  >
                    <div className="flex items-center justify-between">
                      <p>{el.fee}</p>
                      <p>
                        {active == i + 1 ? (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary">
                            <GiCheckMark color="white" />
                          </div>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>

                    <small>{el.info}</small>
                    <p className="bg-primary rounded pl-1">{el.number}</p>
                  </div>
                ))}
              </div>
            )}

            {/* //DEPOSIT AMOUNT */}
            <div className="mt-2 p-1 flex-col flex items-center justify-between border-primary border-2 rounded">
              <h4>Deposit Amount</h4>

              <div className="pl-2 flex items-center justify-between border-primary border-2 rounded-md">
                <input
                  type="number"
                  className="border-none bg-transparent w-[50%] outline-none"
                  placeholder={tokenOne.tokenBalance ? tokenOne.tokenBalance.slice(0, 9) : "0.000"}
                  onChange={e => setTokenAmountOne(e.target.value)}
                />
                <div className="bg-primary px-2 rounded text-[1.2rem]">
                  <p className="flex items-center gap-2">
                    <small className="bg-black text-white p-1 rounded">{tokenOne.name || "ETH"}</small> {""}{" "}
                    {tokenOne.symbol || "Ether"}
                  </p>
                </div>
              </div>

              <div className="pl-2 mt-2 flex items-center justify-between border-primary border-2 rounded-md">
                <input
                  type="number"
                  className="border-none bg-transparent w-[50%] outline-none"
                  placeholder={tokenTwo.tokenBalance ? tokenTwo.tokenBalance.slice(0, 9) : "0.000"}
                  onChange={e => setTokenAmountTwo(e.target.value)}
                />
                <div className="bg-primary px-2 rounded text-[1.2rem]">
                  <p className="flex items-center gap-2">
                    <small className="bg-black text-white p-1 rounded">{tokenTwo.name || "ETH"}</small> {""}{" "}
                    {tokenTwo.symbol || "Select"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="">
            <h4>Set Price Range</h4>
            <div className="text-center mt-4">
              <p className="text-[.8rem] mb-2">
                Current Price: 41.1494 {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
              </p>
              <IoWalletOutline className="text-primary" size={80} />
              <h3>Your position will appear here.</h3>
            </div>

            {/* //PRICE RANGE */}

            <div className="grid grid-cols-2 gap-4">
              <div className="px-2 border-2 border-primary text-center rounded">
                <p>Min Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className="border rounded w-full py-2 px-3 border-primary outline-none"
                  onChange={e => setMinPrice(e.target.value)}
                />
                <p>
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>
              {/* //MAX */}
              <div className="px-2 border-2 border-primary text-center rounded">
                <p>Max Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className="border rounded w-full py-2 px-3 border-primary outline-none"
                  onChange={e => setMaxPrice(e.target.value)}
                />
                <p>
                  {" "}
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>
            </div>

            {/* BUTTON */}

            <div className="grid mt-4">
              <button
                className="bg-primary p-2 rounded-md font-bold text-white py-2 px-4"
                onClick={() =>
                  createLiquidityAndPool({
                    tokenAddress0: tokenOne.tokenAddress.tokenAddress,
                    tokenAddress1: tokenTwo.tokenAddress.tokenAddress,
                    fee: fee,
                    tokenPrice1: minPrice,
                    tokenPrice2: maxPrice,
                    slippage: slippage,
                    deadline: deadline,
                    tokenAmmountOne: tokenAmountOne,
                    tokenAmmountTwo: tokenAmountTwo,
                  })
                }
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModel && (
        <div className="absolute bg-[#1e1e1e] inset-0 flex items-center justify-center border-2 border-secondary">
          <Token
            setOpenSetting={setOpenModel}
            setSlippage={setSlippage}
            slippage={slippage}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        </div>
      )}
      {openTokenModelOne && (
        <div className="absolute bg-[#1e1e1e] inset-0 flex items-center justify-center border-2 border-secondary">
          <SearchToken openToken={setOpenTokenModelOne} tokens={setTokenOne} tokenData={tokenData} />
        </div>
      )}

      {openTokenModelTwo && (
        <div className="absolute bg-[#1e1e1e] inset-0 flex items-center justify-center border-2 border-secondary">
          <SearchToken openToken={setOpenTokenModelTwo} tokens={setTokenTwo} tokenData={tokenData} />
        </div>
      )}
    </div>
  );
};

export default PoolAdd;
