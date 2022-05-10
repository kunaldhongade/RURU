//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Prevent re-entrancy attack's

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold; // total number of item sold

    address payable owner; // Owner of smart contract
    // people have to pay their NFT on this marketplace
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // a way to access values of the MarketItem struct above by passing an integer ID

    mapping(uint256 => MarketItem) private idMarketItem;

    // log message (When Item is sold)
    event MarketItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function setListingPrice(uint _price) public returns (uint256) {
        if (msg.sender == address(this)) {
            listingPrice = _price;
        }

        listingPrice = _price;
        return listingPrice;
    }

    /// @notice function to get listingPrice
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "price must be above zero");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment(); //add 1 to the total number of items ever created
        uint256 itemId = _itemIds.current();

        idMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender), // address of the seller putting the nft up for sale
            payable(address(0)), // no owner yet (set owner to empty address)
            price,
            false
        );

        // transfer ownership of the nft to the contract itself
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /// @notice fuction to create a sale
    function createMarketSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint price = idMarketItem[itemId].price;
        uint tokenId = idMarketItem[itemId].tokenId;

        require(
            msg.value == price,
            "Please submit the asking price in order to complete purchase"
        );

        // pay the seller th amount
        idMarketItem[itemId].seller.transfer(msg.value);

        // transfer ownership of the nft from the contract itself to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        idMarketItem[itemId].owner = payable(msg.sender); // mark buyer as new owner
        idMarketItem[itemId].sold = true; // mark that it has been sold
        _itemsSold.increment(); // increment the total number of Item sold by 1
        payable(owner).transfer(listingPrice); // pay owner of the contract the listingPrice
    }

    /// @notice total number of items unsold on our platform
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current(); // total number of items ever created
        // total nuber of items that are unsold = total items ever created  - total  items sold
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        // loop through all item ever created
        for (uint i = 0; i < itemCount; i++) {
            // get only unsold item
            // check if the item has not been sold
            // by checking if the owner field is empty
            if (idMarketItem[i + 1].owner == address(0)) {
                // yes this item has never been sold
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice fetch list of NFTS owned bought by this user
    function fetchMYNFTs() public view returns (MarketItem[] memory) {
        // get total number of items ever created
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            // get only the items that this user has bought/is the owner
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1; // total lenght
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice fetch list of NFTS owned bought by this user
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        // get total number of items ever created
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            // get only the items that this user has bought/is the owner
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1; // total lenght
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
