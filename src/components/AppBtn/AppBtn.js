import './AppBtn.scss';

export default function AppBtn(props) {
    return(
        <div className={"btn " + props.className}>
            <button onClick={() => {
                props.clickFnc()
            }}>
                {props.children}
            </button>
        </div>
    )
};
