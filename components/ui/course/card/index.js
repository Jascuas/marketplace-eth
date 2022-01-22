
import Image from "next/image";
import Link from "next/link";

const STATE_COLORS = {
    purchased: "indigo",
    activated: "green",
    deactivated: "red"
}

export default function Card({ course, disabled, Footer, state }) {

    const stateColor = STATE_COLORS[state]

    return (
        <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex h-full flex-col xs:flex-row">
                <div className="flex-1  next-image-wrapper">
                    <Image
                        className={`object-cover ${disabled && "filter grayscale"}`}
                        layout="responsive"
                        width="100%"
                        height="100%"
                        src={course.coverImage}
                        alt={course.title} />
                </div>
                <div className="p-3 xs:pb-4  flex-2 items-center">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ">{course.type}
                        {state &&
                            <span className={`text-xs text-${stateColor}-700 bg-${stateColor}-200 rounded-full  p-2 ml-2 `}>
                                {state}
                            </span>
                        }
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                        <a className="h-12 block mt-1 text-sm sm:text-base leading-tight font-medium text-black hover:underline">{course.title}</a>
                    </Link>
                    <p className="h-20 my-2 text-sm sm:text-base text-gray-500 mb-8 xs:mb-0">{course.description}</p>
                    {Footer &&
                        <div className="text-center xs:text-left mt-2"><Footer /></div>
                    }
                </div>
            </div>
        </div>
    )
}
