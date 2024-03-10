
const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xmlSpace="preserve" style={{margin: '30px auto', display: 'block'}}>
            <g>
                <circle cx="16" cy="64" r="16" fill="#00054d" />
                <circle cx="16" cy="64" r="16" fill="#555888" transform="rotate(45 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#9496b4" transform="rotate(90 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#cccddb" transform="rotate(135 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e2ea" transform="rotate(180 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e2ea" transform="rotate(225 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e2ea" transform="rotate(270 64 64)" />
                <circle cx="16" cy="64" r="16" fill="#e1e2ea" transform="rotate(315 64 64)" />
                <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="800ms" repeatCount="indefinite" />
            </g>
        </svg>
    )
}

export default Spinner;
