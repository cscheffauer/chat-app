import React from 'react'

import './TypeAheadMenu.scss'
type menuItem = {
    label: string,
    command: string,
}
type menuItems = menuItem[]

interface Props {
    menuItems: menuItems,
    message: String,
    setCommand: (command: string) => void
}

const TypeAheadMenu = ({ message, menuItems, setCommand }: Props) => {

    const messageMatchCommand = (item: menuItem) => {
        if (message.length < 2) return false;
        if (item.command.toLowerCase().startsWith(message.toLowerCase())) {
            setCommand(item.command);
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="typeaheadmenu">
            {
                menuItems.map((item) => <p className={"menuitem " + (messageMatchCommand(item) ? 'selected' : "")}>{item.command} - {item.label}</p>)
            }
        </div >
    )
}

export default TypeAheadMenu
