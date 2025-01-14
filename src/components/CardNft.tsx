import React from "react";
import { Link, useNavigate } from "react-router-dom";

type CardNftProps = {
  tokenId:number;
  name: string;
  image: string;
  account: string;
  ethAmount: number;
};
const CardNft = ({ name, image, account, ethAmount,tokenId }: CardNftProps) => {
  

  return (
    <Link to={`/details-nfts/${tokenId+'_'+account.toLowerCase()}`}>
    <div className="flex flex-col justify-center h-fit w-fit cursor-pointer hover:scale-105 hover:-translate-y-1.5 transition-all duration-500 ease-in-out flex-1 font-poppins font-semibold dark:text-white text-black py-5 px-4 m-2 rounded-md bg-slate-100 shadow-sm shadow-gray-400 dark:bg-zinc-800 dark:shadow-sm dark:shadow-pink-600  ">
           <div className="relative rounded-md flex justify-center">
                <img src={image} content="image/png" alt="NFT" height={240} width={240} style={{objectFit:'cover'}} />
           </div>
           
           <div className="card-meta flex flex-col justify-center px-1 pt-4">
                <h3 className="text-sm font-semibold mb-3">{name?name:"NFT"}</h3>
                <div className="md:mt-3">
                <p className="text-sm truncate w-56 font-normal ">{account}</p>
                {ethAmount?<p className="">{ethAmount} ETH</p>
:null}
                </div>
           </div>   
    </div>
    </Link>
  );
};

export default CardNft;
