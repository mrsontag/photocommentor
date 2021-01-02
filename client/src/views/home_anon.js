import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import Button from "@material-ui/core/Button";
import GalleryTile from './gallerytile';

const HomeAnon = props => {
    const [ galleries, setGalleries ] = useState([]);
    const Navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        fetch("http://localhost:8002/api/photos_anon/")
            .then(response =>  response.json())
            .then(res =>  { console.log(res);  setGalleries(res) } )
            .catch(err => console.log(err));
    },[]);
    
    return (
        <>
            <div>
                <h3>Welcome to PhotoComments</h3>
                <p>The following galleries have been set by their users to allow anonymous views and comments.  Please consider registering for an account.</p>
                <Button style={{margin: "5px" }} variant="contained" color="primary" type='button' onClick={() => loginWithRedirect()}>Register for an account.</Button>
            </div>
            { galleries.length && galleries.map((gallery) => {
                console.log(gallery.name);
                return <GalleryTile gallery={gallery} key={gallery._id} anon={true}/>
            })}
        </>
        
    )
    
}

export default HomeAnon;