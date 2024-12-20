import React from "react";
import { walletType } from "./Wallet";
import ShowWallet from "./ui/ShowWallet";

interface propsType {
  allSolanaWallets: walletType[];
  allEtherWallets: walletType[];
  setSnackbarOpen : (state:boolean)=>void;
}

const AllWallets = ({ allSolanaWallets, allEtherWallets, setSnackbarOpen }: propsType) => {
  return (
    <div className="flex flex-col">
      {allSolanaWallets.length > 0 && (
        <div key={"div1"}>
          <h1 className="text-2xl font-bold mb-5 text-black">
            All Solana Wallets
          </h1>
          {allSolanaWallets?.map((wallet, idx) => (
            <>
              <ShowWallet wallet={wallet} key={idx} setSnackbarOpen={setSnackbarOpen} idx={idx} type="solana"/>
            </>
          ))}
        </div>
      )}
      {allEtherWallets.length > 0 && (
        <div key={"div2"}>
          <h1 className="text-2xl font-bold mb-5 text-black">
            All Etherium Wallets
          </h1>
          {allEtherWallets?.map((wallet, idx) => (
            <>
              <ShowWallet wallet={wallet} key={idx} setSnackbarOpen={setSnackbarOpen} idx={idx} type="etherium"/>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWallets;
