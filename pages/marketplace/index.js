
import { CourseList, CourseCard } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { useWalletInfo, useOwnedCourses } from "@components/hooks/web3"
import { Button, Loader } from "@components/ui/common"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"
import { useWeb3 } from "@components/providers"
import { withToast } from "@utils/toast"

export default function Marketplace({ courses }) {
    const { web3, contract, requireInstall } = useWeb3();
    const { hasConnectedWallet, isConnecting, account } = useWalletInfo()
    const { ownedCourses } = useOwnedCourses(courses, account.data)

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [busyCourseId, setBusyCourseId] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)

    const purchaseCourse = async (order, course) => {
        const hexCourseId = web3.utils.utf8ToHex(course.id)

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexCourseId },
            { type: "address", value: account.data }
        )

        const value = web3.utils.toWei(String(order.price))

        setBusyCourseId(course.id)

        if (isNewPurchase) {
            const emailHash = web3.utils.sha3(order.email)
            const proof = web3.utils.soliditySha3(
                { type: "bytes32", value: emailHash },
                { type: "bytes32", value: orderHash }
            )

            withToast(_purchaseCourse({ hexCourseId, proof, value }, course))
        } else {
            withToast(_repurchaseCourse({ courseHash: orderHash, value }, course))
        }
    }

    const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
        try {
            const result = await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({ from: account.data, value })

            ownedCourses.mutate([
                ...ownedCourses.data, {
                    ...course,
                    proof,
                    state: "purchased",
                    owner: account.data,
                    price: value
                }
            ])

            return result
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setBusyCourseId(null)
        }
    }

    const _repurchaseCourse = async ({ courseHash, value }, course) => {
        try {
            const result = await contract.methods.repurchaseCourse(
                courseHash
            ).send({ from: account.data, value })
            const index = ownedCourses.data.findIndex(c => c.id === course.id)

            if (index >= 0) {
                ownedCourses.data[index].state = "purchased"
                ownedCourses.mutate(ownedCourses.data)
            } else {
                ownedCourses.mutate()

            }
            return result
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setBusyCourseId(null)
        }
    }

    const cleanupModal = () => {
        setSelectedCourse(null)
        setIsNewPurchase(true)
    }

    return (
        <>
            <MarketHeader />
            <CourseList courses={courses}>
                {
                    course => {
                        const owned = ownedCourses.lookup[course.id]

                        return (
                            <CourseCard
                                key={course.id}
                                course={course}
                                state={owned?.state}
                                disabled={!hasConnectedWallet}
                                Footer={() => {
                                    if (requireInstall) {
                                        return (
                                            <Button
                                                size="sm"
                                                disabled={true}
                                                variant="lightPurple">
                                                Install
                                            </Button>
                                        )
                                    }

                                    if (isConnecting) {
                                        return (
                                            <Button
                                                size="sm"
                                                disabled={true}
                                                variant="lightPurple">
                                                <Loader size="sm" />
                                            </Button>
                                        )
                                    }

                                    if (!ownedCourses.hasInitialResponse) {
                                        return (
                                            // <div style={{ height: "42px" }}></div>
                                            <Button
                                                variant="white"
                                                disabled={true}
                                                size="sm">
                                                {hasConnectedWallet ?
                                                    <Loader size="sm" /> :
                                                    "Connect"
                                                }
                                            </Button>
                                        )
                                    }

                                    const isBusy = busyCourseId === course.id
                                    // const isBusy = true

                                    if (owned) {
                                        return (
                                            <>
                                                <div>
                                                    {owned.state !== "deactivated" &&
                                                        <Button
                                                            size="sm"
                                                            disabled={isBusy}
                                                            variant="lightGreen"
                                                            className="mb-2 mr-2">
                                                            <a href={`/courses/${course.slug}`}>Watch</a>
                                                        </Button>
                                                    }
                                                    {owned.state === "deactivated" &&
                                                        <Button
                                                            size="sm"
                                                            disabled={isBusy}
                                                            onClick={() => {
                                                                setIsNewPurchase(false)
                                                                setSelectedCourse(course)
                                                            }}
                                                            variant="purple"
                                                            className="mb-2">
                                                            {isBusy ?
                                                                <div className="flex">
                                                                    <Loader size="sm" />
                                                                    <div className="ml-2">In Progress</div>
                                                                </div> :
                                                                <div>Fund to Activate</div>
                                                            }
                                                        </Button>
                                                    }
                                                </div>
                                            </>
                                        )
                                    }

                                    return (
                                        <Button
                                            size="sm"
                                            onClick={() => setSelectedCourse(course)}
                                            disabled={!hasConnectedWallet || isBusy}
                                            variant="lightPurple">
                                            {isBusy ?
                                                <div className="flex">
                                                    <Loader size="sm" />
                                                    <div className="ml-2">In Progress</div>
                                                </div> :
                                                <div>Purchase</div>
                                            }
                                        </Button>
                                    )
                                }
                                }
                            />
                        )
                    }

                }
            </CourseList>
            {selectedCourse &&
                <OrderModal
                    onSubmit={(formData, course) => {
                        purchaseCourse(formData, course)
                        cleanupModal()
                    }}
                    isNewPurchase={isNewPurchase}
                    course={selectedCourse}
                    onClose={cleanupModal}
                />
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