import { mediaFetcher } from "../media-manager";
import React from 'react';
import "../css/Tab.css";

interface TabProps {
    title?: string;
    icon?: string;
    selected?: boolean;
    action?: () => void;
}

export const Tab: React.FC<TabProps> = ({
    title = 'Default Title',
    icon = 'misc/pediaquestion',
    selected = false,
    action = () => { },
}) => {
    return (
        <a
            className={"tab" + (selected ? " selected-tab" : "")}
            onClick={action}
            role="tab"
            tabIndex={0}
            aria-selected={selected}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    action();
                }
            }}
        >
            <div className="left-corner tab-corner">
                <div></div>
            </div>
            <div className="right-corner tab-corner">
                <div></div>
            </div>
            <img src={mediaFetcher(`${icon}.png`)} alt={title} />
            <p>{title}</p>
        </a>
    )
};