import "./App.css"
import { DiscoverWalletProviders } from "./components/DiscoverWalletProviders"
import VConsole from "vconsole"
function App() {
  new VConsole()
  return (
    <DiscoverWalletProviders/>
  )
}

export default App