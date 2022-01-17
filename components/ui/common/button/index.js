
export default function Button({
    children,
    className,
    variant = "purple",
    ...rest
}) {

    const variants = {
        white: `text-black bg-white`,
        purple: "text-white bg-indigo-600 hover:bg-indigo-700",
        red: "text-white bg-red-600 hover:bg-red-700",
        green: "text-white bg-green-600 hover:bg-green-700",
        lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
    }
    return (
        <button
            {...rest}
            className={`disabled:opacity-50 disabled:pointer-events-none xs:px-8 xs:py-3 p-2 border rounded-md text-base font-medium ${className} ${variants[variant]}`}>
            {children}
        </button>
    )
}