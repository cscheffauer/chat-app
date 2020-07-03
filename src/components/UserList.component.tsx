import React from 'react'
import UserListEntry from '../components/UserListEntry.component'

interface Props {
    userList: Object
}

const UserList = ({ userList }: Props) => {
    return (
        <div className="userlist">
            {
                Object.entries(userList).map(([key, user]) => <UserListEntry key={key} username={user.username} />)
            }
        </div>
    )
}

export default UserList
