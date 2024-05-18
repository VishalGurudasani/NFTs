import React from 'react'
import images from '../../img';
import {
    Banner,
    CollectionProfile,
    NFTCardTwo,
  } from "../../CollectionPage/Collectionindex";
  import { Slider2, Brand } from "../../Components/Component";
  import Filter from "../../Components/Filter/Filter";
  import Style from '../Collection.module.css'
const page = () => {
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
      ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider2 />
      <Brand />
    </div>
  )
}

export default page;