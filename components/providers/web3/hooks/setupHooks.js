
import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedCoursesHook } from "./useOwnedCourses";

//if u spect more than one parameter, you can call them using the dependencies
export const setupHooks = ({web3, provider, contract}) => {

    return {
        useAccount: createAccountHook(web3, provider),
        useNetwork: createNetworkHook(web3, provider),
        useOwnedCourses: createOwnedCoursesHook(web3, contract)
    }
}