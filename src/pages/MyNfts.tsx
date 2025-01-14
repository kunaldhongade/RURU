import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { Banner, CardNft } from "../components";
import SearchBar from "../components/SearchBar";
import { filterednftsData } from "../constants";
import { Link } from "react-router-dom";
import blockies from "ethereum-blockies";
import { useContext } from "react";
import { MetaMaskContext } from "../contexts/MetaMaskContext";
import { ContractContext } from "../contexts/ContractContext";

const MyNfts = () => {
  const { account,accountAvatar } = useContext(MetaMaskContext);
  const { getMyNFTs } = useContext(ContractContext);
  const [myNFTs, setMyNFTs] = useState<filterednftsData[] | null>(null);
  const [searchData, searchDataResult] = useState<filterednftsData[] | null>(
    null
  );

  useEffect(() => {

    (async () => {
      console.log("getting My nfts......u");
      const data = await getMyNFTs();
      console.log("data we got ", data);
      setMyNFTs(data);
    })();
  }, [account]);

  return (
    <div className="flex flex-col items-center dark:bg-zinc-900">
        <Banner title="" />
      <div className="relative w-32 h-32 block bg-white  rounded-full overflow-hidden -mt-20 z-10">
        <img
          src={accountAvatar}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <Chip label={account} className="mt-5 dark:bg-gray-300"></Chip>
      <div className="mt-10 md:w-2/4 w-9/12  ">
        <SearchBar
          nftsData={myNFTs}
          searchDataResult={searchDataResult}
          styles="w-full flex  justify-center"
        />
      </div>
      <div className="mt-5 w-3/4 flex flex-wrap mb-10 justify-center">
        {!myNFTs?.length ? (
          <div className="flex flex-col justify-center items-center mb-10 ">
            <h1 className="font-poppins font-bold md:text-3xl text-2xl text-center dark:text-white text-black">
              You Don't Own Any NFTs
            </h1>
            <Link
              className="underline font-poppins mt-3 dark:text-white text-black"
              to={"/#market-place-nft-area"}
            >
              Buy Now?
            </Link>
          </div>
        ) : (searchData?.length && searchData.map((item) => (
          <CardNft
            name={item.tokenData.name}
            image={item.tokenData.imgURI}
            account={account}
            ethAmount={0}
            tokenId={item.tokenId}
            key={item.tokenData.imgURI}
          ></CardNft>
        )))||
      (myNFTs &&
  
          myNFTs.map((item) => (
            <CardNft
              name={item.tokenData.name}
              image={item.tokenData.imgURI}
              account={account}
              ethAmount={0}
              tokenId={item.tokenId}
              key={item.tokenData.imgURI}
            ></CardNft>
          ))
        )}
      </div>
    </div>
  );
};

export default MyNfts;
