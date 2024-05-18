'use client'
import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Style from './DropZone.module.css';
import images from '../../img';
import { NFTCard } from "@/Components/Component";
import { NFTMarketPlaceContext } from "@/Context/NFTMarketPlaceContext";
import axios from "axios";

const DropZone = ({
    title,
    heading,
    subHeading,
    name,
    website,
    description,
    royalties,
    fileSize,
    category,
    properties,
    uploadToIPFS,
    setImage,
  }) => {
    
    // console.log('uploadtoIPFS prop in DropZone:', uploadToIPFS);
    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          // Create a FormData object and append the file to it
          const formData = new FormData();
          formData.append('file', file);
    
          // Make a POST request to Pinata's API to upload the file
          const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                pinata_api_key: '4ebf273ead110ff60320',
                pinata_secret_api_key: 'dc9f1762f352a7ae23db1857c9176e8d636756db396de5238b5613ce66ea1c6b',
              },
            }
          );
    
          // Get the IPFS hash from the response
          const ipfsHash = response.data.IpfsHash;
    
          // Construct the file URL using Pinata's gateway
          const fileUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    
          // Set the file URL for preview
          setFileUrl(fileUrl);
          setImage(fileUrl);
          // You might want to do something with the IPFS hash or file URL here
          console.log('File uploaded to Pinata IPFS:', fileUrl);
        } catch (error) {
          console.error('Error uploading file to Pinata:', error);
        }
      }
    }, [setImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    'image/*': ['.jpeg', '.jpg', '.png'],
    maxSize: 5000000,
  });
  return (
    <div className={Style.DropZone}>
    <div className={Style.DropZone_box} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={Style.DropZone_box_input}>
        <p>{title}</p>
        <div className={Style.DropZone_box_input_img}>
          <Image
            src={setImage}
            alt="upload"
            width={100}
            height={100}
            objectFit="contain"
            className={Style.DropZone_box_input_img_img}
          />
        </div>
        <p>{heading}</p>
        <p>{subHeading}</p>
      </div>
    </div>

    {fileUrl && (
      <aside className={Style.DropZone_box_aside}>
        <div className={Style.DropZone_box_aside_box}>
          <Image
            src={fileUrl}
            alt="nft image"
            width={200}
            height={200}
          />

          <div className={Style.DropZone_box_aside_box_preview}>
            <div className={Style.DropZone_box_aside_box_preview_one}>
              <p>
                <samp>NFT Name:</samp>
                {name || ""}
              </p>
              <p>
                <samp>Website:</samp>
                {website || ""}
              </p>
            </div>

            <div className={Style.DropZone_box_aside_box_preview_two}>
              <p>
                <span>Description</span>
                {description || ""}
              </p>
            </div>

            <div className={Style.DropZone_box_aside_box_preview_three}>
              <p>
                <span>Royalties</span>
                {royalties || ""}
              </p>
              <p>
                <span>FileSize</span>
                {fileSize || ""}
              </p>
              <p>
                <span>Properties</span>
                {properties || ""}
              </p>
              <p>
                <span>Category</span>
                {category || ""}
              </p>
            </div>
          </div>
        </div>
      </aside>
    )}
  </div>
  )
}

export default DropZone;