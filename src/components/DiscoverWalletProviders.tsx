import { useState } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders"
import { formatAddress } from "../utils"

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>("")
  const providers = useSyncProviders()

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      }) as unknown as  string[]

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0] as string)
    } catch (error) {
      console.error(error)
    }
  }

  // Display detected providers as connect buttons.
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div style={{ display: "flex",alignItems:'center',gap:'12px' }}>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img style={{ width: "32px",height: "32px",objectFit:'cover' }} src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount &&
        <div>
          <div>
            <img style={{ width: "32px",height: "32px",objectFit:'cover' }} src={selectedWallet?.info.icon} alt={selectedWallet?.info.name} />
            <div>{selectedWallet?.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        </div>
      }
    </>
  )
}