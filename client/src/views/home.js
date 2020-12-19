import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import styles from "./home.module.css";

const Home = props => {
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const { setNavPath, newlogin } = props;
    const [galleries, setGalleries] = useState([]);
    const Navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        let temp_galleries = galleries;
        auth0SecureAPI(getAccessTokenSilently, "photos/owner/" + user.sub)
            .then(res => setGalleries(res) )
            .catch(err => console.log(err));
        setNavPath( [
            { name:"Home",
                link: "/home/" + user.sub
            }
        ])
    },[]);

    if(newlogin) {
        const user_update = { 
            name: user.name,
            email: user.email,
            auth0_id: user.sub,
        }
        auth0SecureAPI(getAccessTokenSilently, "users/addorupdate/" + user.sub, user_update)
        .then(res => Navigate("/home/" + user.sub))
        .catch(err => console.log(err));
        return (
            <div>Something went wrong.</div>
        )
    }

    

    
    return (
        <div>
            <div>
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

export default Home;