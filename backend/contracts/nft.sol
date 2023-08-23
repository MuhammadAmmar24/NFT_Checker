// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract myNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    constructor() ERC721("Amma_NFT", "AMT") {}

    function mint(string memory tokenURI) public {
        tokenId.increment();
        uint256 newItemId = tokenId.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }
}