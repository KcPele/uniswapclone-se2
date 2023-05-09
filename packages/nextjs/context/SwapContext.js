import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  //USSTATE
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [provider, setProvider] = useState("");

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
    "0xe044814c9eD1e6442Af956a817c161192cBaE98F",
    "0xaB837301d12cDc4b97f1E910FC56C9179894d9cf",
    "0x4ff1f64683785E0460c24A4EF78D582C2488704f",
  ];

  //FETCH DATA
  const fetchingData = async () => {
    try {
      //GET USER ACCOUNT
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);
      //CREATE PROVIDER
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      //CHECK Balance
      const balance = await provider.getBalance(userAccount);
      const convertBal = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(convertBal);
      setEther(ethValue);

      //GET NETWORK
      const newtork = await provider.getNetwork();
      setNetworkConnect(newtork.name);

      //ALL TOKEN BALANCE AND DATA
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, ERC20, provider);
        //GETTING BALANCE OF TOKEN
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);
        //GET NAME AND SYMBOL

        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });
      });

      // //GET LIQUDITY
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

      const axiosData = await axios.post(URL, { query: query });
      console.log(axiosData.data.data.tokens);
      setTopTokensList(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchingData();
  // }, [account]);

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
      // const userStorageData = await connectingWithUserStorageContract();

      // const userLiqudity = await userStorageData.addToBlockchain(
      //   poolAddress,
      //   tokenAddress0,
      //   tokenAddress1
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        // getPrice,
        // swapUpdatePrice,
        // createLiquidityAndPool,
        getAllLiquidity,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
        provider,
        topTokensList,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};