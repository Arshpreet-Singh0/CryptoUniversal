"use client";

import { Button } from "./ui/Button";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { ethers } from "ethers";
import { HDNodeWallet } from "ethers";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export interface walletType {
  publicKey: string;
  privateKey: string;
}

interface propsType {
  mnemonic: string;
  allSolanaWallets: walletType[];
  setAllSolanaWallets: (wallets: walletType[]) => void;
  allEtherWallets: walletType[];
  setAllEtherWallets: (wallet: walletType[]) => void;
  setSnackbarOpen : (state:boolean)=>void,
}
const Wallet = ({
  mnemonic,
  allSolanaWallets,
  setAllSolanaWallets,
  allEtherWallets,
  setAllEtherWallets,
  setSnackbarOpen
}: propsType) => {

  const [showSolanaPrivateKey, setShowSolanaPrivateKey] = useState<boolean>(false);
  const [showEtherPrivateKey, setShowEtherPrivateKey] = useState<boolean>(false);

  const handleGenerateSolanaWallet = async () => {
    if (!mnemonic) return;
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${allSolanaWallets.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    // Generate the keypair
    const keypair = Keypair.fromSecretKey(
      Buffer.from(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
    );

    // Extract the public and private keys
    const privateKey = Buffer.from(keypair.secretKey).toString("hex");
    const publicKey = keypair.publicKey.toBase58();

    const newWallet = { publicKey, privateKey };
    setAllSolanaWallets([...allSolanaWallets, newWallet]);
  };

  const handleGenerateEtherWallet = async () => {
    if (!mnemonic) return;
    const path = `m/44'/60'/${allEtherWallets.length}'/0/0`; // Ethereum's derivation path

    // mnemonic to seed
    const seed = mnemonicToSeedSync(mnemonic);

    // Create an HDNode from the seed

    const hdNode = HDNodeWallet.fromSeed(seed);

    // Derive the wallet at the specified path
    const derivedNode = hdNode.derivePath(path);

    // Extract the private and public keys
    const privateKey = derivedNode.privateKey;
    // const publicKey = derivedNode.publicKey;

    // Create a wallet instance
    const wallet = new ethers.Wallet(privateKey);

    // Return the wallet details
    const walletDetails = {publicKey: wallet.address, privateKey};

    setAllEtherWallets([...allEtherWallets, walletDetails]);
  };

  const copyToClipboard = (text:string) => {
    if(!text) return;
    setSnackbarOpen(true);
    navigator.clipboard.writeText(text);
  }

  

  return (
    <div className="flex justify-between items-center w-[1024px] h-[258px] mt-16">
      <div className="bg-gray-800 rounded-lg h-full w-[406px] p-6">
        <Button
          text="Generate SOLANA Wallet"
          variant="secondary"
          className=""
          onClick={handleGenerateSolanaWallet}
        />
        <div className="mb-4">
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Public key
          </label>{" "}
          <br />
          <div className="flex items-center relative w-full">
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2 pr-10"
            value={
              allSolanaWallets[allSolanaWallets.length - 1]?.publicKey || ""
            }
            disabled
          />
          <button
            onClick={() => copyToClipboard(allSolanaWallets[allSolanaWallets.length-1]?.publicKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
          </button>
          </div>
        </div>
        <div>
          <div>
        <label htmlFor="address" className="text-sm font-bold text-gray-400">
          Private key
        </label>{" "}
        <br />
        <div className="flex items-center relative w-full">
          <input
            type={showSolanaPrivateKey ? "text" : "password"}
            className="py-2 w-full rounded-lg bg-gray-700 px-2 pr-20"
            value={allSolanaWallets[allSolanaWallets.length-1]?.privateKey || ""}
            disabled
          />
          <button
            onClick={() => setShowSolanaPrivateKey(!showSolanaPrivateKey)}
            className="absolute inset-y-0 right-8 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            {
                showSolanaPrivateKey ? <RemoveRedEyeIcon className="text-gray-500 hover:text-white"/> : <VisibilityOffIcon className="text-gray-500 hover:text-white"/>
            }
            
          </button>
          <button
            onClick={() => copyToClipboard(allSolanaWallets[allSolanaWallets.length-1]?.privateKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
          </button>
        </div>
      </div>
        </div>

      </div>
      <div className="bg-gray-800 rounded-lg h-full w-[406px] p-6">
        <Button
          text="Generate ETHEREUM Wallet"
          variant="secondary"
          onClick={handleGenerateEtherWallet}
        />
        <div>
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Public key
          </label>{" "}
          <br />
          <div className="flex items-center relative w-full">

          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2 pr-10"
            value={allEtherWallets[allEtherWallets.length-1]?.publicKey || ""}
            disabled
          />
          <button
            onClick={() => copyToClipboard(allEtherWallets[allEtherWallets.length-1]?.publicKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
          </button>
          </div>
        </div>
          
        <div className="mt-4">
        <label htmlFor="address" className="text-sm font-bold text-gray-400">
          Private key
        </label>{" "}
        <br />
        <div className="flex items-center relative w-full">
          <input
            type={showEtherPrivateKey ? "text" : "password"}
            className="py-2 w-full rounded-lg bg-gray-700 px-2 pr-20"
            value={allEtherWallets[allEtherWallets.length-1]?.privateKey || ""}
            disabled
          />
          <button
            onClick={() => setShowEtherPrivateKey(!showEtherPrivateKey)}
            className="absolute inset-y-0 right-8 pr-3 flex items-center text-white cursor-pointer"
            
          >
            {
                showEtherPrivateKey ? <RemoveRedEyeIcon className="text-gray-500 hover:text-white"/> : <VisibilityOffIcon className="text-gray-500 hover:text-white"/>
            }
            
          </button>
          <button
            onClick={() => copyToClipboard(allEtherWallets[allEtherWallets.length-1]?.privateKey || "")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
            style={{ outline: "none" }}
          >
            <ContentPasteIcon className="text-[20px] text-gray-500 hover:text-white"/>
            
          </button>
        </div>
      </div>
        
      </div>
    </div>
  );
};

export default Wallet;
