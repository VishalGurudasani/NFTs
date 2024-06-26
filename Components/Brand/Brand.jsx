"use client"
import React from 'react'
import Image from "next/image";
import images from '../../img';
import {Button} from '../Component';
import Style from './Brand.module.css';

const Brand = () => {
  return (
    <div className={Style.Brand}>
    <div className={Style.Brand_box}>
      <div className={Style.Brand_box_left}>
        <Image src={images.logo} alt="brand logo" width={100} height={100} />
        <h1>Earn free crypto with NFTCreate</h1>
        <p>A creative agency that lead and inspire.</p>

        <div className={Style.Brand_box_left_btn}>
          <Button btnName="Create"  handleClick={() => {}} />
          <Button btnName="Discover"  handleClick={() => {}} />
        </div>
      </div>
      <div className={Style.Brand_box_right}>
        <Image src={images.xyz} alt="brand logo" width={400} height={300} />
      </div>
    </div>
  </div>
  )
}

export default Brand