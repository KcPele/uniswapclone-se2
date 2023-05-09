import React, { useContext } from "react";
import { RainbowKitCustomConnectButton } from "../scaffold-eth";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount } from "wagmi";
import { SwapTokenContext } from "~~/context/SwapContext";

interface IPoolConnect {
  setClosePool: React.Dispatch<React.SetStateAction<boolean>>;
}
const PoolConnect = ({ setClosePool }: IPoolConnect) => {
  const { address: account } = useAccount();
  const { getAllLiquidity } = useContext(SwapTokenContext);

  console.log(getAllLiquidity);

  const tokenList = [];
  for (let i = 0; i < getAllLiquidity.length; i++) {
    if (i % 2 == 1) tokenList.push(getAllLiquidity[i]);
  }

  console.log(tokenList);
  return (
    <div className="">
      <div className="bg-white px-6 py-2 rounded-md shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[2rem]">Pool</h2>
          <p className="bg-primary rounded-md p-2" onClick={() => setClosePool(true)}>
            + New Position
          </p>
        </div>

        {!account ? (
          <div className="">
            <IoWalletOutline className="text-primary" size={80} />
            <div className="flex flex-col items-center justify-center">
              <p>Your active V3 liquidity positions will appear here.</p>
              <RainbowKitCustomConnectButton />
            </div>
          </div>
        ) : (
          <div className="">
            <div className="">
              <p>Your Position {tokenList.length}</p>
            </div>

            {tokenList.map((el, index) => (
              <div key={index} className="border-2 border-primary rounded-md p-2">
                <div className="flex items-center justify-between">
                  <p>
                    <small className="bg-primary p-2 rounded-md">{el.poolExample.token0.name}</small>
                    {""}
                    <small className="bg-primary p-2 rounded-md">{el.poolExample.token1.name}</small>
                    {""}
                    <span className="text-[1.2rem] md:hidden">
                      {el.poolExample.token0.name} /{el.poolExample.token1.name}
                    </span>
                    {""}
                    <span className="text-[1.2rem]">{el.fee}</span>
                    {""}
                  </p>
                  <p className="bg-primary rounded-md p-2 text-white">In Range</p>
                </div>
                <div className="">
                  <p>
                    <small>Min: 0.999</small>
                    {""}
                    <span>
                      {el.poolExample.token0.name} per {""} {el.poolExample.token1.name}
                    </span>
                    {""} <span>--------</span> <small>Max: 1.000</small>
                    {""}
                    <span className="md:hidden">
                      {el.poolExample.token0.name} per {""} {el.poolExample.token1.name}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-2 mt-4 sm:grid-cols-[1.5fr,1fr]">
          <div className="border-2 border-primary rounded-md p-2">
            <h5 className="text-primary">Learn about providing liquidity</h5>
            <p>Check out our v3 LP walkthrough and migrate guide</p>
          </div>
          <div className="border-2 border-primary rounded-md p-2">
            <h5 className="text-primary">Top pools</h5>
            <p>Explore Uniswap Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolConnect;
