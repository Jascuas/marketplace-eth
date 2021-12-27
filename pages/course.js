import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";

export default function Course() {

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <CourseHero />
      <Keypoints />
      <Curriculum />
      <Modal />
    </div>
  )
}
import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Course() {

  return (
    <>
      <div className="py-4">
        <CourseHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </>
  )
}

Course.Layout = BaseLayout