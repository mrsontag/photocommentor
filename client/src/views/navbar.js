import React from 'react';
import { useNavigate } from '@reach/router'
import Button from '@material-ui/core/Button'
import { useAuth0 } from "@auth0/auth0-react";

const UserBar = props => {
    const {name, picture } = props.user;
    const { navpath } = props;
    const Navigate = useNavigate();
    const { logout } = useAuth0();

    const style = {
        maxWidth: "40px", 
        maxHeight: "40px",
        border: "1px solid darkgrey",
        borderRadius: "20px"
    }
        

    return (
        <div>
            <div style={{display: "inline-block", width: "700px",  textAlign: "left", fontSize: "larger", fontWeight: "bold"}}>
                {navpath.length && navpath.map((step, index) => {
                    return(
                        <>
                            <a href={step.link} onClick={(e) => { e.preventDefault(); Navigate(step.link)}}>{step.name}</a> 
                            { index < navpath.length - 1 ? <b>{` -> `}</b> : ""}
                        </>
                    )
                }) }
            </div>
            <div style={{display: "inline-block", width: "270px", textAlign: "right"}}>
                <h3>{name}</h3>
                <img style={style} alt="User" src={picture} />
                <Button variant="contained" color="primary" onClick={() => logout({ returnTo: "http://localhost:3000/" })}>Logout</Button>
            </div>
        </div>
        
    )
}

export default UserBar;