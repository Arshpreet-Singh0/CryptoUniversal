import React from 'react'
import { SolanaWallet } from './GenerateWallet'

interface propsType {
    allSolanaWallets : SolanaWallet[],
}

const AllWallets = ({allSolanaWallets}:propsType) => {
  return (
    <div className="w-[1024px] border p-6 rounded-lg mt-10 bg-gray-700">
        <h1 className='text-2xl font-bold mb-5 text-black'>All Solana Wallets</h1>
        {allSolanaWallets?.map((wallet, idx) => (
          <div className="text-white bg-gray-800 p-4 rounded-lg mb-4" key={idx}>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="text-sm font-bold text-gray-400"
              >
                Public key
              </label>{" "}
              <br />
              <input
                type="text"
                className="py-2 w-full rounded-lg bg-gray-700 px-2"
                value={
                  wallet.publicKey
                }
                disabled
              />

            </div>
            <div>
              <label
                htmlFor="address"
                className="text-sm font-bold text-gray-400"
              >
                Private key
              </label>{" "}
              <br />
              <input
                type="text"
                className="py-2 w-full rounded-lg bg-gray-700 px-2"
                value={
                  wallet.privateKey
                }
                disabled
              />

            </div>
            </div>
        ))}
      </div>
  )
}

export default AllWallets