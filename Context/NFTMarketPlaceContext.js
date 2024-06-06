"use client"
import React,{useEffect,useState,useContext,createContext} from 'react'
import web3Modal from "web3modal";
import { ethers } from 'ethers';
import Router from 'next/router';
import { NFTMarketPlaceAddress, NFTMarketPlaceABI } from './Constants';






const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketPlaceAddress,NFTMarketPlaceABI,signerOrProvider);

 





const Connect = async()=>{
    try {
        // if (!window.ethereum) {
        //     console.log("Install Metamask");
        //     return null;
        // }
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const Web3Modal = new web3Modal();
        // const connection = await Web3Modal.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("something went wrong");
    }
}


export const NFTMarketPlaceContext = React.createContext({});

export const NFTMarketPlaceProvider = (({children})=>{
    const titleData = "Discover, Collect and Sell NFTs";
    const [currentAccount,setCurrentAccount] = useState("");
    const checkWallet = async()=>{
        try {
            if(!window.ethereum){
                return console.log("Install Metamask");
            }
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{console.log("No Account Found")};
            console.log(currentAccount);
        } catch (error) {
            console.log("something went wrong");
        }
    }

    const connectWallet = async ()=>{
        if(!window.ethereum){
            return console.log("Install Metamask");
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })
        setCurrentAccount(accounts[0]);
        //window.location.reload();
    }


    // const uploadToIPFS = async (file) => {
    //     if (file) {
    //       try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    
    //         const resFile = await fetch({
    //           method: "post",
    //           url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    //           data: formData,
    //           headers: {
    //             pinata_api_key:"cf50e67eae84cd86b311"
    //             ,
    //             pinata_secret_key:"fbb860ece21cc1e624f69ed03139e71d000e06a4a20c16382700e8df5f1dd9a4"
    //             ,
    //             "Content-Type": `multipart/form-data`,
    //             Authorization: `Bearer ${pinata_JWT}`,
    //           },
    //         });
    
    //         const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    //         console.log(imgHash);
    //         return imgHash;
    //       } catch (error) {
    //         console.log("Error while uploading to IPFS", error);
    //       }
    //     }
    //   };
     

    //   const createNFT = async (name, price, image, description, router) => {
    //     if (!name || !description || !price || !image) {
    //       console.log("Data Is Missing");
    //       return;
    //     }
    //     const data = JSON.stringify({ name, description, image });
    
    //     try {
    //         const resFile = await fetch({
    //             method: "post",
    //             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //             data: formData,
    //             headers: {
    //                 pinata_api_key: '4ebf273ead110ff60320',
    //                 pinata_secret_api_key: 'dc9f1762f352a7ae23db1857c9176e8d636756db396de5238b5613ce66ea1c6b',
    //               "Content-Type": `multipart/form-data`,
                  
    //             },
    //           });
          
    //       // Upload image file to Pinata IPFS
    //       const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    //       console.log(imgHash);
    
    //       await createSale(imgHash, price);
    //       router.push("/searchPage");
    //     } catch (error) {
    //       console.log("Error while creating NFT:", error);
    //     }
    //   };

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
          console.log(url, formInputPrice, isReselling, id);
          const price = ethers.parseUnits(formInputPrice, "ether");
          const contract = await Connect();
    
          const listingPrice = await contract.getListingPrice();
    
          const transaction = !isReselling
            ? await contract.createToken(url, price, {
                value: listingPrice.toString(),
              })
            : await contract.resaleToken(url, price, {
                value: listingPrice.toString(),
              });
    
          await transaction.wait();
          console.log(transaction);
        } catch (error) {
          console.log("Error while creating sale");
        }
      };

    // const fetchNFTs = async()=>{
    //     try {
    //         const provider = new ethers.JsonRpcProvider();
    //         const contract  = fetchContract(provider);
    //         const data = await contract.fetchMarketItem();
    //         const items = await Promise.all(
    //             data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
    //                 const tokenURI = await contract.tokenURI(tokenId);
    //                 const {
    //                     data:{image,name,description},
    //                 } = await axios.get(tokenURI);
    //                 const price = ethers.formatUnits(
    //                     unformattedPrice.toString(),
    //                     "ether",
    //                 );
    //                 return {
    //                     price,tokenId:tokenId.toNumber(),seller,owner,image,name,description,tokenURI
    //                 }
    //             })
               
    //         )
    //         return items;
    //     } catch (error) {
            
    //     }
    // }
    // useEffect(()=>{
    //     fetchNFTs();
    // },[]);
     
    const myNFTs = async(type)=>{
       try {
        const contract = await Connect();
        const data = type =="fetchItemListed" ? await contract.fetchItemsListed(): await contract.fetchMyNFT();

        const items = await Promise.all(
            data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data:{image,name,description},
                } = await axios.get(tokenURI);
                const price = ethers.formatUnits(
                    unformattedPrice.toString(),
                    "ether",
                );
                return {
                    price,tokenId:tokenId.toNumber(),seller,owner,image,name,description,tokenURI
                }
            })
        )
        return items;
       } catch (error) {
        alert("error while fetching nft");
       }
    }

    const buyNFT = async()=>{
        try {
            const contract = await Connect();
            const price = ethers.parseUnits(nft.price.toString(),"ether");
            const transaction = await contract.createMarketSale(nft.tokenId,{
                value:price,
            })
            await transaction.wait();
        } catch (error) {
            
        }
    }
    return(
    <NFTMarketPlaceContext.Provider value = {{checkWallet, connectWallet, myNFTs, buyNFT, currentAccount, titleData,createSale}}>
        {children}
    </NFTMarketPlaceContext.Provider>
    );
})

