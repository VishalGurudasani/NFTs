"use client"
import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Style from './NFTCard2.module.css';
import { LikeProfile } from "@/Components/Component";
import Link from "next/link";
const NFTCard2 = ({ NFTData }) => {
    const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };
  const filteredNFTData = NFTData.filter((el) => el.image !== null);
  return (
    
    <div className={Style.NFTCardTwo}>
      {filteredNFTData.map((el, i) => (
       <Link key ={el.tokenId} href={{pathname:"/NFT-details",query:el}} >
        <div className={Style.NFTCardTwo_box} key={i + 1}>
          <div className={Style.NFTCardTwo_box_like}>
            <div className={Style.NFTCardTwo_box_like_box}>
              <div className={Style.NFTCardTwo_box_like_box_box}>
                <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_img}>
            ({el.image &&
            <Image
              src={el.image}
              alt="NFT"
              width={200}
              height={200}
              objectFit="cover"
              className={Style.NFTCardTwo_box_img_img}
            />
          })
          </div>

          <div className={Style.NFTCardTwo_box_info}>
            <div className={Style.NFTCardTwo_box_info_left}>
              <LikeProfile />
              <p>{el.name}</p>
            </div>
            <small>4{i + 2}</small>
          </div>

          <div className={Style.NFTCardTwo_box_price}>
            <div className={Style.NFTCardTwo_box_price_box}>
              <small>Price</small>
              <p>{el.price} ETH</p>
            </div>
            <p className={Style.NFTCardTwo_box_price_stock}>
              <MdTimer /> <span>{i + 1} hours left</span>
            </p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default NFTCard2