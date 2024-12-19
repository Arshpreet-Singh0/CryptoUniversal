"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { SolanaWallet } from "./GenerateWallet";

interface propsType {
    secretPhrase : string,
    allSolanaWallets : SolanaWallet[],
    setAllSolanaWallets: (wallets: SolanaWallet[]) => void,

}
const Wallet = ({secretPhrase, allSolanaWallets, setAllSolanaWallets}:propsType) => {
    console.log(allSolanaWallets);
    

    const handleGenerateSolanaKeys = async()=>{
        if(!secretPhrase) return;
        const seed = mnemonicToSeedSync(secretPhrase);
        const path = `m/44'/501'/${allSolanaWallets.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
          // Generate the keypair
        const keypair = Keypair.fromSecretKey(
            Buffer.from(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
        );

        // Extract the public and private keys
        const privateKey = Buffer.from(keypair.secretKey).toString("hex");
        const publicKey = keypair.publicKey.toBase58();

        const newWallet = {publicKey, privateKey};
        setAllSolanaWallets([...allSolanaWallets, newWallet]);
        
    }

  return (
    <div className="flex justify-between items-center w-[1024px] h-[258px] mt-16">
      <div className="bg-gray-800 rounded-lg h-full w-[406px] p-6">
        <Button
          text="Generate SOLANA Wallet"
          variant="secondary"
          className=""
          onClick={handleGenerateSolanaKeys}
        />
        <div>
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Address
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={allSolanaWallets[allSolanaWallets.length-1]?.publicKey || ""}
            disabled
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Address
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={allSolanaWallets[allSolanaWallets.length-1]?.privateKey || ""}
            disabled
          />
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg h-full w-[406px] p-6">
        <Button
          text="Generate ETHEREUM Wallet"
          variant="secondary"
          className=""
        />
        <div>
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Address
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            disabled
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Address
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            disabled
          />
        </div>
      </div>
      
    </div>
  );
};

export default Wallet;
