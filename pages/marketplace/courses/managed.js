
import { MarketHeader } from "@components/ui/marketplace"
import { BaseLayout } from "@components/ui/layout"
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useState } from "react";
import { useWeb3 } from "@components/providers";

const VerificationInput = ({ onVerify }) => {
    const [email, setEmail] = useState("")

    return (
        <div className="flex mr-2 relative rounded-md">
            <input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                type="email"
                name="account"
                id="account"
                className="mr-2 w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..." />
            <Button
                onClick={() => {
                    onVerify(email)
                }}
            >
                Verify
            </Button>
        </div>
    )
}

export default function ManagedCourses() {
    const [proofOwnership, setProofWnership] = useState({})
    const { web3 } = useWeb3()
    const { account } = useAdmin({ redirectTo: "/marketplace" })
    const { managedCourses } = useManagedCourses(account)

    const verifyCourse = (email, { hash, proof }) => {
        const emailHash = web3.utils.sha3(email)
        const proofToCheck = web3.utils.soliditySha3(
            { type: "bytes32", value: emailHash },
            { type: "bytes32", value: hash }
        )

        setProofWnership({ ...proofOwnership, [hash]: proofToCheck === proof })
    }

    if (!account.isAdmin) {
        return null
    }


    return (
        <>
            <MarketHeader />
            <CourseFilter />
            <section className="grid grid-cols-1">
                {managedCourses.data?.map(course =>
                    <ManagedCourseCard
                        key={course.ownedCourseId}
                        course={course}
                    >
                        <VerificationInput
                            onVerify={email => {
                                verifyCourse(email, {
                                    hash: course.hash,
                                    proof: course.proof
                                })
                            }}
                        />
                        {proofOwnership[course.hash] &&
                            <div className="mt-2">
                                <Message>Verified!</Message>
                            </div>
                        }
                        {proofOwnership[course.hash] == false &&
                            <div className="mt-2">
                                <Message type="danger">Wrong proof!</Message>
                            </div>
                        }
                    </ManagedCourseCard>
                )}
            </section>
        </>
    )
}

ManagedCourses.Layout = BaseLayout