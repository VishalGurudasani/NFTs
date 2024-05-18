"use client";
import React, { useContext, useState, useEffect } from "react";
import images from "../../img";
import { Banner, NFTCardTwo } from "@/CollectionPage/Collectionindex";
import { Slider2, Brand, Loader } from "@/Components/Component";
import { SearchBar } from "@/SearchPage/Componentindex";
import Style from "./SearchPage.module.css";
import { Filter } from "@/Components/Component";
import nftMarketplace from "../../ignition/deployments/chain-2442/artifacts/NFTMarketPlaceNFTMarketPlace.json";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/navigation";

const NFTMarketPlaceAddress = "0xdc5c08b2102361B7e4Bb97871ea9a57b4368E4F1";
const NFTMarketPlaceABI = nftMarketplace.abi;

const Page = () => {
  const [nfts, setNFTs] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          NFTMarketPlaceAddress,
          NFTMarketPlaceABI,
          provider
        );
        const data = await contract.fetchMarketItem();
        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const response = await axios.get(tokenURI);
              const { image, name, description } = response.data;
              const price = ethers.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );
              const tokenIdNumber = Number(tokenId);
              return {
                price,
                tokenId: tokenIdNumber,
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        console.log("Fetched NFTs:", items);
        setNFTs(items);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []); 

  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];

  const onHandleSearch = (value) => {
    const filterNFT = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (nfts.length === 0) {
      setNFTs(nfts);
    } else {
      setNFTs(filterNFT);
    }
  };

  const onClearSearch = ()=>{
    if(nfts.length){
      setNFTs(nfts);
    }
  }


  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar onHandleSearch={onHandleSearch}
      onClearSearch={onClearSearch}/>
      <Filter />
      {nfts.length==0 ? <Loader/> : <NFTCardTwo NFTData={nfts}  />} 
      
      <Slider2 />
      <Brand />
      
    </div>
  );
};

export default Page;
