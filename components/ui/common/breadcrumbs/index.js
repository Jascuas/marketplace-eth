import Link from "next/link";



export default function Breadcrumbs() {

  return (
    <nav aria-label="breadcrumb" className=" flex justify-center py-4 px-4 sm:px-6 lg:px-8">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        <Link href="#">
          <a className="font-medium px-4 text-gray-500 hover:text-gray-900">Buy</a>
        </Link>
        <Link href="#">
          <a className="font-medium px-4 text-gray-500 hover:text-gray-900">My Orders</a>
        </Link>
        <Link href="#">
          <a className="font-medium px-4 text-gray-500 hover:text-gray-900">All Orders</a>
        </Link>

      </ol>
    </nav>
  )
}
