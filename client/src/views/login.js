import React from "react";
import { useNavigate } from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    const Navigate = useNavigate();
    
    return (
        <div>
            <h1 >Welcome to Photo Comments</h1>
            <p>If this is your first visit, please feel free to browse anonymously - some galleries have been set by their owners to allow anonymous comments.</p>
            <p>Also, you can register easily using your email address or your Google account.  Your information is always secure, as user administration is handled by
            the external service provider <a href="https://www.auth0.com">Auth0</a>.</p>
            <Button style={{margin: "5px" }} variant="contained" color="primary" type='button' onClick={() => loginWithRedirect()}>Login or Register</Button>
            <Button style={{margin: "5px" }} variant="contained" color="primary" type='button' onClick={() => Navigate("/anon/")}>View as Anonymous User</Button>
        </div>
    )
}

export default Login;