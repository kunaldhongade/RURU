import { Close, DarkMode, LightMode, Menu } from "@mui/icons-material";
import React, { useEffect } from "react";

import useToggleModes from "../customHooks/useToggleModes";
import Button from "./Button";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { MetaMaskContext } from "../contexts/MetaMaskContext";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomSnackbar, { CustomSnackbarProps } from "./CustomSnackBar";
const MenuItems = ({
  setIsMenuOpen,
  isConnected,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected: boolean;
}) => {
  return (
    <>
      {[
        { item: "Listed-NFTs", path: "/listed-nfts" },
        { item: "My-NFTs", path: "/my-nfts" },
      ].map((item, i) => (
        <Link
          to={item?.path}
          key={item?.item}
          className="no-underline p-2 "
          onClick={() => {
            setIsMenuOpen((prev) => (prev ? false : false));
          }}
        >
          {" "}
          <li className="text-md font-semibold dark:text-white text-black">
            {item?.item}
          </li>
        </Link>
      ))}
    </>
  );
};

const NavBar = () => {
  const [mode, setMode] = useToggleModes();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { account, connectWallet } = useContext(MetaMaskContext);
  const { createButton } = useContext(ThemeContext);
  const [snackBar, updateSnackBar] = useState<CustomSnackbarProps>({
    message: "",
    open: false,
    type: "success",
    onClose: () => {},
  });
  const handleConnectionToMetaMask = () => {
    if (!account) {
      updateSnackBar({
        message: "MetaMask is Not Installed!",
        open: true,
        type: "error",
        onClose: () => {},
      });
    }
  };
  const handleClose = () => {
    updateSnackBar({
      message: "",
      open: false,
      type: "success",
      onClose: () => {},
    });
  };
  return (
    <nav className="dark:bg-zinc-900 dark:border-b  max-h-10 dark:border-zinc-700 border-b border-gray-200  flex justify-between items-center py-8 px-4">
      <CustomSnackbar {...{ ...snackBar, onClose: handleClose }} />
      <div className="dark:text-white text-black font-poppins font-semibold flex items-center ">
        <Link to="/">
          <img
            src={logo}
            alt=""
            height={60}
            width={100}
            className="md:ms-0 -ms-5 "
          />{" "}
        </Link>
        {/* <span className="font-bold text-black dark:text-white -ms-4 text-sm md:block hidden"> */}
        {/* RuRu NFT */}
        {/* </span> */}
      </div>
      <div>
        <div className="font-poppins font-semibold flex items-center ">
          <div className="relative py-2 px-2 me-3 dark:bg-gray-700 bg-blue-400 flex justify-between items-center w-[80px] max-w-24 rounded-full h-9">
            <LightMode style={{ color: "yellow" }} />
            <DarkMode />
            <div
              className={`bg-white  absolute w-[45%] h-full transition-all top-0 ${
                mode ? "left-0" : "right-0"
              } rounded-full border-2 cursor-pointer`}
              onClick={() => setMode(!mode)}
            ></div>
          </div>

          <div className="hidden md:flex items-center">
            <ul className="flex">
              <MenuItems
                isConnected={account ? true : false}
                setIsMenuOpen={setIsMenuOpen}
              />
            </ul>

            <div>
              {account ? (
                <Button
                  animate={createButton}
                  title="Create"
                  path=""
                  handleOnClickOrChange={() => {
                    navigate("/create-nft");
                  }}
                />
              ) : (
                <Button
                  animate={createButton}
                  title="Connect"
                  path=""
                  handleOnClickOrChange={() => {
                    handleConnectionToMetaMask();
                  }}
                />
              )}
            </div>
          </div>

          <div className="block md:hidden">
            <Menu
              onClick={() => setIsMenuOpen(true)}
              className="dark:filter dark:invert"
            />
          </div>

          {isMenuOpen ? (
            <div className="fixed h-svh z-50 inset-0 flex flex-col items-center dark:bg-zinc-900 bg-white justify-center">
              <div
                className="rounded-full border-2 mb-10 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Close fontSize="large" className="dark:filter dark:invert" />
              </div>
              <ul className="flex flex-col justify-center items-center h-fit  ">
                <MenuItems
                  isConnected={account ? true : false}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </ul>
              <div className="mt-5">
                {account ? (
                  <Button
                    animate={createButton}
                    title="Create"
                    path=""
                    handleOnClickOrChange={() => {
                      navigate("/create-nft");
                    }}
                  />
                ) : (
                  <Button
                    animate={createButton}
                    title="Connect"
                    path=""
                    handleOnClickOrChange={() => {
                      handleConnectionToMetaMask();
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
