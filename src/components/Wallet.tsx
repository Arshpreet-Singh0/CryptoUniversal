"use client";

import { Button } from "./ui/Button";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { ethers } from "ethers";
import { HDNodeWallet } from "ethers";

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
}
const Wallet = ({
  mnemonic,
  allSolanaWallets,
  setAllSolanaWallets,
  allEtherWallets,
  setAllEtherWallets,
}: propsType) => {

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

  

  return (
    <div className="flex justify-between items-center w-[1024px] h-[258px] mt-16">
      <div className="bg-gray-800 rounded-lg h-full w-[406px] p-6">
        <Button
          text="Generate SOLANA Wallet"
          variant="secondary"
          className=""
          onClick={handleGenerateSolanaWallet}
        />
        <div>
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Public key
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={
              allSolanaWallets[allSolanaWallets.length - 1]?.publicKey || ""
            }
            disabled
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Private key
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={
              allSolanaWallets[allSolanaWallets.length - 1]?.privateKey || ""
            }
            disabled
          />
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
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={allEtherWallets[allEtherWallets.length-1]?.publicKey || ""}
            disabled
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-sm font-bold text-gray-400">
            Private key
          </label>{" "}
          <br />
          <input
            type="text"
            className="py-2 w-full rounded-lg bg-gray-700 px-2"
            value={allEtherWallets[allEtherWallets.length-1]?.privateKey || ""}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
