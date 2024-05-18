"use client";
import React, { useState, useEffect, useContext } from "react";
import Style from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { Discover, Notification, SideBar, Profile, Help } from "./index";
import { Button } from "../Component";
import Images from "../../img";
import { NFTMarketPlaceContext } from "@/Context/NFTMarketPlaceContext";


const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [help, setHelp] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText === "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText === "Help") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(true);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  const { currentAccount, connectWallet } = useContext(NFTMarketPlaceContext);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbarContainer}>
        <div className={Style.NC_left}>
          <div className={Style.logo}>
            <Image
              src={Images.logo}
              alt="NFTMarketPlace"
              width={100}
              height={100}
            />
          </div>
          <div className={Style.NC_left_input}>
            <div className={Style.NC_left_input_box}>
              <input type="text" placeholder="Search" />
              <BsSearch onClick={() => {}} className={Style.Search_con} />
            </div>
          </div>
        </div>

        <div className={Style.NC_right}>
          <div className={Style.NC_right_Discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.NC_right_Discover_box}>
                <Discover />
              </div>
            )}
          </div>

          <div className={Style.NC_right_Help}>
            <p onClick={(e) => openMenu(e)}>Help</p>
            {help && (
              <div className={Style.NC_right_Help_box}>
                <Help />
              </div>
            )}
          </div>

          <div className={Style.NC_right_notification}>
            <MdNotifications
              className={Style.notification}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          <div className={Style.NC_right_button}>
            {currentAccount ==""?(<Button btnName="Connect" handleClick={()=>connectWallet()}/>) :  (
            <Link href={{pathname:"/uploadNFT"}}>
            <Button btnName="Create" handleClick={()=> {}} />
            </Link>)}
           
          </div>

          <div className={Style.NC_right_profile_box}>
            <div className={Style.NC_right_profile}>
              <Image
                src={Images.user1}
                alt="profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.NC_right_profile}
              />
              {profile && <Profile />}
            </div>
          </div>

          <div className={Style.NC_right_menu}>
            <CgMenuRight
              className={Style.menuicon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} 
                   currentAccount={currentAccount}
                   connectWallet={connectWallet}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
