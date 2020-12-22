import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import styles from "./home.module.css";
import Button from "@material-ui/core/Button";

const GalleryTile = props => {
    const Navigate = useNavigate();
    const { gallery } = props;
    return (
        <div key={gallery._id} className={styles.gallery} onClick={() => Navigate("/gallery/" + gallery._id)}>
            <h2>{gallery.gallery_name}</h2>
            <p>Photo Count: {gallery.photo.length}</p>
            { gallery.photo.length && gallery.photo.map((photo, index) => {
                //if() { return };
                return index>4 ? null : (
                    <img className={styles.thumbnail} alt="User submitted" src={photo.path} />
                )
                })
            }
        </div>
    )
}

const Home = props => {
    const { user, getAccessTokenSilently } = useAuth0();
    const { setNavPath, newlogin } = props;
    const [galleries, setGalleries] = useState([]);
    const Navigate = useNavigate();
    
    useEffect(() => {
        auth0SecureAPI(getAccessTokenSilently, "photos/")
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
        <>
            <div>
                <h3 style={{display: "inline-block", marginRight: "40px"}} >My galleries:</h3>
                <Button style={{display: "inline-block"}} variant="contained" color="primary" name="addnewgallery" 
                    onClick={() => Navigate("/gallery/new")}>Add new gallery!</Button>
            </div>
            { galleries && galleries.filter(gallery => gallery.owner_id === user.sub).map((gallery) => {
                return <GalleryTile gallery={gallery} />
            })}
            <h3>Other galleries:</h3>
            { galleries && galleries.filter(gallery => gallery.owner_id !== user.sub).map((gallery) => {
                return <GalleryTile gallery={gallery} />
            })}
        </>
        
    )
    
}

export default Home;