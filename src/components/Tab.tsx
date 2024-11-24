import { mediaFetcher } from "../media-manager";
import React from 'react';
import "../css/Tab.css";

export const Tab = ({
    title = 'Default Title',
    icon = 'misc/pediaquestion',
    selected = false,
    action = () => { },
}) => {
    return (
        <div className={"tab" + (selected ? " selected-tab" : "")} onClick={action}>
            <img src={mediaFetcher(`${icon}.png`)} alt={title} />
            <p>{title}</p>
        </div>
    )
};