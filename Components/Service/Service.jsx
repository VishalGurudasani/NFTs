import React from 'react'
import Style from './Service.module.css';
import Images from '../../img';
import Image from 'next/image';

const Service = () => {
  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_item}>
                <Image src={Images.service1} alt="filter" width={100} height = {100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Filter and Discover</h3>
                <p>Connect Wallet,buy NFTs ,sell it</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={Images.service2} alt="filter" width={100} height = {100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Connect Wallet</h3>
                <p>Connect Wallet,buy NFTs ,sell it</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={Images.service3} alt="filter" width={100} height = {100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Trade NFT</h3>
                <p>Connect Wallet,buy NFTs ,sell it</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={Images.service4} alt="filter" width={100} height = {100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Buy NFTs</h3>
                <p>Connect Wallet,buy NFTs ,sell it</p>
            </div>
        </div>
    </div>
  )
}

export default Service