
const Center = ({ fullScreen, children, ...rest }) => {
    return (
        <div {...rest} className={`flex items-center justify-center ${fullScreen ? 'w-full h-screen' : ''}`}>{children}</div>
    )
}

export default Center