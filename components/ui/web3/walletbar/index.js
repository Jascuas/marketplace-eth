import { useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { Button } from "@components/ui/common"

export default function WalletBar() {
  const { requireInstall } = useWeb3()
  const { account, network } = useWalletInfo()

  return (

    <section className="text-white bg-indigo-600 my-4 rounded-lg">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">Hello, {account.data}</h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">I hope you are having a great day!</h2>
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button
              className="mr-2 text-sm xs:text-lg p-2"
              variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            {network.isSupported ?
              network.data &&
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network.data}</strong>
              </div> :
              network.data &&
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong Network</div>
                <span>Currently on </span>
                <strong >{network.data}</strong>
                <div>
                  Connect to:
                  <strong className="text-2xl"> {network.target}</strong>
                </div>
              </div>
            }
            {
              requireInstall &&
              <div className="bg-yellow-400 p-4 rounded-lg">
                <div>Cannot connect to network. Please
                  <button onClick={() => window.open("https://metamask.io/", "_blank")}><strong>&nbsp; Install Metamask</strong></button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
