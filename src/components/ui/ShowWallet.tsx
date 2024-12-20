import React from 'react'
import { walletType } from '../Wallet'

interface propsType {
    wallet : walletType,
}
const ShowWallet = ({wallet}:propsType) => {
  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg mb-4">
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
                value={wallet.publicKey}
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
                value={wallet.privateKey}
                disabled
              />
            </div>
          </div>
  )
}

export default ShowWallet