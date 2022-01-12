
import { ActiveLink } from "@components/ui/common/";

export default function Breadcrumbs({ items }) {
 
  return (
    <nav aria-label="breadcrumb" className=" flex xs:justify-end justify-center py-4 px-0 sm:px-6 lg:px-8">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, index) =>
          <ActiveLink href={item.href} key={index}>
            <a className="font-medium xs:px-4 px-2 text-gray-500 hover:text-gray-900 text-sm xs:text-lg">{item.value}</a>
          </ActiveLink>
        )}
      </ol>
    </nav>
  )
}
