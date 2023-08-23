import { useState, useEffect } from "react";
import './App.css';
import { ethers } from "ethers";
import myNFT from "./myNFT.json";
import Mint from "./Components/Mint";
import GetNFT from "./Components/GetNFT";



function App() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  let contractAddress = "0xc708362c462403AccA5d6e331d2f0CD91008A16B";

  useEffect(() => {
    
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const load = async () => {
      if(provider) {

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        await provider.send("eth_requestAccounts", []);
        setAccount("Loading...")
        const signer = provider.getSigner();
        setAccount("Loading...")
        const address = await signer.getAddress();
        setAccount(address);
        
        let contract = new ethers.Contract( contractAddress, myNFT.abi, signer);
        setContract(contract);  
        setProvider(provider);
      } else {
        alert("Please install Metamask");
      }
    };
    provider && load();
  }, [])
  
  return (
    <>
      <div>
        <h1 className="appH1">NFT-Checker</h1>
      </div>
      <p className="appP">Account: {account? account : "Not Connected"}</p>
      <div>
      </div>
      <Mint contract={contract}/>
      <GetNFT account={account} />
    </>
  );
}

export default App;
