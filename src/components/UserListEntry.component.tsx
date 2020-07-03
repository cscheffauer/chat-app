import React from 'react'

interface Props {
    key: String,
    username: String
}

const UserListEntry = ({ username }: Props) => {
    return (
        <div className="userlistentry">
            <p className="username">
                {username}
            </p>
        </div>
    )
}

export default UserListEntry;
