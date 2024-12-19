"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { generateMnemonic } from "bip39";
import Wallet from "./Wallet";
import AllWallets from "./AllWallets";

export interface SolanaWallet {
  publicKey: string;
  privateKey: string;
}

const GenerateWallet = () => {
  const [secretPhrase, setSecretPhrase] = useState<string>("");
  const [allSolanaWallets, setAllSolanaWallets] = useState<SolanaWallet[]>([]);

  const handleGenerateMnemonic = async () => {
    setAllSolanaWallets([]);
    const mnemonic = generateMnemonic();
    setSecretPhrase(mnemonic);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl text-[#D1D5DA]">Secret Phrase</h1>
      <Button
        text="Generate Secret Phrase"
        variant="primary"
        className="mt-4"
        onClick={handleGenerateMnemonic}
      />

      <div className="mt-10">
        <p className="text-sm text-gray-500">*Remember you secret phrase it is the only way to recover you wallet</p>
        <div className="w-[1024px] h-[344px] bg-gray-800 rounded-lg p-5">
          <div className="grid grid-cols-4 gap-5 mt-5">
            {secretPhrase.length > 0 &&
              secretPhrase.split(" ").map((word, index) => (
                <div
                  className="bg-gray-800 text-gray-300 flex justify-center items-center h-14 rounded-lg border border-gray-600 shadow-lg hover:bg-gray-700 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                  key={index}
                >
                  {word}
                </div>
              ))}
          </div>
        </div>

      </div>

      <Wallet
        secretPhrase={secretPhrase}
        allSolanaWallets={allSolanaWallets}
        setAllSolanaWallets={setAllSolanaWallets}
      />
      
      {allSolanaWallets.length>0 && <AllWallets allSolanaWallets={allSolanaWallets}/>}
    </div>
  );
};

export default GenerateWallet;
