import React from "react";
import {Link} from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
//import styles from "./login.module.css"; 
import Button from '@material-ui/core/Button';

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <h1 >Welcome to Photo Commentor</h1>
            <Button style={{margin: "5px" }} variant="contained" color="primary" type='button' onClick={() => loginWithRedirect()}>Login or Register</Button>
        </div>
    )
}

export default Login;