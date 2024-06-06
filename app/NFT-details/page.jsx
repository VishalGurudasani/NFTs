'use client';
import React, { useEffect, useState } from 'react';
import NFTDetailsPage from '../../NFTDetailsPage/NFTDetailsPage';
import { Button, Category, Brand } from '@/Components/Component';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

const Page = () => {
  const router = usePathname();
  const params = useSearchParams();
  
  const [nft, setNFT] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    description:"",
  });

  useEffect(() => {
    const newNft = {
      image: params.get('image') || "",
      tokenId: params.get('tokenId') || "",
      name: params.get('name') || "",
      owner: params.get('owner') || "",
      price: params.get('price') || "",
      seller: params.get('seller') || "",
      description:params.get('description') ||"",
    };
    setNFT(newNft);
  }, [params]);

  console.log(nft);

  return (
    <div>
      <Suspense>
      {/* <h1>Pathname:{router}</h1>
      <h1>{params}</h1>
      <h1>Name: {nft.name}</h1>
      <h2>Token ID: {nft.tokenId}</h2>
      <p>Owner: {nft.owner}</p>
      <p>Price: {nft.price}</p>
      <p>Seller: {nft.seller}</p>
      <img src={nft.image} alt="NFT" /> */}
      <NFTDetailsPage nft={nft}/>
      <Category />
      <Brand />
      </Suspense>
    </div>
  );
};

export default Page;
