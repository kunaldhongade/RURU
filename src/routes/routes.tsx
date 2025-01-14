import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreateNFT from "../pages/CreateNFT";
import ListedNfts from "../pages/ListedNfts";
import DetailsNfts from "../pages/DetailsNfts";
import MyNfts from "../pages/MyNfts";
export const Routes = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:
        [
            {path:'/',
                element:<Home/>
            },
            {
                path:'/create-nft',
                element:<CreateNFT />
            },
            {
                path:'/listed-nfts',
                element:<ListedNfts/>
            },
            {
                path:'/my-nfts',
                element:<MyNfts/>
            },
            {
                path:'/details-nfts/:id',
                element:<DetailsNfts />
            }

        ]
    }
])