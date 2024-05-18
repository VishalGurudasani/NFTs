"use client"
import React, { useCallback, useState, useEffect } from "react";
import Style from "./Slider.module.css";
import Image from "next/image";
import { AiFillFire, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import Images from "../../img";
import Button from "../Button/Button";

const Slider = () => {
  const [idNumber, setIdNumber] = useState(0);
  const sliderData = [
    {
      title: "CryptoNFT",
      id: 1,
      name: "Vineet Pawar",
      collection: "TKNs",
      price:"20 ETH",
      like: 1000,
      image: Images.user1,
      nftImage: Images.nft_image_1,
      time: {
        days: 10,
        hours: 10,
        minutes: 10,
        seconds: 10,
      },
    },
    {
        title: "CryptoNFT",
        id: 2,
        name: "Vineet Pawar",
        collection: "TKNs",
        price:"20 ETH",
      like: 1000,
        image: Images.user2,
        nftImage: Images.nft_image_2,
        time: {
          days: 10,
          hours: 10,
          minutes: 10,
          seconds: 10,
        },
      },
      {
        title: "CryptoNFT",
        id: 3,
        name: "Vineet Pawar",
        collection: "TKNs",
        image: Images.user3,
        nftImage: Images.nft_image_3,
        price:"20 ETH",
      like: 1000,
        time: {
          days: 10,
          hours: 10,
          minutes: 10,
          seconds: 10,
        },
      },
      {
        title: "CryptoNFT",
        id: 4,
        name: "Vineet Pawar",
        collection: "TKNs",
        image: Images.user4,
        nftImage: Images.nft_image_2,
        price:"20 ETH",
      like: 1000,
        time: {
          days: 10,
          hours: 10,
          minutes: 10,
          seconds: 10,
        },
      },
  ];
  const inc = useCallback(()=>{
    if(idNumber+1<sliderData.length){
        setIdNumber(idNumber+1);
   }
  }, [idNumber,sliderData.length])


  const dec = useCallback(()=>{
    if(idNumber>0){
        setIdNumber(idNumber-1);
   }
  }, [idNumber])
  return (
    <div className={Style.slider}>
        <div className={Style.slider_box}>
            <div className={Style.slider_box_left}>
                <h2>{sliderData[idNumber].title}</h2>
                <div className={Style.slider_box_left_creator}>
                    <div className={Style.slider_box_left_creator_profile}>
                        <Image src={sliderData[idNumber].image} alt="Profile Image" width={50} height={50} className={Style.slider_box_left_creator_profile_img}/>
                        <div className={Style.slider_box_left_creator_profile_img}>
                            <p>Creator</p>
                            <h4>{sliderData[idNumber].name}{" "} <span><MdVerified/></span></h4>
                        </div>
                    </div>
                    <div className={Style.slider_box_left_creator_collection}>
                        <AiFillFire className={Style.slider_box_left_creator_collection_icon}/>
                        <div className={Style.slider_box_left_creator_collection_info}>
                            <p>collection</p>
                            <h4>{sliderData[idNumber].collection}</h4>
                        </div>
                    </div>
                </div>
                <div className={Style.slider_box_left_bidding}>
                    <div className={Style.slider_box_left_bidding_box}>
                        <small>Current Bid</small>
                        <h4>{sliderData[idNumber].price} <span>$200</span></h4>
                    </div>
                    <p className={Style.slider_box_left_bidding_auction}>
                        <MdTimer className={Style.slider_box_left_bidding_icon}/>
                        <span>Auction Ending In</span>
                    </p>
                    <div className={Style.slider_box_left_bidding_timer}>
                        <div className={Style.slider_box_left_bidding_timer_item}>
                            <p>{sliderData[idNumber].time.days}</p>
                            <span>Days</span>
                        </div>

                        <div className={Style.slider_box_left_bidding_timer_item}>
                            <p>{sliderData[idNumber].time.hours}</p>
                            <span>Hours</span>
                        </div>

                        <div className={Style.slider_box_left_bidding_timer_item}>
                            <p>{sliderData[idNumber].time.minutes}</p>
                            <span>Minutes</span>
                        </div>

                        <div className={Style.slider_box_left_bidding_timer_item}>
                            <p>{sliderData[idNumber].time.seconds}</p>
                            <span>sec</span>
                        </div>

                    </div>

                    <div className={Style.slider_box_left_button}>
                        <Button btnName="Place" handleClick={()=>{}}/>
                        <Button btnName="View" handleClick={()=>{}}/>
                    </div>
                </div>

                <div className={Style.slider_box_left_sliderbtn}>
                    <TbArrowBigRightLines className={Style.slider_box_left_sliderbtn_icon} onClick={()=>inc()}/>
                </div>
                <div className={Style.slider_box_left_sliderbtn}>
                    <TbArrowBigLeftLines className={Style.slider_box_left_sliderbtn_icon} onClick={()=>dec()}/>
                </div>
            </div>
            <div className={Style.slider_box_right}>
                <div className={Style.slider_box_right_box}>
                    <Image src={sliderData[idNumber].nftImage} alt="NFT Image"/>
                    <div className={Style.slider_box_right_box_like}>
                        <AiFillHeart/>
                        <span>{sliderData[idNumber].like}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Slider;
