const colorMap = {
    active: '#67c23a',
    inactive: 'gray'
}

function StatusDot(
    {
        active
    }: {
        active: boolean
    }
) {
    return (
        <div className="listcard-dot"
            style={{ backgroundColor: `${active ? colorMap.active : colorMap.inactive}` }}
        >

        </div>)
}

export default StatusDot;