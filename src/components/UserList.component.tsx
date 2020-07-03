import React from 'react'

interface Props {
    userList: Object
}

const UserList = ({ userList }: Props) => {
    console.log(Object.entries(userList));
    return (
        <div>
            {
                Object.entries(userList).map(([key, user]) => <p key={key}>{user.username}</p>)
            }
        </div>
    )
}

export default UserList
