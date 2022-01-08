
import { CourseList, CourseCard } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { EthRates, WalletBar } from "@components/ui/web3"
import { useAccount, useNetwork } from "@components/hooks/web3"
import { Button } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { useEthPrice } from "@components/hooks/useEthePrice"


export default function Marketplace({ courses }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { account } = useAccount()
    const { network } = useNetwork()
    const {data} = useEthPrice()
    return (
        <>
            <WalletBar address={account.data} network={{ data: network.data, target: network.target, isSupported: network.isSupported }} />
            {data &&
                <EthRates data={data}/>
            }
            <CourseList courses={courses}>
                {
                    course =>
                        <CourseCard
                            key={course.id}
                            course={course}
                            Footer={() =>
                                <div><Button
                                    onClick={() => setSelectedCourse(course)}
                                    variant="lightPurple">
                                    Purchase
                                </Button></div>
                            } />
                }
            </CourseList>
            { selectedCourse &&
                <OrderModal course={selectedCourse} onClose={() => setSelectedCourse(null)}/>
            }
            
        </>
    )
}

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

Marketplace.Layout = BaseLayout