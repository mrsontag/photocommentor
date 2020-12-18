import React, { useState, useEffect } from 'react';
//import LogOutButton from './logout';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import styles from "./galleries.module.css";

const Galleries = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [galleries, setGalleries] = useState([]);
    const Navigate = useNavigate();
    const { setNavPath } = props;

    
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

            setNavPath( [
                { name:user.name + " Galleries",
                    link: "/loggedin/"
                }
            ])
        }
    },[isLoading]);

    const runRetrieve = () => {
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
    }

    
    return (
        <div>
            <div>
                <button onClick={runRetrieve}>Run retrieve again!</button>
                <button name="addnewgallery" onClick={() => Navigate("/gallery/new")}>Add new gallery!</button>
            </div>
            { galleries && galleries.map((gallery) => {
                return (
                    <div className={styles.gallery} onClick={() => Navigate("/gallery/" + gallery._id)}>
                        <h2>{gallery.gallery_name}</h2>
                        <p>Photo Count: {gallery.photo.length}</p>
                        { gallery.photo.length && gallery.photo.map((photo, index) => {
                            if(index>4) { return };
                            return (
                                <img className={styles.thumbnail} alt="User submitted" src={photo.path} />
                            )
                            })
                        }
                    </div> )
            })}
        </div>
        
    )
    
}

export default Galleries;