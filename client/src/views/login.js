import React from "react";
import {Link} from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
//import styles from "./login.module.css"; 

const Login = () => {
    const { loginWithRedirect,logout } = useAuth0();

    return (
        <div>
            <div>
                <h1 >Welcome to Photo Commentor</h1>
                <button type='button' onClick={() => loginWithRedirect()}>Login or Register</button>
                <button type='button' onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}

export default Login;