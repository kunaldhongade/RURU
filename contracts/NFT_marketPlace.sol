// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT_marketPlace is ERC721URIStorage {
    uint256 private _totalItems;
    uint256 private _tokenIdCounter;
    uint256 public commision = 0.0025 ether;
    address owner;

    event NFTCreatedOrListed(uint256 indexed tokenId, address indexed owner, uint256 listingPrice);
    event TopSellersInfo(address owner,uint sales);
    
    struct nftInfo {
        uint tokenId;
        address owner; // the current nft holder.
        address creatorAddress; // its basically the original owner who created this nft.
        bool isListed;
        uint256 listingPrice;
        string tokenURI;
    }

    //mapping for profile owner 


    mapping(uint256 => nftInfo) public NFT;

    constructor() ERC721("NFT MarketPlace", "NFTMKT") {
        _totalItems = 0;
        _tokenIdCounter = 1;
        owner = msg.sender;
    }

    function setCommision(uint256 val) public returns(bool){
        require(msg.sender == owner, "Only owner can setTheCommision");
        commision = val;
        return true;
    }

    function createNFT(uint256 price,string memory tokenURI) public returns (uint256) {
        require(price > 0, "Price should be greater than 0");

        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId,tokenURI);

        NFT[newTokenId] = nftInfo({
            tokenId:newTokenId,
            owner: msg.sender,
            creatorAddress: msg.sender,
            isListed: true,
            listingPrice: price,
            tokenURI:tokenURI
        });

        _tokenIdCounter++;
        emit NFTCreatedOrListed(newTokenId, msg.sender, price);
        return newTokenId;
    }
    
    function fetchNFT(uint tokenId) external  view returns (nftInfo memory){
        return NFT[tokenId];
    }

    function resellNFT(uint256 tokenId, uint256 price) public returns (string memory) {
        require(NFT[tokenId].owner == msg.sender, "You can't sell this token as it doesn't belong to you.");
        require(NFT[tokenId].isListed == false, "This NFT is already listed.");
        require(price > 0, "Price must be greater than 0");

        NFT[tokenId].isListed = true;
        NFT[tokenId].listingPrice = price;
        emit NFTCreatedOrListed(tokenId, msg.sender, price);

        return "Successfully listed on the market";
    }

    function buyNFT(uint256 tokenId) public payable returns (bool) {
        require(NFT[tokenId].isListed == true, "This NFT is not listed on the marketplace.");
        require(msg.value >= NFT[tokenId].listingPrice + commision, "Not enough Ether to buy this NFT");
        require(NFT[tokenId].owner != msg.sender,"You can't buy your own NFT Again!");
        // Transfer NFT ownership
        _transfer(NFT[tokenId].owner, msg.sender, tokenId);

        // Trfansfer funds to seller and contract owner
        address payable seller = payable(NFT[tokenId].owner);
        seller.transfer(NFT[tokenId].listingPrice);
        
        //Transfer commission
        payable(owner).transfer(commision);

        // the top sellers should only be updated in the buying phase because sales will always be increasing no matter if the owner is buying the nfts or not.
        emit TopSellersInfo(NFT[tokenId].owner,NFT[tokenId].listingPrice);

        // pdate ownership and delist the NFT
        NFT[tokenId].owner = msg.sender;
        NFT[tokenId].isListed = false;


        return true;
    }

    function getListedNFTS() public view returns (nftInfo[] memory) {
        uint256 totalListed = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (NFT[i].isListed) {
                totalListed++;
            }
        }

        nftInfo[] memory marketNFTS = new nftInfo[](totalListed);
        uint256 j = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (NFT[i].isListed) {
                marketNFTS[j] = NFT[i];
                j++;
            }
        }

        return marketNFTS;
    }
    function getMyNFTS() public view returns (nftInfo[] memory) {
        uint256 totalListed = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (!NFT[i].isListed && NFT[i].owner == msg.sender) {
                totalListed++;
            }
        }

        nftInfo[] memory MyListedNFTS = new nftInfo[](totalListed);
        uint256 j = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (!NFT[i].isListed && NFT[i].owner == msg.sender) {
                MyListedNFTS[j] = NFT[i];
                j++; 
            }
        }

        return MyListedNFTS;
    }

    function getOwnerNFTS(address Id)public view returns(nftInfo[] memory){
        uint256 totalOwned = 0;
        for (uint256 i=0;i<_tokenIdCounter;i++){     
          if ((NFT[i].isListed || msg.sender==Id) && NFT[i].owner == Id) {
                totalOwned++;                        
            }
        }
        nftInfo[] memory OwnerNFTS = new nftInfo[](totalOwned);
        uint256 j = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if ((NFT[i].isListed || msg.sender==Id) && NFT[i].owner == Id) {
                OwnerNFTS[j] = NFT[i];
                j++;
            }
        }
                return OwnerNFTS;

    }

    function removeNftFromMarketPlace(uint tokenId) external returns(bool){
        require(msg.sender==NFT[tokenId].owner,"you dont own this nft");
        NFT[tokenId].isListed = false;
        return true;

    }
    function getMyListedNFTS() public view returns (nftInfo[] memory) {
        uint256 totalListed = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (NFT[i].isListed && NFT[i].owner == msg.sender) {
                totalListed++;
            }
        }

        nftInfo[] memory MyListedNFTS = new nftInfo[](totalListed);
        uint256 j = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (NFT[i].isListed && NFT[i].owner == msg.sender) {
                MyListedNFTS[j] = NFT[i];
                j++;
            }
        }

        return MyListedNFTS;
    }



}