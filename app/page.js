import React from 'react'
import Home from './Home'
import { NFTMarketPlaceProvider } from '../Context/NFTMarketPlaceContext';

const page = () => {
  return (
    <div>
    <NFTMarketPlaceProvider>
       <Home/>
       </NFTMarketPlaceProvider>
    </div>
  )
}

export default page;
