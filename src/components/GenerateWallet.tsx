"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { generateMnemonic } from "bip39";
import Wallet from "./Wallet";
import AllWallets from "./AllWallets";
import { walletType } from "./Wallet";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const GenerateWallet = () => {
  const [secretPhrase, setSecretPhrase] = useState<string>("");
  const [allSolanaWallets, setAllSolanaWallets] = useState<walletType[]>([]);
  const [allEtherWallets, setAllEtherWallets] = useState<walletType[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleGenerateMnemonic = async () => {
    setAllSolanaWallets([]);
    const mnemonic = generateMnemonic();
    localStorage.setItem("secretPhrase", mnemonic);
    setSecretPhrase(mnemonic);
  };
  function getArray(key:string) {
    const arrayString = localStorage.getItem(key);
    if (arrayString) {
      return JSON.parse(arrayString);
    }
    return []; // Return null if the key does not exist
  }
  useEffect(()=>{
      setSecretPhrase(localStorage.getItem("secretPhrase") || "");
      setAllSolanaWallets(getArray("solanaWallets"));
      setAllEtherWallets(getArray("etherWallets"));
  },[]);
  
  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        
        onClose={()=>handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Key copied successfully.
        </Alert>
      </Snackbar>
      <h1 className="font-bold text-2xl text-[#D1D5DA]">Secret Phrase</h1>
      <Button
        text="Generate Secret Phrase"
        variant="primary"
        className="mt-4"
        onClick={handleGenerateMnemonic}
      />

      <div className="mt-10">
        <p className="text-sm text-gray-500">
          *Remember you secret phrase it is the only way to recover you wallet
        </p>
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
        mnemonic={secretPhrase}
        allSolanaWallets={allSolanaWallets}
        setAllSolanaWallets={setAllSolanaWallets}
        allEtherWallets={allEtherWallets}
        setAllEtherWallets={setAllEtherWallets}
        setSnackbarOpen={setSnackbarOpen}
      />

      {(allSolanaWallets.length > 0 || allEtherWallets.length > 0) && (
        <div className="w-[1024px] border p-6 rounded-lg mt-10 bg-gray-700">
          <AllWallets
            allSolanaWallets={allSolanaWallets}
            allEtherWallets={allEtherWallets}
            setSnackbarOpen={setSnackbarOpen}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateWallet;
