
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ActiveLink({children, activeLinkClass, ...props}) {

    const {pathname} = useRouter()

    let className = children.props.className || ""


    if(pathname === props.href ) {
        className = `${className} ${activeLinkClass ? activeLinkClass : "text-indigo-500"} `
    }
    
    if(pathname.substring(0, 12) === props.href && children.props.children != "Buy"){
        className = `${className} ${activeLinkClass ? activeLinkClass : "text-indigo-500"} `
    }

    return(
        <Link {...props}>
        {
            React.cloneElement(children, {className})
        }
        </Link>
    )
}