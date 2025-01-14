import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, Share } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import { Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ArrowBackIosTwoTone } from "@mui/icons-material";
import { ResetTv } from "@mui/icons-material";

import { filterednftsData } from "../constants";
import { images, etherim } from "../assets";
import { ContractContext } from "../contexts/ContractContext";
import blockies from "ethereum-blockies";
import { CardNft, CustomLoader } from "../components";
import { MetaMaskContext } from "../contexts/MetaMaskContext";
import CustomSnackbar, {
  CustomSnackbarProps,
} from "../components/CustomSnackBar";

export type snackBarProp = {
  message: string;
  open: boolean;
  style?: string;
};

const DetailsNfts = () => {
  const { getOwnerNFTs, fetchToken, buyNFT, removeNftFromMarket, resellNFT } =
    useContext(ContractContext);
  const { id } = useParams();
  const { account } = useContext(MetaMaskContext);
  const [accountAvatar, updateAccountAvatar] = useState("");
  const [moreOwnerNFTs, updateMoreOwnerNFTs] = useState<filterednftsData[]>([]);
  const [currentNFT, updateCurrentNFT] = useState<filterednftsData>();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [manualRender, setManualRender] = useState<boolean>(false);
  const [newPrice, updateNewPrice] = useState(0);
  const [loading, updateLoading] = useState(false);
  const [snackBar, updateSnackBar] = useState<CustomSnackbarProps>({
    message: "",
    open: false,
    onClose: () => {},
    type: "success",
  });

  console.log("account", account, "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097");

  useEffect(() => { 
    if (id) {
      const [tokenId, ownerId] = id.split("_");
      updateAccountAvatar(
        blockies.create({ seed: ownerId, size: 16 }).toDataURL()
      );
      (async () => {
        updateLoading(true);
        console.log("token id and owner id",account,ownerId)

        const data = await getOwnerNFTs(ownerId,account.toLowerCase()==ownerId.toLowerCase()?false:true);
        updateCurrentNFT(data.find((item) => item.tokenId == +tokenId));
        console.log("getting the data as ", data);
        updateMoreOwnerNFTs(data);
        updateLoading(false);
      })();
    }
  }, [id, manualRender]);

  const handleConfirmPurchase = async () => {
    setIsModalOpen(false);
    if(!account){
      updateSnackBar({
        message: "Crypto Wallet Not Found!",
        open: true,
        onClose: () => {},
        type: "error",
      });
      return
    }
    if (currentNFT) {
      updateLoading(true);
      const res = await buyNFT(
        currentNFT?.tokenId,
        (+currentNFT.price + 0.0025).toString()
      );
      console.log("result", res);
      if (res) {
        setManualRender(!manualRender);
        updateSnackBar({
          message: "Transaction Successfull!",
          open: true,
          onClose: () => {},
          type: "success",
        });
      } else
        updateSnackBar({
          message: "Something Went Wrong!",
          open: true,
          onClose: () => {},
          type: "error",
        });
      updateLoading(false);
    }

    // get the details ..
  };

  const handleClose = () => {
    updateSnackBar({
      message: "!",
      open: false,
      onClose: () => {},
      type: "success",
    });
  };

  const handleResellNft = async () => {
    if (currentNFT && !loading) {
      updateLoading(true);
      const res = await resellNFT(currentNFT?.tokenId, newPrice);
      if (res) {
        console.log("successfully re-listed on the market with new value", res);
        setManualRender(!manualRender);
        updateSnackBar({
          message: "Successfully Listed On The MarketPlace!",
          open: true,
          onClose: () => {},
          type: "success",
        });
      } else {
        updateSnackBar({
          message: "Something Went Wrong! Please Try Again ",
          open: true,
          onClose: () => {},
          type: "error",
        });
      }
      updateLoading(false);
    }
  };
  const handleRemoveToken = async () => {
    console.log("removing the tokem from the marketplace..");
    if (currentNFT && !loading) {
      updateLoading(true);
      const res = await removeNftFromMarket(currentNFT?.tokenId);
      if (res)
        updateSnackBar({
          message: "Removed From The MarketPlace!",
          open: true,
          onClose: () => {},
          type: "success",
        });

      res
        ? setManualRender(!manualRender)
        : updateSnackBar({
            message: "Something Went Wrong!",
            open: true,
            onClose: () => {},
            type: "error",
          });
      updateLoading(false);
    }
  };

  if (!currentNFT) {
    if (loading) {
      return (
        <div className="flex justify-center items-center mt-10 mb-10 h-80">
          <h1 className="font-poppins">
            <CustomLoader />
          </h1>
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center mt-10 mb-10 h-svh">
        <h1 className="font-poppins dark:text-white text-black text-center">
          Couldn't Find The NFT You're Looking For.
          Check MyNFts Section If You Recently Bought This NFT
        </h1>
      </div>
    );
  }

  return (
    <section className="flex justify-center dark:text-white text-black">
      <CustomSnackbar {...{ ...snackBar, onClose: handleClose }} />
      <div className="flex flex-col justify-center items-center md:w-4/5 w-full p-4">
        <div className="flex md:flex-nowrap flex-wrap md:justify-normal justify-center p-8 bg-gray-100 dark:bg-zinc-900  shadow-sm shadow-gray-400 mt-10 rounded-tl-3xl mb-8">
          <img
            src={currentNFT.tokenData.imgURI}
            height={250}
            width={270}
            alt="nft"
            style={{ objectFit: "cover" }}
            className="rounded-tl-3xl"
          />

          <div className="flex flex-col md:pl-10 md:pt-0 pt-4 md:items-start items-center  ">
            <h1 className="font-poppins text-3xl font-semibold">
              {currentNFT.tokenData.name}
            </h1>
            <p className="font-poppins text-sm dark:text-gray-100 text-black pt-5 leading-7">
              {currentNFT.tokenData.description}
              
            </p>
            <div className="pt-3 flex md:flex-nowrap flex-wrap justify-between pl-0 ml-0">
              <div className="font-poppins text-sm font-semibold flex items-center md:flex-nowrap flex-wrap">
                <img
                  src={accountAvatar}
                  alt=""
                  className="object-cover h-10 w-10 rounded-full"
                />
                <span className="md:ms-2 ms-1 text-xs md:mt-0 mt-3 truncate md:w-fit w-64 dark:text-white text-black">
                  {currentNFT.owner.toLowerCase()}
                </span>
              </div>
              {currentNFT.isListed && (
                <p className="font-poppins font-semibold flex items-center md:mt-0 mt-5  dark:text-white text-black">
                  <Tooltip title={"Etherium"}>
                    <img src={etherim} alt="" height={30} width={30} />
                  </Tooltip>
                  {currentNFT.price}
                </p>
              )}
            </div>
            <div className="mt-10 flex dark:text-white text-black">
              {id?.split("_")[1] == account && !currentNFT.isListed ? (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-yellow-400 font-poppins text-black"
                  onClick={() => setIsModalOpen(true)} // Open modal
                >
                  <ResetTv className="pr-2" fontSize="medium" />
                  {loading ? <CustomLoader /> : "Resell"}
                </button>
              ) : id?.split("_")[1] == account ? (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-red-600 font-poppins text-white"
                  onClick={handleRemoveToken} // Open modal
                >
                  <Close className="pr-2" />
                  Remove From Market
                </button>
              ) : (
                <button
                  className="px-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-green-700 font-poppins text-white"
                  onClick={() => setIsModalOpen(true)} // Open modal
                >
                  <ShoppingCart className="pr-2" />
                  {loading ? <CustomLoader /> : "Buy Now"}
                </button>
              )}
              <button className="px-3 ml-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gray-500 font-poppins outline text-white">
                <Share className="pr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 md:w-5/12 w-9/12">
              <h2 className="text-2xl font-semibold text-center mb-4 font-poppins">
                {currentNFT.isListed ? "Confirm Purchase" : "Resell NFT"}
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                {currentNFT.isListed ? (
                  <>
                    <span className="font-bold font-poppins">NFT Name:</span>{" "}
                    {currentNFT.tokenData.name} <br />
                    <span className="font-bold font-poppins ">Price:</span>{" "}
                    {currentNFT.price} ETH
                    <br />
                    <span className="font-bold font-poppins ">
                      Platform Fee:
                    </span>{" "}
                    0.0025 ETH
                  </>
                ) : (
                  <span>
                    <label
                      htmlFor="new-price"
                      className="font-poppins font-bold"
                    >
                      New Price
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      onChange={(x) => updateNewPrice(+x.target.value)}
                      className="ms-3 p-2 mt-4  outline-dashed "
                    />
                  </span>
                )}
              </p>
              <hr className="bg-gray-300 h-1" />
              <p className="text-lg font-bold text-center mb-6 font-poppins mt-3">
                {currentNFT.isListed
                  ? `New Price: ${+currentNFT.price + 0.0025} ETH`
                  : `New Price: ${newPrice} ETH`}
              </p>
              <div className="flex justify-center gap-4">
                {currentNFT.isListed ? (
                  <button
                    className="px-3 py-2 w-full rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500  font-poppins text-white"
                    onClick={handleConfirmPurchase} // Open modal
                  >
                    {loading ? <CustomLoader /> : "Confirm"}
                  </button>
                ) : (
                  <button
                    className="px-3 py-2 w-full rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 font-poppins text-white"
                    onClick={handleResellNft} // Open modal
                  >
                    {" "}
                    {loading ? <CustomLoader /> : "Confirm"}
                  </button>
                )}
                <button
                  className="px-3 ml-3 py-2 rounded-md shadow-md hover:scale-105 transition-all shadow-black bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500  font-poppins outline text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Close />
                </button>
              </div>
            </div>
          </div>
        )}
        {id?.split("_")[1] == account ? (
          <div className="flex justify-center items-center p-5 mt-5 mb-5">
            <Link to={"/"} className="cursor-pointer font-poppins">
              <ArrowBackIosTwoTone fontSize="large" />
              Go Back To Market Place
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="md:text-3xl text-2xl font-semibold flex items-center font-poppins ">
              <AppsIcon className="pr-3" fontSize="large" />
              More From This Owner
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
              {moreOwnerNFTs.length == 1?
              <div className="flex flex-col items-center justify-center mt-3">
              <Link className="underline" to={'/'}>{"< Go Back"}</Link>
              </div>
              :
              moreOwnerNFTs.map((item) => ((currentNFT.tokenId != item.tokenId) &&
                <CardNft
                  tokenId={item.tokenId}
                  name={item.tokenData.name}
                  key={item.owner}
                  account={item.owner}
                  ethAmount={+item.price}
                  image={item.tokenData.imgURI}
                />
              ))
            }
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsNfts;
