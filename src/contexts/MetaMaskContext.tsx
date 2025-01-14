import blockies from "ethereum-blockies";
import React, { createContext, ReactNode, useState ,useEffect} from "react";

interface MetaMaskContextType {
  isConnected: boolean;
  connectWallet: React.Dispatch<React.SetStateAction<boolean>>;
  account:string
  accountAvatar:string
}

export const MetaMaskContext = createContext<MetaMaskContextType >({isConnected:false,connectWallet:()=>{},account:"",accountAvatar:""});

type Props = {
  children: ReactNode;
};

export const MetaMaskWrapper: React.FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string |null>(null);
  const [accountAvatar,updateAvatar]= useState<string>("")
  useEffect(() => {
    const connectWallet = async () => {
      const ethereum = (window as any).ethereum; 
      if(isConnected)
        return;   
      if (ethereum) {
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          console.log('successfully connecteedd!, accounts[0]:',accounts[0],"accounts",accounts)
          setIsConnected(true);
          
          ethereum.on("accountsChanged", (newAccounts: string[]) => {
            setAccount(newAccounts[0] || null);
          });
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
      }
    };

    connectWallet();
  }, [isConnected]);


useEffect(()=>{
  if(account)
  updateAvatar(blockies.create({ seed: account, size: 16 }).toDataURL())
},[account])
  
  return (
    <MetaMaskContext.Provider value={{ isConnected, connectWallet:setIsConnected,account:account?account:"",accountAvatar}}>
      {children}
    </MetaMaskContext.Provider>
  );
};
