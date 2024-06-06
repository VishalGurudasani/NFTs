'use client';
import React, { useContext, useEffect } from 'react'
import { Follower, NFTCard, NavBar } from "../Components/Component";
import { Footer } from '../Components/Component';
import Style from './page.module.css'
import { Hsection,Service,Slider,Subscribe, Title ,Category ,Filter, Collection, Audio, Slider2, Brand, Video} from '../Components/Component';

import {NFTMarketPlaceContext} from '@/Context/NFTMarketPlaceContext';
const Home = () => {
  const { checkWallet } = useContext(NFTMarketPlaceContext);
 useEffect(()=>{
  checkWallet();
 },[]);
  
  return (
    <div>
      
      <NavBar suppressHydrationWarning={true}/>
      <div className={Style.homepage}>
        <Hsection/>
        <Service/>
        <Slider/>
        <Title heading="Browse By Category" paragraph="Explore NFTs in the most featured categories"/>
        <Category/>
        <Filter/>
        <NFTCard/>
        <Audio/>
        <Title heading="Browse By Category" paragraph="Follower Section"/>
        <Follower/>
        <Slider2/>
        <Collection/>
        <Subscribe/>
        <Brand/>
        <Video/>
      </div>
      <Footer/>
      
    </div>
  )
}

export default Home;
