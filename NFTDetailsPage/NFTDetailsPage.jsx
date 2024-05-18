import React from 'react'
import { NFTDescription, NFTDetailsimg, NFTTabs } from "./NFTDetailsindex";
import Style from "./NFTDetailsPage.module.css";
const NFTDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsimg nft = {nft}/>
        <NFTDescription nft = {nft}/>
      </div>
    </div>
  )
}

export default NFTDetailsPage