export default function Container(
    {
        children,
        className
    }:
        {
            children: React.ReactNode,
            className?: string
        }) {
    return <div className={`${className} max-w-312 px-2 sm:px-4 md:px-6 lg:px-8 w-full mx-auto z-1 py-8 sm:py-12 md:py-16 lg:py-20`}>{children}</div>
}