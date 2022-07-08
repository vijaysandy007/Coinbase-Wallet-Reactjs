import React, { useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import './CoinbaseWallet.css'

const CoinBaseWalletConnect = () => {
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    const [signature , setSignature] = useState();

    const providerOptions = {
        coinbasewallet: {
            package: CoinbaseWalletSDK,
            options: {
                appName: "Web 3 Modal Demo",
                infuraId:'https://goerli.infura.io/v3/541999c8adbc4c3594d03a6b7b71eda6',
            }
        },
        walletConnect: {
            package: WalletConnect,
            options: {
                infuraId:'https://rpc-mumbai.maticvigil.com/v1/ad37690c0f7918a3e63ace8f09d968145acf2395'
            }
        }
    }

    const web3Model = new Web3Modal({
        providerOptions: providerOptions
    })

    const connectWallet = async () => {
        try {

            const provider = await web3Model.connect();
            const library = new ethers.providers.Web3Provider(provider)
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            const signature = await library.provider.request({
                method: 'personal_sign',
                params: ['Are you want connect this site', accounts[0]]
            })
            setSignature(signature)
            setProvider(provider);
            setLibrary(library);
            setAccount(accounts[0])
            setNetwork(network)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={connectWallet} className="coinbase
            ">Connect Wallet</button>

        <button className="commingsoon">Get Balance (comming soon) </button>&nbsp;&nbsp;
        <button className="commingsoon">Send Transcation (comming soon) </button>

            <div>Wallet Address: <span>${account}</span> </div>
            <div>Signature:  <span>${signature}</span> </div>
        </div>
    )
}

export default CoinBaseWalletConnect