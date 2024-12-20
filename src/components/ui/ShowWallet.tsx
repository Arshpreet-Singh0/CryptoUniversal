import React, { useState } from "react";
import { walletType } from "../Wallet";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

interface propsType {
  wallet: walletType;
  setSnackbarOpen : (state:boolean)=>void;
}
const ShowWallet = ({ wallet, setSnackbarOpen }: propsType) => {
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

  const copyToClipboard = (text:string) => {
    if(!text) return;
    setSnackbarOpen(true);
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg mb-4">
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
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
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
            {
                showPrivateKey ? <RemoveRedEyeIcon className="text-gray-500 hover:text-white"/> : <VisibilityOffIcon className="text-gray-500 hover:text-white"/>
            }
            
          </button>
          <button
            onClick={() => copyToClipboard(wallet.privateKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowWallet;
