import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { filterednftsData } from "../constants";
import { CustomLoader } from "../components";
import { ContractContext } from "../contexts/ContractContext";
import { Banner } from "../components";
import { Pagination, CardNft } from "../components";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { MetaMaskContext } from "../contexts/MetaMaskContext";
import MyNfts from "./MyNfts";

const ListedNfts = () => {
  const { getMyListedNFTS } = useContext(ContractContext);
  const { account,isConnected } = useContext(MetaMaskContext);
  const [error,updateError] = useState<string>("")
  const { animateCreateButton } = useContext(ThemeContext);
  const [loading, updateLoading] = useState();
  const [myNFTs, setMyNFTs] = useState<filterednftsData[] | null>(null);
  useEffect(() => {
    async function fetchMyNfts() {
      try {
        const data = await getMyListedNFTS();
        setMyNFTs(data);
        console.log("we getting my nfts...",data)
      } catch (e) {
        console.log("some errror while fetching the mY nfts");
      }
    }

    if(!account){
      updateError("No wallet found!")
      return
    }
    fetchMyNfts();
  }, [account]);

  const handleShowButtonToUser = () => {
    animateCreateButton(true);
    setTimeout(() => {
      animateCreateButton(false);
    }, 3000);
  };
  return (
    <div className="flex flex-wrap justify-center dark:bg-zinc-900 md:p-10 p-4">
      <div className="md:w-10/12 w-full ">
        <Banner title="Listed NFTs" />
      </div>
      <div >
        {loading ? (
          <div className="mt-32 mb-32 w-full flex flex-col justify-center items-center">
            <CustomLoader />
            <span className="font-poppins mt-5">Loading...</span>
          </div>
        ) : null}
        {!loading && !myNFTs?.length && (
          <div className="mt-32 mb-32 w-full flex flex-col justify-center items-center">
            {" "}
            <h3 className="font-poppins md:text-3xl text-2xl text-center font-bold dark:text-white
            ">
              { "You've Not Created Any NFTs Yet."}
            </h3>
            <Link
              to={"/create-nft"}
              className="font-poppins mt-5 underline cursor-pointer dark:text-white"
            >
          {"create one?"}
            </Link>{" "}
          </div>
        )}
      </div>
      {myNFTs?.length?
      <div className="flex mt-5 w-3/4  flex-wrap mb-10 justify-center">
        {myNFTs?.map((item, i) => (
          <div key={i} className="max-h-fit max-w-fit w-3/4">
            <CardNft
              tokenId={item.tokenId}
              name={item.tokenData.name}
              image={item.tokenData.imgURI}
              account={account}
              ethAmount={+item.price}
            />
          </div>
        ))}
      </div>
:null}
      {/*       <Pagination />
       */}{" "}
    </div>
  );
};

export default ListedNfts;
