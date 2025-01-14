import { Outlet } from "react-router-dom"
import { NavBar,Footer } from "./components"
import "./index.css"
import { MetaMaskWrapper } from "./contexts/MetaMaskContext"
import { ContractContextWrapper } from "./contexts/ContractContext"
import { ThemeContextWrapper } from "./contexts/ThemeContext"
const App = () => {

  return (
    <ThemeContextWrapper >
    <ContractContextWrapper >
    <MetaMaskWrapper >
    <main className="dark:bg-zinc-900 bg-white"> 
      <NavBar />
        <Outlet />    
        {
        // for dyanamic routes
        }
        <Footer />
    </main>
    </MetaMaskWrapper >
    </ContractContextWrapper>
    </ThemeContextWrapper>

  )
}

export default App
