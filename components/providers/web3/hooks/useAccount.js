//swr js

import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
    "0xe731dc2bf4ac4db84316c2501716961b92a1ced229e9f749cb6b4ffbb5385ff3": true
}

export const handler = (web3, provider) => () => {

    const { data, mutate, ...rest } = useSWR(() =>
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = [null]
            if (provider.selectedAddress) {
                accounts = await provider.request({ method: 'eth_requestAccounts' })
            }

            return accounts[0]

        }
    )

    useEffect(() => {
        provider && provider.on("accountsChanged", accounts => mutate(accounts[0] ?? null))
    }, [provider])


    return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest
    }
}