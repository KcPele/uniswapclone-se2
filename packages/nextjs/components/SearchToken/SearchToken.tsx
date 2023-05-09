import React, { useState } from "react";
import Image from "next/image";
import images from "../../assets";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";

interface ISearchToken {
  openToken: React.Dispatch<React.SetStateAction<boolean>>;
  tokens: React.Dispatch<
    React.SetStateAction<{
      name: string;
      image: string;
      symbol: string;
      tokenBalance: string;
      tokenAddress: {
        name: string;
        img: string;
        symbol: string;
        tokenBalance: string;
        tokenAddress: string;
      };
    }>
  >;
  tokenData: {
    name: string;
    img: string;
    symbol: string;
    tokenBalance: string;
    tokenAddress: string;
  }[];
}

const SearchToken = ({ openToken, tokens, tokenData }: ISearchToken) => {
  //USESTATE
  const [active, setActive] = useState(1);

  let tokenList = [];
  for (let i = 0; i < tokenData.length; i++) {
    if (i % 2 == 1) tokenList.push(tokenData[i]);
  }

  const coin = [
    {
      img: images.ether,
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      img: images.ether,
      name: "Dia token",
      symbol: "DAI",
      tokenBalance: "032222223333333",
    },
    {
      img: images.ether,
      name: "Doge token",
      symbol: "DOG",
      tokenBalance: "032222223333333",
    },
    {
      img: images.ether,
      name: "Funny",
      symbol: "FUN",
      tokenBalance: "032222223333333",
    },
  ];
  return (
    <div className="p-4 absolute bg-white shadow-lg w-full sm:w-[30rem] h-[25rem] rounded-md">
      <div className="">
        <div className="flex items-center justify-between">
          <h4>Select a token</h4>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary"
            onClick={() => openToken(false)}
          >
            <AiOutlineCloseCircle size={24} color="white" />
          </div>
        </div>

        <div className="text-white gap-1 mt-2 flex items-center bg-primary px-4 py-2 rounded-md">
          <div>
            <AiOutlineSearch />
          </div>
          <input
            className="placeholder:text-white border-none bg-transparent w-full outline-none"
            type="text"
            placeholder="Search name and past the address"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mt-4">
          {tokenData.map((el, i) => (
            <span
              key={i + 1}
              className={`flex items-center gap-1 border-primary border-2 rounded-md cursor-pointer p-2 ${
                active == i + 1 ? `bg-primary` : ""
              }`}
              onClick={() => (
                setActive(i + 1),
                tokens({
                  name: el.name,
                  image: el.img,
                  symbol: el.symbol,
                  tokenBalance: el.tokenBalance,
                  tokenAddress: el,
                })
              )}
            >
              <Image src={el.img || images.ether} alt="image" width={30} height={30} />
              {el.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
