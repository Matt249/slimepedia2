import "./assets/css/Tab.css";

export const Tab = (props) => {
    return (
        <div className={"tab" + (props.selected ? " selected-tab" : "")} onClick={props.action}>
            <img src={require(`./assets/${props.icon}.png`)} alt={props.name} />
            <p>{props.title}</p>
        </div>
    );
}