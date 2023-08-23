import { useState,useEffect } from "react";
import "./GetNFT.css";
import axios from 'axios';  


function GetNFT({account}) {

    const [nft, setNft] = useState([])
    const [hasNft, setHasNft] = useState("");

    const getNFT = () =>  {
        setHasNft("Loading...")
        // Alchemy URL
        const baseURL = process.env.REACT_APP_ALCHEMY_KEY;
        
        const url = `${baseURL}/getNFTs/?owner=${account}`;
        setHasNft("Loading...")
        
        const config = {
          method: 'get',
            url: url,
        };
        setHasNft("Loading...")
        axios(config)
        .then(response => {
            setNft(response.data.ownedNfts);
            setHasNft("First mint to get NFT...");
        })
        .catch(error => setHasNft("") || alert('error', error));
    }
    useEffect(() => {
        if(nft.length > 0) {
            setHasNft("");
            } 
    }, [nft]);

    return (
        <>
            <div className="btn"> 
                <button className="btn btn-outline-warning btn-lg p-3 getNFTBtn mb-3" onClick={getNFT}>Show NFTs</button>
            </div>
            
            
            {nft.length > 0 && <div className="container mt-5 ">
                <div className="row">
                {nft.map((_nft, index) => {
                   return <div className="col-md-3 nftContainer" key={index}>   
                   <h1>NFT: {index+1}</h1>
                   <hr />
                        <p><b>Token Id:</b> {_nft.id.tokenId.slice(0,6)}...{_nft.id.tokenId.slice(60,66)} </p>
                        <p><b>Contract Address:</b> {_nft.contract.address}</p>
                        <p><b>Name:</b> {_nft.contractMetadata.name}</p>
                        <p><b>Symbol:</b> {_nft.contractMetadata.symbol}</p>
                        <p><b>Type:</b> {_nft.contractMetadata.tokenType}</p>
                    </div>
                })}
                </div>
            </div>}
            <p className="getnftP">{hasNft}</p> 
        </>
    );
}
export default GetNFT;
