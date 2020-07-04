import React from 'react'

interface Props {
    tabIndex: Number,
    tabName: String,
    setselected: any,
    selected: Number
}

const Tab = ({ tabIndex, tabName, setselected, selected }: Props) => {
    return (
        <div className="tab">
            <p onClick={() => setselected(tabIndex)}>{tabName}</p>
        </div>
    )
}

export default Tab
