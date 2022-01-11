
import { Button, Message } from "@components/ui/common";
import { MarketHeader } from "@components/ui/marketplace"
import { BaseLayout } from "@components/ui/layout"
import { OwnedCourseCard } from "@components/ui/course"
import { useOwnedCourses } from "@components/hooks/web3";

export default function OwnedCourses() {

    const { ownedCourses } = useOwnedCourses()

    console.log(ownedCourses.data)
    return (
        <>
            <MarketHeader />
            <section className="grid grid-cols-1">
                <OwnedCourseCard>
                    <Message>
                        My custom message!
                    </Message>
                    <Button>
                        Watch the course
                    </Button>
                </OwnedCourseCard>
            </section>
        </>
    )
}

OwnedCourses.Layout = BaseLayout