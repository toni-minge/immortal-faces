const filestore_key = process.env.FILESTORE_API_KEY

import axios from 'axios'
import { ethers } from 'ethers';
import toast from "../../components/template/toast";
import contract from '../../contracts/src/NFF.json';
import contract_light from '../../contracts/src/NFFL.json';

const contractAddress = process.env.NODE_ENV == "development" ?
  "0x21bbc80B7016870816363C38a8078e1D572ede53" :
  "0xa8493288e3642e7bf36652d458b5E80Ab1A123f9";
const contractAddressLight = process.env.NODE_ENV == "development" ?
  "0xfEbEE5055956265EA2e56ad879ca45400c966399" :
  "0x29674B7feD83a3D0Ca54Bf9A6426f3f4212C8Bbb";
const abi = contract;
const abi_light = contract_light;

export const checkWalletIsConnected = async (dispatch) => {
  const { ethereum } = window;

  if (!ethereum) {
      // toast({type: "info", message: "Make sure you have Metamask installed."})
    return;
  } else {
    try {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      dispatch({type: 'SET_ACCOUNT', payload: accounts[0]})
      initContract(dispatch)
    } catch (err){
      console.log(err)
    }

  }
}

export const initContract = async (dispatch, is_light_mode) => {
  const { ethereum } = window;

  if (!ethereum) {
    dispatch({type: 'SET_LOADING', payload: false})
    dispatch({type: 'SET_ERROR', payload: 'no_eth_obj'})
    return
  }

  const _contractAddress = is_light_mode ? contractAddressLight : contractAddress
  const _abi = is_light_mode ? abi_light : abi
  // console.log(ethereum)

  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const nftContract = new ethers.Contract(_contractAddress, _abi, signer)

  dispatch({type: 'SET_CONTRACT', payload: nftContract})
  getContractData(dispatch, nftContract)
}

export const getContractData = async (dispatch, contract) => {
  const max_supply_req = await contract.totalSupply()
  const current_supply_req = await contract.currentSupply()
  const public_cost_req = await contract.public_cost()
  const whitelist_cost_req = await contract.whitelist_cost()

  const public_cost = public_cost_req.toBigInt()
  const whitelist_cost = whitelist_cost_req.toBigInt()

  const max_supply = max_supply_req.toNumber()
  const current_supply = current_supply_req.toNumber()

  dispatch({type: 'SET_MAX_SUPPLY', payload: max_supply})
  dispatch({type: 'SET_CURRENT_SUPPLY', payload: current_supply})
  dispatch({type: 'SET_PUBLIC_COST', payload: ethers.utils.formatEther(public_cost)})
  dispatch({type: 'SET_WHITELIST_COST', payload: ethers.utils.formatEther(whitelist_cost)})
}

export const checkIfWhitelisted = async (dispatch, contract, account) => {
  const is_whitelisted = await contract.hasMintsLeft(account)
  dispatch({type: 'SET_IS_WHITELISTED', payload: is_whitelisted})
}

export const addWalletListener = (dispatch) => {
  const { ethereum } = window;

  if (!ethereum) {
    // toast({type: "info", message: "Make sure you have Metamask installed."})
    return;
  }

  ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length > 0) {
      dispatch({type: 'SET_ACCOUNT', payload: accounts[0]})
    } else {
      dispatch({type: 'SET_ACCOUNT', payload: null})
    }
  });

}

export const connectWalletHandler = async (dispatch, contract) => {
  const { ethereum } = window

  if (!ethereum || typeof ethereum == 'undefined' ) {
    toast({type: "info", message: "Make sure you have Metamask installed."})
  }

  try {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    dispatch({type: 'SET_ACCOUNT', payload: accounts[0]})
  } catch (err){
    if (err.code === -32002) {
      toast({type: "info", message: "Already processing Account Request."})
    }
    console.log(err)
  }
}

export const mintNffHandler = async (dispatch, props, base64, contract, cost) => {
  dispatch({type: 'SET_LOADING', payload: true})
  try {
    const { ethereum } = window;

    if (!ethereum) {
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_ERROR', payload: 'no_eth_obj'})
      return
    }

    const nftContract = contract
    dispatch({type: 'SET_STATUS', payload: 'init'})

    let overrides = {
      value: ethers.utils.parseEther(cost)     // ether in this case MUST be a string
    };

    let nftTxn = await nftContract.mint(
      props.name,
      props.gender,
      props.mood,
      props.description,
      base64.toString(),
      props.age,
      overrides
    )

    dispatch({type: 'SET_STATUS', payload: 'mining'})
    await nftTxn.wait();

    dispatch({type: 'SET_TRANSACTION_HASH', payload: nftTxn.hash})
    dispatch({type: 'SET_STATUS', payload: 'success'})
    dispatch({type: 'SET_LOADING', payload: false})
    dispatch({type: 'INCREASE_SUPPLY'})
    dispatch({type: 'RESET_STATE'})
  } catch (err){
    console.log(err)
    dispatch({type: 'SET_ERROR', payload: 'general_err'})
    dispatch({type: 'SET_LOADING', payload: false})
  }
}

export const mintNffHandlerLight = async (dispatch, props, image, contract, cost, is_whitelisted) => {

  const date = new Date()
  dispatch({type: 'SET_LOADING', payload: true})

  try {
    const { ethereum } = window;

    if (!ethereum) {
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_ERROR', payload: 'no_eth_obj'})
      return
    }

    const nftContract = contract
    dispatch({type: 'SET_STATUS', payload: 'init'})

    let overrides = {
      value: ethers.utils.parseEther(cost)     // ether in this case MUST be a string
    };

    let headers = {
      'headers': {
        'Authorization': `Bearer ${filestore_key}`
      }
    }

    const contentType = 'image/png';
    const blob = b64toBlob(image.replace('data:image/png;base64,', ''), contentType);

    const image_response = await axios.post("https://api.nft.storage/upload", blob, headers)

    if (!image_response.data.ok){
      new Error('An error occured while uploading your image')
    }

    const obj = {
      name: props.name,
      description: props.description,
      attributes: [{
        "trait_type": "gender",
        "value": props.gender
      },{
        "trait_type": "mood",
        "value": props.mood
      },{
        "trait_type": "age",
        "value": props.age.toString()
      }],
      image: `https://ipfs.io/ipfs/${image_response.data.value.cid}`
    }

    const formData = new FormData();

    formData.append('meta', JSON.stringify(obj))

    const metadata = await axios.post("https://api.nft.storage/store", formData, headers)
    const uri = metadata.data.value.url.replace(/^ipfs:\/\//, "");

    let nftTxn

    if (is_whitelisted){
      nftTxn = await nftContract.mintWhitelist(uri, overrides)
    } else {
      nftTxn = await nftContract.mint(uri, overrides)
    }

    dispatch({type: 'SET_STATUS', payload: 'mining'})
    await nftTxn.wait();

    dispatch({type: 'SET_TRANSACTION_HASH', payload: nftTxn.hash})
    dispatch({type: 'SET_STATUS', payload: 'success'})
    dispatch({type: 'SET_LOADING', payload: false})
    dispatch({type: 'INCREASE_SUPPLY'})
    dispatch({type: 'RESET_STATE'})
  } catch (err){
    console.log(err)
    dispatch({type: 'SET_ERROR', payload: 'general_err'})
    dispatch({type: 'SET_LOADING', payload: false})
  }
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
