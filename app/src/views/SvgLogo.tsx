import Logo from "/RabiJumpLOGO.svg"

function SvgLogo({
    width = 320,
    height = 320
}) {
    return (
        <img width={width} height={height} src={Logo}></img>
    )
}

export default SvgLogo;