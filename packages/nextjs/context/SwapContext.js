import React, { useEffect, useState } from "react";
import { addLiquidityExternal } from "../utils/addLiquidity";
import {
  connectingWithDAIToken,
  connectingWithIWTHToken,
  connectingWithSingleSwapToken,
  connectingWithUserStorageContract,
} from "../utils/appFeatures";
import { getLiquidityData } from "../utils/checkLiquidity";
import { getPrice } from "../utils/fetchingPrice";
import { swapUpdatePrice } from "../utils/swapUpdatePrice";
import ERC20 from "./ERC20.json";
import { BigNumber, ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  const { address: account, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  //USSTATE
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);
  const [getAllLiquidity, setGetAllLiquidity] = useState([]);
  //TOP TOKENS
  const [topTokensList, setTopTokensList] = useState([]);

  const addToken = [
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  ];

  //FETCH DATA
  const fetchingData = async () => {
    if (!account) return;
    try {
      //ALL TOKEN BALANCE AND DATA
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, ERC20, provider);
        //GETTING BALANCE OF TOKEN
        const userBalance = await contract.balanceOf(account);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);
        //GET NAME AND SYMBOL

        const symbol = await contract.symbol();
        const name = await contract.name();

        //prevent duplicate
        const check = tokenData.find(val => val.tokenAddress === el);

        if (check) return;
        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });
      });

      // //GET LIQUDITy
      // const userStorageData = await connectingWithUserStorageContract();
      // const userLiquidity = await userStorageData.getAllTransactions();
      // console.log(userLiquidity);

      // userLiquidity.map(async (el, i) => {
      //   const liquidityData = await getLiquidityData(
      //     el.poolAddress,
      //     el.tokenAddress0,
      //     el.tokenAddress1
      //   );

      //   getAllLiquidity.push(liquidityData);
      //   console.log(getAllLiquidity);
      // });

      const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

      const query = `
      {
        tokens(orderBy: volumeUSD, orderDirection: desc, first:20){
          id
          name
          symbol
           decimals
          volume
          volumeUSD
           totalSupply
           feesUSD
           txCount
           poolCount
           totalValueLockedUSD
           totalValueLocked
           derivedETH
        }
      }
      `;

      // const axiosData = await axios.post(URL, { query: query });
      // console.log(axiosData.data.data.tokens);
      // setTopTokensList(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [account, isConnected]);

  //CREATE AND ADD LIQUIDITY
  const createLiquidityAndPool = async ({
    tokenAddress0,
    tokenAddress1,
    fee,
    tokenPrice1,
    tokenPrice2,
    slippage,
    deadline,
    tokenAmmountOne,
    tokenAmmountTwo,
  }) => {
    try {
      console.log(
        tokenAddress0,
        tokenAddress1,
        fee,
        tokenPrice1,
        tokenPrice2,
        slippage,
        deadline,
        tokenAmmountOne,
        tokenAmmountTwo,
      );
      //CREATE POOL
      const createPool = await connectingWithPoolContract(tokenAddress0, tokenAddress1, fee, tokenPrice1, tokenPrice2, {
        gasLimit: 500000,
      });

      const poolAddress = createPool;
      console.log(poolAddress);

      //CREATE LIQUIDITY
      const info = await addLiquidityExternal(
        tokenAddress0,
        tokenAddress1,
        poolAddress,
        fee,
        tokenAmmountOne,
        tokenAmmountTwo,
      );
      console.log(info);

      //ADD DATA
      const userStorageData = await connectingWithUserStorageContract();

      const userLiqudity = await userStorageData.addToBlockchain(poolAddress, tokenAddress0, tokenAddress1);
    } catch (error) {
      console.log(error);
    }
  };

  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    console.log(token1.tokenAddress.tokenAddress, token2.tokenAddress.tokenAddress, swapAmount);
    try {
      let singleSwapToken;
      let weth;
      let dai;
      singleSwapToken = await connectingWithSingleSwapToken(signer);
      weth = await connectingWithIWTHToken(signer);
      dai = await connectingWithDAIToken(signer);

      console.log(singleSwapToken);
      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

      await weth.deposit({ value: amountIn });
      console.log(amountIn);
      await weth.approve(singleSwapToken.address, amountIn);
      //SWAP
      const transaction = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress.tokenAddress,
        token2.tokenAddress.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        },
      );
      await transaction.wait();
      console.log(transaction);
      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);
      console.log("DAI balance:", ethValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        getPrice,
        swapUpdatePrice,
        createLiquidityAndPool,
        singleSwapToken,
        getAllLiquidity,
        weth9,
        dai,
        tokenData,
        topTokensList,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
