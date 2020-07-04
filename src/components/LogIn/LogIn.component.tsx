import React, { FormEvent, useState } from 'react'
import './LogIn.scss';

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
        <div className="login">
            <p>Please type in your name to join:</p>
            <form onSubmit={handleSubmit}>
                <input onChange={changeUsername}></input>
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default LogIn;
