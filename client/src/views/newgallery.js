import React, { useState, useEffect } from 'react';
import styles from './gallery.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import Photo from './photo';
import { useNavigate } from '@reach/router';


const Gallery = props => {
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const [ gallery, setGallery ] = useState({});
    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading ) {
            setGallery({gallery_name:"New gallery . . . ", authorized_user_ids: "List authorized users . . . "});
        }
    },[isLoading]);

    const saveGallery = () => {
        const gallery_update = {
            gallery_name: gallery.gallery_name,
            authorized_user_ids: gallery.authorized_user_ids,
            owner_id: user.sub
        }
        auth0SecureAPI(getAccessTokenSilently, "gallery/new", gallery_update)
        .then(res => {
            Navigate("/gallery/" + res._id);
        })
        .catch(err => console.log(err));
    }
    return (
        <div className={styles.container}>
            <button onClick={()=> Navigate("/loggedin/")}>Back to gallery list!</button>
            <h2>Please enter information for your new gallery.</h2>
            <form className={ styles.floating }>
                <input type="text" name="name" value={gallery.gallery_name} onChange={(e) => setGallery({...gallery, gallery_name: e.target.value})}/>
                <label> Authorized Users (separate by commas): </label>
                <input type="text" name="name" value={gallery.authorized_user_ids} onChange={(e) => setGallery({...gallery, authorized_user_ids: e.target.value.toString().split(",")})}/>
                <button type="button" name="save" onClick={saveGallery}>Save</button>
            </form>
        </div>
    )
} 

export default Gallery;