import './Mint.css'

function Mint({contract}) {

    const mint = async () => {
        try {
            await contract.mint();
          
        } catch (error) {
          alert("Error minting NFT:", error);
        }
        
      }

    return (
        <>
        <div className="btn">
            <button className="btn btn-warning btn-lg p-3 mintBtn" onClick={mint}>MINT</button>
        </div>
        </>
    );
}
export default Mint;