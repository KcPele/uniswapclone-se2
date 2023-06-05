import React, { useContext, useState } from "react";
import Image from "next/image";
import images from "../../assets";
//CONTEXT
import { SwapTokenContext } from "../../context/SwapContext";
import Button from "../Button";
import { Spinner } from "../Spinner";
import { SearchToken, Token } from "../index";
import { AiOutlineSetting } from "react-icons/ai";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const HeroSection = ({}) => {
  //USESTATE
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setPoolMessage] = useState("");
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);
  const { address: account } = useAccount();
  const { singleSwapToken, tokenData, getPrice, swapUpdatePrice } = useContext(SwapTokenContext);

  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "YourContract",
  //   functionName: "setGreeting",
  //   args: [newGreeting],
  //   value: "0.01",
  // });

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

  const callOutPut = async value => {
    try {
      const yourAccount = account;
      const deadline = 10;
      const slippageAmount = 25;
      const data = await swapUpdatePrice(value, slippageAmount, deadline, yourAccount, tokenOne, tokenTwo);
      console.log(data);

      setTokenSwapOutPut(data[1]);
      setSearch(false);

      const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
      const poolData = await getPrice(value, poolAddress);
      const message = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`;
      console.log(message);
      setPoolMessage(message);
    } catch (error) {
      console.log(error);
    }
  };
  //JSX
  return (
    <div className="w-[90%] mx-[2rem] my-auto flex items-center justify-center relative">
      <div className="mt-[5rem] p-[1rem] shadow-lg rounded max-w-[30rem]">
        <div className="flex items-center justify-between">
          <p>Swap</p>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary"
            onClick={() => setOpenSetting(true)}
          >
            <AiOutlineSetting size={24} color="white" />
          </div>
        </div>

        <div className="font-medium text-gray-400 flex gap-1 justify-center items-center border-2 border-primary pl-4 rounded-full">
          <input
            type="number"
            className="border-none bg-transparent w-full outline-none"
            placeholder="0"
            onChange={e => (callOutPut(e.target.value), setSwapAmount(e.target.value), setSearch(true))}
          />
          <button className="flex items-center btn btn-primary" onClick={() => setOpenToken(true)}>
            <Image src={images.image || images.etherlogo} width={20} height={20} alt="ether" />
            {tokenOne.symbol || "ETH"}
            <small className="ml-1 text-white">{tokenOne.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        <div className=" font-medium text-gray-400 pl-4 pr-1 mt-2 border-2 border-primary rounded-full flex items-center justify-between">
          {/* <input type="text" placeholder="0" /> */}

          <p>{search ? <Spinner /> : tokenSwapOutPut}</p>
          <button className="flex items-center btn btn-primary" onClick={() => setOpenTokensTwo(true)}>
            <Image src={tokenTwo.image || images.etherlogo} width={20} height={20} alt="ether" />
            {tokenTwo.symbol || "ETH"}
            <small className="text-white ml-1">{tokenTwo.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        {search ? <Spinner /> : poolMessage}

        {account ? (
          <div className="mt-2">
            <Button
              text="Swap"
              onClick={() =>
                singleSwapToken({
                  token1: tokenOne,
                  token2: tokenTwo,
                  swapAmount,
                })
              }
            />
          </div>
        ) : (
          <div className="mt-2 w-full flex justify-center items-center">
            <RainbowKitCustomConnectButton />
          </div>
        )}
      </div>

      {openSetting && (
        <Token
          setOpenSetting={setOpenSetting}
          setSlippage={() => {}}
          slippage={0}
          deadline={0}
          setDeadline={() => {}}
        />
      )}
      {openToken && <SearchToken openToken={setOpenToken} tokens={setTokenOne} tokenData={tokenData} />}
      {openTokensTwo && <SearchToken openToken={setOpenTokensTwo} tokens={setTokenTwo} tokenData={tokenData} />}
    </div>
  );
};

export default HeroSection;
