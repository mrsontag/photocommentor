import React, { useState, useEffect } from 'react';
//import LogOutButton from './logout';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';

const Galleries = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [galleries, setGalleries] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading) {
            console.log("Retrieving galleries!");
            let temp_galleries = galleries;
            auth0SecureAPI(getAccessTokenSilently, "photos/owner/" + user.sub)
                .then(res => { 
                    temp_galleries = res;
                    setGalleries(temp_galleries);
                    console.log("Galleries:", temp_galleries);
                })
                .catch(err => console.log(err));

            
        }
    },[isLoading]);

    const runRetrieve = () => {
        if(!isLoading) {
            console.log("Retrieving galleries!");
            let temp_galleries = galleries;
            auth0SecureAPI(getAccessTokenSilently, "photos/owner/123")
                .then(res => { 
                    temp_galleries = res;
                    setGalleries(temp_galleries);
                    console.log("Galleries:", temp_galleries);
                })
                .catch(err => console.log(err));

            
        }
    }

    
    return (
        <div>
            You ARE currently logged in!
            <h2>{user.name} - {user.user_id}</h2>\
            <p>{user.email}</p>
            {//<LogOutButton />
            }
            <button onClick={runRetrieve}>Run retrieve again!</button>
            <button name="addnewgallery" onClick={() => Navigate("/gallery/new")}>Add new gallery!</button>
            { galleries && galleries.map((gallery) => {
                return (
                    <div onClick={() => Navigate("/gallery/" + gallery._id)}>
                        <h2>{gallery.gallery_name}</h2>
                        <p>Photo Count: {gallery.photo.length}</p>
                    </div> )
            })}
        </div>
        
    )
    
}

export default Galleries;