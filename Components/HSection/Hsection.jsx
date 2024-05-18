"use client"
import React,{useState,useEffect,useContext} from 'react'
import Image from 'next/image';
import Style from './Hsection.module.css';
import {Button} from '../Component';
import Images from '../../img';
import { NFTMarketPlaceContext } from '@/Context/NFTMarketPlaceContext';

const Hsection = () => {
  const {titleData} = useContext(NFTMarketPlaceContext);
  return (
    <div className={Style.HS}>
        <div className={Style.HS_box}>
            <div className={Style.HS_box_left}>
                <h1>{titleData}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea mollitia dolore maxime assumenda quisquam inventore ipsum numquam tenetur omnis voluptas!</p>
                <Button btnName="Getting Started" handleClick={()=>{}}/>
            </div>
            <div className={Style.HS_box_right}>
                <Image src={Images.hero} alt='HSection' width={600} height={600}/>
            </div>
        </div>
    </div>
  )
}

export default Hsection