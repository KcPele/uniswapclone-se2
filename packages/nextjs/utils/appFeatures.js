import {
  IWETHABI,
  IWETHAddress,
  SingleSwapTokenABI,
  SingleSwapTokenAddress,
  userStorageDataABI,
  userStorageDataAddrss,
} from "../context/constants";
import { ethers } from "ethers";

//FETCHING CONTRACT------------------------

//SingleSwapToken TOKEN FETCHING
export const fetchSingleSwapContract = signerOrProvider =>
  new ethers.Contract(SingleSwapTokenAddress, SingleSwapTokenABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithSingleSwapToken = async signer => {
  try {
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//IWTH TOKEN FETCHING
export const fetchIWTHContract = signerOrProvider => new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithIWTHToken = async signer => {
  try {
    const contract = fetchIWTHContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//IWTH TOKEN FETCHING
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = signerOrProvider => new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithDAIToken = async signer => {
  try {
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//USER CONTRACT CONNECTION---------
export const fetchUserStorageContract = signerOrProvider =>
  new ethers.Contract(userStorageDataAddrss, userStorageDataABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithUserStorageContract = async signer => {
  try {
    const contract = fetchUserStorageContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
