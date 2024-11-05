import pink from "../assets/slimes/pink.png";
import phosphor from "../assets/slimes/phosphor.png";

export const Header = (props) => {
    return (
        <header className="App-header">
            <img src={props.dark ? phosphor : pink} className="App-logo" alt="logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

