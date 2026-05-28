export default function Container(
    {
        children,
        className
    }:
        {
            children: React.ReactNode,
            className?: string
        }) {
    return <div className={`${className} max-w-312 px-8 w-full mx-auto z-1 py-20`}>{children}</div>
}