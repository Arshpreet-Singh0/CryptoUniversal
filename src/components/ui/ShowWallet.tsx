"use client"

import React, { useState } from "react";
import { walletType } from "../Wallet";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Button } from "./Button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";

interface propsType {
  wallet: walletType;
  setSnackbarOpen: (state: boolean) => void;
  idx: number;
  type : string
}
const ShowWallet = ({ wallet, setSnackbarOpen, idx, type }: propsType) => {
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  const copyToClipboard = (text: string) => {
    if (!text) return;
    setSnackbarOpen(true);
    navigator.clipboard.writeText(text);
  };

  const handleShowBalance = async(type:string)=>{
    if(type==="solana"){
        try {
          const res = await axios.post(`https://solana-mainnet.g.alchemy.com/v2/${apiKey}`,{
            jsonrpc: "2.0",
            method: "getBalance",
            params: [wallet.publicKey],
            id: 1
          });
          console.log(res);
          const balance = res?.data?.result?.value / LAMPORTS_PER_SOL;
          setBalance(balance);
          
        } catch (error) {
          console.log(error);
        }
    }
    else{
      try {
        const res = await axios.post(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,{
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [wallet.publicKey, "latest"],
        })
        const result = parseInt(res?.data?.result, 16);
        setBalance(result);
        
        
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">Wallet {idx + 1}</h2>
        <Button text="Show Balance" variant="outline" onClick={()=>handleShowBalance(type)} />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="text-sm font-bold text-gray-400">
          Public key
        </label>{" "}
        <br />
        <div className="flex items-center relative w-full">
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={wallet.publicKey}
            disabled
          />
          <button
            onClick={() => copyToClipboard(wallet.publicKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white" />
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="address" className="text-sm font-bold text-gray-400">
          Private key
        </label>{" "}
        <br />
        <div className="flex items-center relative w-full">
          <input
            type={showPrivateKey ? "text" : "password"}
            className="py-2 w-full rounded-lg bg-gray-700 px-2 pr-20"
            value={wallet.privateKey}
            disabled
          />
          <button
            onClick={() => setShowPrivateKey(!showPrivateKey)}
            className="absolute inset-y-0 right-8 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            {showPrivateKey ? (
              <RemoveRedEyeIcon className="text-gray-500 hover:text-white" />
            ) : (
              <VisibilityOffIcon className="text-gray-500 hover:text-white" />
            )}
          </button>
          <button
            onClick={() => copyToClipboard(wallet.privateKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white" />
          </button>
        </div>
      </div>
      {
        balance!=null && (
          <div className="mt-8 inline-block rounded-lg p-2 bg-gray-700">
            
                <h1 className="text-2xl text-gr font-bold">
                  Balance : {balance}
                </h1>
          </div>

        )
      }

    </div>
  );
};

export default ShowWallet;
