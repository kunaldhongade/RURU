import { useRef, useState, useEffect, useContext } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ContractContext } from "../contexts/ContractContext";
import Masonry from "react-masonry-css";
import {CustomLoader} from "../components";
import { filterednftsData } from "../constants";
import { CardProfile, Banner, CardNft } from "../components";
import { images } from "../assets";
import SearchBar from "../components/SearchBar";

import blockies from "ethereum-blockies";

const Home = () => {
  const { getMarketNFTs, topSellers } = useContext(ContractContext);
  const [marketNFTs, setMarketNFTs] = useState<filterednftsData[] | null>(null);
  const [searchData, searchDataResult] = useState<filterednftsData[] | null>(
    null
  );
  const ParentRef = useRef<HTMLDivElement | null>(null);
  const ChildRef = useRef<HTMLDivElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(false)
  const breakpointColumnsObj = {
    default: 2,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [shouldNavigationVisible] =
    useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (ParentRef && ChildRef) {
        // one fix here.
        /*            if(  ChildRef.current?.scrollWidth < ParentRef.current?.offsetWidth)
                    setShouldNavigationVisible(false) */
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMarketNFTs = async () => {
      setLoading(true)

      try {
        const marketList = await getMarketNFTs();
        console.log("Getting the market NFTs", marketList);
        if (marketNFTs) {
          setMarketNFTs((prev) => [...marketList]);
        } else {
          setMarketNFTs(marketList);
        }
      } catch (error) {
        console.error(" Error fetching market NFTs:", error);
      }
      setLoading(false)
    };
    fetchMarketNFTs();
  }, []);

  const handleCarouselMove = (move: string) => {
    switch (move) {
      case "left":
        if (ChildRef?.current) {
          ChildRef.current.scrollLeft -= 200;
        }
        break;
      case "right":
        if (ChildRef?.current) {
          ChildRef.current.scrollLeft += 200;
        }
        break;
      default:
        return 0;
    }
  };

  return (
    <main className="md:p-10 p-4 dark:bg-zinc-900 flex flex-col items-center">
      {" "}
      <div className="flex justify-center md:w-10/12 w-full ">
        <Banner title="Dive into the NFT universe where art, technology, and ownership meet!" />
      </div>
      <div className="md:mt-12 mt-10 md:w-3/4 w-11/12  relative">
        <h1 className="font-poppins dark:text-white text-black text-2xl md:ml-5 ml-0 font-semibold">
          Top Sellers
        </h1>
        <div className="carosel-parent relative w-full " ref={ParentRef}>
          <div
            className="carosel-child flex justify-evenly overflow-x-scroll"
            style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
            ref={ChildRef}
          >
            {topSellers.map((item) => (
              <CardProfile
                key={item.owner}
                image={blockies
                  .create({ seed: item.owner, size: 20 })
                  .toDataURL()}
                accountHash={item.owner}
                ethAmount={item.sales}
              />
            ))}
            {images.avatars.map((item, i) => (
              <CardProfile
                key={i}
                image={item}
                accountHash={`0xC...${Math.random()}`}
                ethAmount={50.0 * i+1}
              />
            ))}
            {}
          </div>
          {shouldNavigationVisible ? (
            <>
              {" "}
              <div
                onClick={() => handleCarouselMove("left")}
                className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 rounded-full dark:bg-white bg-slate-50 border cursor-pointer hover:bg-orange-200"
              >
                <ArrowLeftIcon fontSize="large" />
              </div>
              <div
                onClick={() => handleCarouselMove("right")}
                className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 right-0 w-10 h-10 rounded-full dark:bg-white bg-slate-50 border cursor-pointer hover:bg-orange-200"
              >
                <ArrowRightIcon fontSize="large" />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="md:mt-12 mt-10 md:w-3/4 w-11/12">
        <div className="flex items-center justify-between font-poppins font-semibold flex-wrap">
          <h1 className="text-2xl dark:text-white text-black md:ml-5 md:mb-2 mb-2">
            Best Bids
          </h1>
          <SearchBar
            nftsData={marketNFTs}
            searchDataResult={searchDataResult}
          />
        </div>

        <div
          className="md:mt-2 mt-5 flex justify-center"
          id="market-place-nft-area"
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
          {/*   {!searchData?.length &&
              images.nfts.map((item, i) => (
                <CardNft
                  key={i}
                  name={`User${i}`}
                  tokenId={i}
                  image={item}
                  account={`0xC...${Math.random()}`}
                  ethAmount={100.0 * i}
                />
              ))} */}
            {searchData?.length
              ? searchData?.map((item) => (
                  <CardNft
                    key={item.tokenId}
                    name={item.tokenData.name}
                    tokenId={item.tokenId}
                    image={item.tokenData.imgURI}
                    account={item.owner}
                    ethAmount={+item.price}
                  />
                ))
              : marketNFTs?.map((item, i) => (
                  <CardNft
                    key={item.tokenId}
                    name={item.tokenData.name}
                    tokenId={item.tokenId}
                    image={item.tokenData.imgURI}
                    account={item.owner}
                    ethAmount={+item.price}
                  />
                ))}
          </Masonry>
          {loading?<CustomLoader />:''}
          {!loading && !searchData?.length && !marketNFTs?.length && <h3 className="font-poppins mt-5 dark:text-white ">No nfts found.</h3>}

        </div>
      </div>
    </main>
  );
};

export default Home;
