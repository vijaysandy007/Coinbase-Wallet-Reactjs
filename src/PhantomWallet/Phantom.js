import React, { useState } from "react";
import {Connection,PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";



const PhantomConnect = () =>{



    const getProvider = () =>{
        if (window["solana"]?.isPhantom) {
            window.solana.connect();
           var balance = window.solana.request({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": ['8jF87wN2a2wD5ZLFpnX4iWcvYkVszy1rXic24L3xQWv7']
          });

          console.log(balance);

          }
          else{
            window.open('https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en')
          }
    }


    return (
        <div>
            <button onClick={getProvider}>Connect Phantom</button>
        </div>
    )
}

export default PhantomConnect