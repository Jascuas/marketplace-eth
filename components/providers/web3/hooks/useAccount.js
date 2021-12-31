//swr js

import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
    "0xefe4bbf4747c901e40104f20fa53255bade0c6b1": true
}

export const handler = (web3, provider) => () => {
    const { data, mutate, ...rest } = useSWR(() =>
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await provider.request({ method: 'eth_requestAccounts' })
            console.log(web3.eth.getAccounts())
            console.log(provider.request({ method: 'eth_requestAccounts' }))
            return accounts[0]
        }
    )

    useEffect(() => {
        provider && provider.on("accountsChanged", accounts => mutate(accounts[0] ?? null))
    }, [provider])

    return {
        account:
        {
            data,
            isAdmin: (data && adminAddresses[data]) ?? false,
            mutate,
            ...rest
        }
    }
}