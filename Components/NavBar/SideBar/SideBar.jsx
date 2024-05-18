"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

import Style from './SideBar.module.css';
import Images from "../../../img";
import { Button } from "@/Components/Component";

const SideBar = ({setOpenSideMenu,currentAccount,connectWallet}) => {
  const [openDiscover,setOpenDiscover] = useState(false);
  const [openHelp,setopenHelp] = useState(false);

  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "search",
    },
    {
      name: "Author Profile",
      link: "author-profile",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account-setting",
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];
  const help =[{
    name:"About",
    link:"about"
  },
  {
    name:"Contact Us",
    link:"contact-us"
  },
  {
    name:"Sign Up",
    link:"sign-up"
  },
  {
    name:"Login",
    link:"login"
  },
  {
    name:"Subscription",
    link:"subscription"
  }
];
const openDiscoverMenu = ()=>{
  if(!openDiscover){
    setOpenDiscover(true);

  }
  else{
    setOpenDiscover(false);
  }
};
const openHelpMenu = ()=>{
  if(!openHelp){
    setopenHelp(true);
  }
  else{
    setopenHelp(false);
  }
}
const closeSideBar = ()=>{
  setOpenSideMenu(false);
}

  return( 
  <div className={Style.sideBar}>
    <GrClose className={Style.sideBar_closeBtn} onClick={()=>closeSideBar()}/>
    <div className={Style.sideBar_box}>
      <Image src={Images.logo} alt="logo" width={150} height={150}/>
      <p>Articles on NFT</p>

      <div className={Style.sideBar_social}>
        <a href="#">
          <TiSocialFacebook/>
        </a>
        <a href="#">
          <TiSocialTwitter/>
        </a>
        <a href="#">
          <TiSocialInstagram/>
        </a>
        <a href="#">
          <TiSocialYoutube/>
        </a>
        <a href="#">
          <TiSocialLinkedin/>
        </a>
      </div>
    </div>
    <div className={Style.sideBar_menu}>
      <div>
        <div className={Style.sideBar_menu_box} onClick={()=>openDiscoverMenu()}>
          <p>Discover</p>
          <TiArrowSortedDown/>
        </div>
        {openDiscover && (
          <div className={Style.sideBar_discover}>
            {discover.map((el,i)=>(
              <p key={i+1}>
                <Link href={{pathname:`${el.link}`}}>{el.name}</Link>
              </p>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className={Style.sideBar_menu_box} onClick={()=>openHelpMenu()}>
          <p>Help</p>
          <TiArrowSortedDown/>
        </div>
        {
          openHelp && (
            <div className={Style.sideBar_discover}>
              {help.map((el,i)=>(
                <p key={i+1}>
                  <Link href={{pathname:`${el.link}`}}>{el.name}</Link>
                </p>
              ))}
            </div>
          )
        }
      </div>
    </div>
    <div className={Style.sideBar_button}>
      {currentAccount ==""?(<Button btnName="Connect" handleClick={()=>connectWallet()}/>):
      (<Link href="/uploadNFT">
        <Button btnName="Create"/>
      </Link>)}
      <Button btnName = "Create" handleClick={()=>{}}/>
      <Button btnName = "Connect Wallet" handleClick={()=>{}}/>
    </div>
  </div>
  )
};

export default SideBar;
