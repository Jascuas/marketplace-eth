
import { ActiveLink } from "@components/ui/common/";

export default function Breadcrumbs({ items }) {
 
  return (
    <nav aria-label="breadcrumb" className=" flex justify-end py-4 px-4 sm:px-6 lg:px-8">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, index) =>
          <ActiveLink href={item.href} key={index}>
            <a className="font-medium px-4 text-gray-500 hover:text-gray-900 text-lg">{item.value}</a>
          </ActiveLink>
        )}
      </ol>
    </nav>
  )
}
