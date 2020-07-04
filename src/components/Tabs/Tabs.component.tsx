import React from 'react'
import './Tabs.scss';

import Tab from './Tab.component'

interface Props {
    setselected: any,
    selected: Number,
    participantNumber: Number
}

const Tabs = ({ setselected, selected, participantNumber }: Props) => {
    return (
        <div className="tabs">
            <Tab tabIndex={1} tabName={"Participants (" + participantNumber + ")"} setselected={setselected} selected={selected} />
            <Tab tabIndex={2} tabName={"Chat"} setselected={setselected} selected={selected} />
        </div>
    )
}

export default Tabs
