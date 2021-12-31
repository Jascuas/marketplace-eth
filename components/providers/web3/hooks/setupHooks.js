
import { handler as createUseAccount } from "./useAccount";
//if u spect more than one parameter, you can call them using the dependencies
export const setupHooks = (...deps) => {

    return {
        useAccount: createUseAccount(...deps)
    }
}