import { navigate } from '@reach/router';
import React from 'react';
import { useNavigate } from '@reach/router'

const UserBar = props => {
    const {name, picture, sub } = props.user;
    const { navpath } = props;
    const Navigate = useNavigate();

    const style = {
        maxWidth: "40px", 
        maxHeight: "40px",
        border: "1px solid darkgrey",
        borderRadius: "20px"
    }
        

    return (
        <div>
            <div style={{display: "inline-block", width: "700px",  textAlign: "left"}}>
                {console.log("Navpath: ", navpath)}
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
                <img style={style} alt="User photo" src={picture} />
                <button onClick={() => Navigate("/user/" + sub)}>Edit User</button>
            </div>
        </div>
        
    )
}

export default UserBar;