import React, { FormEvent, useState } from 'react'

interface Props {
    logInUser: (event: any) => void
}

const LogIn = ({ logInUser }: Props) => {
    const [username, setusername] = useState("");

    const changeUsername = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setusername(event.currentTarget.value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        logInUser(username)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={changeUsername}></input>
                <button type="submit">Log In</button>

            </form>
        </div>
    )
}

export default LogIn;
