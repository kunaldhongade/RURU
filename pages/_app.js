import '../styles/globals.css'
import Link from 'next/link'
import Web3 from 'web3'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal'
import Image from 'next/image'

const provider_options = {

};

if (typeof window !== "undefined") {
  const web3modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    provider_options
  })
}



function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className='border-b p-6'>
        <div>
          <a href="#" className="flex items-center py-4 px-2">
            <Image
              src="/logo.png"
              alt="logo"
              className="h-8 w-8 mr-2"
              width={220}
              height={60}
            />
          </a>
        </div>
        <div className='flex mt-4'></div>
        <Link href="/">
          <a className='mr-4 text-pink-500'>Home</a>
        </Link>
        <Link href="/create-item">
          <a className='mr-6 text-pink-500'>Sell NFT</a>
        </Link>
        <Link href="/my-assets">
          <a className='mr-6 text-pink-500'>My NFT</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className='mr-6 text-pink-500'>Dashboard</a>
        </Link>

        {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={async () => {
          const provider = await web3modal.connect();
          const web3 = new Web3(provider);

          // const web3Modal = new Web3Modal();
          // const connection = await web3Modal.connect();
          // const provider = new ethers.providers.Web3Provider(connection);

          // const web3Modal = new Web3Modal()
          // const connection = await web3Modal.connect()
          // const provider = new ethers.providers.Web3Provider(connection)
          // const signer = provider.getSigner()
        }} >Connect Wallet</button> */}

      </nav >
      <Component {...pageProps} />
    </div >

  )
}

export default MyApp
