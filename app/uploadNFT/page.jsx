'use client'
import React,{useEffect,useContext,useState} from 'react'
import {UploadNFT} from '../../UploadNFT/Componentindex';
import Style from './uploadNFT.module.css';

import { NFTMarketPlaceContext } from '@/Context/NFTMarketPlaceContext';

const page = () => {
  const {uploadToIPFS,createNFT} = useContext(NFTMarketPlaceContext);
  return (
    <div className={Style.uploadNFT}>
    <div className={Style.uploadNFT_box}>
      <div className={Style.uploadNFT_box_heading}>
        <h1>Create New NFT</h1>
        <p>
          You can set preferred display name, create your profile URL and
          manage other personal settings.
        </p>
      </div>

      <div className={Style.uploadNFT_box_title}>
        <h2>Image, Video, Audio, or 3D Model</h2>
        <p>
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </p>
      </div>

      <div className={Style.uploadNFT_box_form}>
         <UploadNFT uploadToIPFS={uploadToIPFS} createNFT = {createNFT}/> 
      </div>
    </div>
  </div>
  )
}

export default page;