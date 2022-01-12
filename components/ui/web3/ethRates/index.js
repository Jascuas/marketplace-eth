
import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthePrice"
import Image from "next/image"
import { Loader } from "@components/ui/common"


export default function EthRates() {

  const { eth } = useEthPrice()

  return (
    <div className="flex flex-col xs:flex-row text-center justify-center sm:justify-start">
      <div className="p-6 border drop-shadow rounded-md xs:mr-2">
        <div className="flex items-center justify-center">
          {eth.data ?
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">
                = {eth.data}$
              </span>
            </> :
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          }
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md mt-2 xs:mt-0">
        <div className="flex items-center justify-center">
          {eth.data ?
            <>
              <span className="text-xl font-bold">
                {eth.perItem}
              </span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">
                = {COURSE_PRICE}$
              </span>
            </> :
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          }
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  )
}
