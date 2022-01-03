
import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
//if u spect more than one parameter, you can call them using the dependencies
export const setupHooks = (...deps) => {

    return {
        useAccount: createAccountHook(...deps),
        useNetwork: createNetworkHook(...deps)
    }
}