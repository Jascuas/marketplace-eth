import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";


export default function Header() {

    return (
        <>
            <WalletBar />
            <EthRates />
            <Breadcrumbs />
        </>
    )
}