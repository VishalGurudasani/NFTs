'use client'
import React, { useState,useEffect } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import images from '../../img';
import Style from './NFTDescription.module.css';
import { Button } from "@/Components/Component";
import { NFTTabs } from "../NFTDetailsindex";
import nftMarketplace from '../../ignition/deployments/chain-2442/artifacts/NFTMarketPlaceNFTMarketPlace.json';
import { ethers } from "ethers";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NFTMarketPlaceAddress = "0xdc5c08b2102361B7e4Bb97871ea9a57b4368E4F1";
const NFTMarketPlaceABI = nftMarketplace.abi;

const NFTDescription = ({nft}) => {
 const router = useRouter
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  const [currentAccount,setCurrentAccount] = useState("");
    const checkWallet = async()=>{
        try {
            if(!window.ethereum){
                return console.log("Install Metamask");
            }
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{console.log("No Account Found")};
            console.log(currentAccount);
        } catch (error) {
            console.log("something went wrong");
        }
    }
    useEffect(() => {
      checkWallet();
  }, []);



    const buyNFT = async(nft)=>{
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          NFTMarketPlaceAddress,
          NFTMarketPlaceABI,
          signer,
        );
          
          const price = ethers.parseUnits(nft.price.toString(),"ether");
          const transaction = await contract.createMarketSale(nft.tokenId,{
              value:price,
          })
         
          await transaction.wait();
          router.push("/author");
      } catch (error) {
          console.log(error,"something went wrong");
      }
  }
  return (
   
    <div className={Style.NFTDescription}>
    <div className={Style.NFTDescription_box}>
    
      {/* //Part ONE */}
      <div className={Style.NFTDescription_box_share}>
        <p>Virtual Worlds</p>
        <div className={Style.NFTDescription_box_share_box}>
          <MdCloudUpload
            className={Style.NFTDescription_box_share_box_icon}
            onClick={() => openSocial()}
          />

          {social && (
            <div className={Style.NFTDescription_box_share_box_social}>
              <a href="#">
                <TiSocialFacebook /> Facebooke
              </a>
              <a href="#">
                <TiSocialInstagram /> Instragram
              </a>
              <a href="#">
                <TiSocialLinkedin /> LinkedIn
              </a>
              <a href="#">
                <TiSocialTwitter /> Twitter
              </a>
              <a href="#">
                <TiSocialYoutube /> YouTube
              </a>
            </div>
          )}

          <BsThreeDots
            className={Style.NFTDescription_box_share_box_icon}
            onClick={() => openNFTMenu()}
          />

          {NFTMenu && (
            <div className={Style.NFTDescription_box_share_box_social}>
              <a href="#">
                <BiDollar /> Change price
              </a>
              <a href="#">
                <BiTransferAlt /> Transfer
              </a>
              <a href="#">
                <MdReportProblem /> Report abuse
              </a>
              <a href="#">
                <MdOutlineDeleteSweep /> Delete item
              </a>
            </div>
          )}
        </div>
      </div>
      {/* //Part TWO */}
      <div className={Style.NFTDescription_box_profile}>
        <h1>{nft.name} #{nft.tokenId}</h1>
        <div className={Style.NFTDescription_box_profile_box}>
          <div className={Style.NFTDescription_box_profile_box_left}>
            <Image
              src={images.user1}
              alt="profile"
              width={40}
              height={40}
              className={Style.NFTDescription_box_profile_box_left_img}
            />
            <div className={Style.NFTDescription_box_profile_box_left_info}>
              <small>Creator</small> <br />
              <Link href={{Pathname:"/author",query:`${nft.seller}`}}>
              <span>
                xyz <MdVerified />
              </span>
              </Link>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_box_right}>
            <Image
              src={images.creatorbackground2}
              alt="profile"
              width={40}
              height={40}
              className={Style.NFTDescription_box_profile_box_left_img}
            />

            <div className={Style.NFTDescription_box_profile_box_right_info}>
              <small>Collection</small> <br />
              <span>
                App <MdVerified />
              </span>
            </div>
          </div>
        </div>

        <div className={Style.NFTDescription_box_profile_biding}>
          
          <div className={Style.NFTDescription_box_profile_biding_box_price}>
            <div
              className={
                Style.NFTDescription_box_profile_biding_box_price_bid
              }
            >
              <small>Price</small>
              <p>
                {nft.price} 
              </p>
            </div>

            
          </div>

          <div className={Style.NFTDescription_box_profile_biding_box_button}>
            {currentAccount === nft.seller.toLowerCase() ? (
              <p>You cant buy your own nft</p>
            ):currentAccount === nft.owner.toLowerCase() ? (<Button
              icon=<FaWallet />
              btnName="List Again"
              handleClick={() => {}}
              classStyle={Style.button}
            />):(<Button
            icon=<FaWallet />
            btnName="Buy"
            handleClick={() => buyNFT(nft)}
            classStyle={Style.button}
          />)}
            
            <Button
              icon=<FaPercentage />
              btnName="Make offer"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>

          

          
        </div>
      </div>
    </div>
  </div>
  )
}

export default NFTDescription