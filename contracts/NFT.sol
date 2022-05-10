//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    // for humans to read only
    /// @typeOfCmd 3 slash for app like WEB3 js

    // auto-increment field for each token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // address of the NFT marketplace
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("RURU NFT", "RURU") {
        contractAddress = marketplaceAddress;
    }

    /// @notice create a new token
    /// @param tokenURI : token URI

    function createToken(string memory tokenURI) public returns (uint256) {
        // set a new token id for the token to e minted
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId); // mint the token
        _setTokenURI(newItemId, tokenURI); // generate the URI
        setApprovalForAll(contractAddress, true); // grant Transaction permission to marketplace

        // return token ID
        return newItemId;
    }
}
