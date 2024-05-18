import React from "react";
import Style from "./Footer.module.css";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import Image from "next/image";
import { RiSendPlaneFill } from "react-icons/ri";
import images from "../../img";
import { Discover, Help } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer" height={100} width={100} />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam ipsam
            at consectetur. Molestiae numquam, libero ex quo rerum quaerat
            tenetur sunt odio. Ducimus doloribus consectetur quod commodi sequi
            quo voluptate, fugiat totam at blanditiis.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help</h3>
          <Help />
        </div>

        <di5v className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="enter email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p> NFT sell,buy,find </p>
          </div>
        </di5v>
      </div>
    </div>
  );
};

export default Footer;
