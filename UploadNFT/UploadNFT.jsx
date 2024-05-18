"use client";
import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import Style from "./UploadNFT.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "@/Components/Component";
import DropZone from "../UploadNFT/DropZone/DropZone";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import nftMarketplace from "../ignition/deployments/chain-2442/artifacts/NFTMarketPlaceNFTMarketPlace.json";
import axios from "axios";
const NFTMarketPlaceAddress = "0xdc5c08b2102361B7e4Bb97871ea9a57b4368E4F1";
const NFTMarketPlaceABI = nftMarketplace.abi;

const UploadNFT = () => {
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const router = useRouter();

  const categoryArry = [
    { image: images.nft_image_1, category: "Sports" },
    { image: images.nft_image_2, category: "Arts" },
    { image: images.nft_image_3, category: "Music" },
    { image: images.nft_image_1, category: "Digital" },
    { image: images.nft_image_2, category: "Time" },
    { image: images.nft_image_3, category: "Photography" },
  ];

  const createSale = async (url, Price, isReselling, id) => {
    try {
      const price = ethers.parseUnits(Price, "ether");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        NFTMarketPlaceAddress,
        NFTMarketPlaceABI,
        signer
      );
      const s = new ethers.Contract(
        NFTMarketPlaceAddress,
        NFTMarketPlaceABI,
        provider
      );

      // Get the listing price from the contract
      const listingPrice = await s.getListingPrice();

      // Send transaction to create or resale token
      const transaction = !isReselling
        ? await contract.createToken(url, price, { value: listingPrice })
        : await contract.resaleToken(url, price, { value: listingPrice });

      // Wait for the transaction to be mined
      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("Error while creating sale", error);
    }
  };
  

  const createNFT = async (name, price, image, description) => {
    try {
      const data = JSON.stringify({ name, description, image });
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: "4ebf273ead110ff60320",
            pinata_secret_api_key:
              "dc9f1762f352a7ae23db1857c9176e8d636756db396de5238b5613ce66ea1c6b",
          },
        }
      );
      const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(imgHash);

      // Assuming createSale function is imported or available in this scope
      await createSale(imgHash, price);
      router.push("/SearchPage");
    } catch (error) {
      console.log("Error while creating NFT:", error);
    }
  };
  console.log(setImage);

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage={setImage}
      />
      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Name</label>
          <input
            type="text"
            placeholder="xyz"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting collection or create a new one
          </p>
          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active === i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - {el.category} </p>
              </div>
            ))}
          </div>
        </div>
        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="165MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Propertie">Propertie</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Propertie"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={async () => createNFT(name, price, image, description)}
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
