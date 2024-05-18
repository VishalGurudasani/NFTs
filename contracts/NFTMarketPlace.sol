// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketPlace is ERC721URIStorage, Ownable {
    struct MarketItem {
        uint tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }

    uint private tokenCount;
    mapping(uint => MarketItem) private ItemID;

    uint public listingPrice = 0.0025 ether;

    event IDMarketItemCreated(
        uint indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold
    );

      constructor(address initialOwner) ERC721("Token", "TKN") Ownable(initialOwner) {}

    function updateListingPrice(uint _ListingPrice) public onlyOwner {
        listingPrice = _ListingPrice;
    }

    function getListingPrice() public view returns (uint) {
        return listingPrice;
    }

    function createToken(
        string memory tokenURI,
        uint price
    ) public payable returns (uint) {
        tokenCount++;
        uint newTokenId = tokenCount;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint token, uint price) private {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        ItemID[token] = MarketItem(
            token,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        emit IDMarketItemCreated(
            token,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function resaleToken(uint tokenId, uint price) public payable {
        require(
            ItemID[tokenId].owner == msg.sender,
            "Only item owner can perform this sale"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        ItemID[tokenId].sold = false;
        ItemID[tokenId].price = price;
        ItemID[tokenId].seller = payable(msg.sender);
        ItemID[tokenId].owner = payable(address(this));
    }

    function createMarketSale(uint tokenId) public payable {
        uint price = ItemID[tokenId].price;
        require(msg.value == price, "Please submit asking price");

        ItemID[tokenId].owner = payable(msg.sender);
        ItemID[tokenId].sold = true;
        ItemID[tokenId].owner = payable(address(0));

        payable(owner()).transfer(listingPrice);
        payable(ItemID[tokenId].seller).transfer(msg.value);

        _transfer(address(this), msg.sender, tokenId);
    }

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint itemCount = tokenCount;
        uint unsoldItemCount = tokenCount;
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint i = 1; i <= itemCount; i++) {
            if (ItemID[i].owner == address(this)) {
                items[currentIndex] = ItemID[i];
                currentIndex++;
            }
        }
        return items;
    }

    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint itemCount = tokenCount;
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 1; i <= itemCount; i++) {
            if (ItemID[i].owner == msg.sender) {
                items[currentIndex] = ItemID[i];
                currentIndex++;
            }
        }
        return items;
    }

    function fetchListedItem() public view returns (MarketItem[] memory) {
        uint itemCount = tokenCount;
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 1; i <= itemCount; i++) {
            if (ItemID[i].seller == msg.sender) {
                items[currentIndex] = ItemID[i];
                currentIndex++;
            }
        }
        return items;
    }
}
