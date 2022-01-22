
import { ActiveLink } from "@components/ui/common/";
import React from "react"


const BreadcrumbItem = ({item}) => {
  return (
      <ActiveLink href={item.href} >
        <a className="font-medium xs:px-4 px-2 text-gray-500 hover:text-gray-900 text-sm xs:text-lg">{item.value}</a>
      </ActiveLink>
  )
}

export default function Breadcrumbs({items, isAdmin}) {

  return (
    <nav aria-label="breadcrumb" className=" flex xs:justify-end justify-center py-4 px-0 sm:px-6 lg:px-8">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        { items.map((item, i) =>
          <React.Fragment key={i}>
            { !item.requireAdmin &&
              <BreadcrumbItem
                item={item}
              />
            }
            { item.requireAdmin && isAdmin &&
              <BreadcrumbItem
                item={item}
              />
            }
          </React.Fragment>
        )}
      </ol>
    </nav>
  )
}