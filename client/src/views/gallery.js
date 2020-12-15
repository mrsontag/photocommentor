import React, { useState, useEffect } from 'react';
//import Axios from 'axios';
import styles from './gallery.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import Photo from './photo';
import { useNavigate } from '@reach/router';


const Gallery = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id }  = props;
    const [ gallery, setGallery ] = useState({});
    const photoslist = gallery.photo ?? [];
    const [editMode, setEditMode ] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading ) {
            auth0SecureAPI(getAccessTokenSilently, "photos/gallery/" + id)
            .then(res => setGallery(res[0]))
            .catch(err => console.log(err));   
        }
    },[isLoading]);

    const saveGallery = () => {
        const gallery_update = {
            gallery_name: gallery.gallery_name,
            authorized_user_ids: gallery.authorized_user_ids,
            owner_id: gallery.owner_id
        }
        auth0SecureAPI(getAccessTokenSilently, "gallery/update/" + id, gallery_update)
            .catch(err => console.log(err));
        setEditMode(false);
    }
    return (
        <div className={styles.container}>
            <div>
                <h1>Welcome {user.name}</h1>
                <button onClick={()=> Navigate("/loggedin/")}>Back to gallery list!</button>
                <h2>{gallery.gallery_name}</h2>
                <p>Authorized Users: {gallery.authorized_user_ids}</p>
                <button className={ editMode ? styles.invisible : styles.visible } type="button" name="editformgo" onClick={() => setEditMode(true)}>Edit</button>
                
                <form className={ editMode ? styles.floating : styles.invisible }>
                    <input type="text" name="name" value={gallery.gallery_name} onChange={(e) => setGallery({...gallery, gallery_name: e.target.value})}/>
                    <label> Authorized Users (separate by commas): </label>
                    <input type="text" name="name" value={gallery.authorized_user_ids} onChange={(e) => setGallery({...gallery, authorized_user_ids: e.target.value.toString().split(",")})}/>
                    <button className={ editMode ? styles.visible : styles.invisible } type="button" name="save" onClick={saveGallery}>Edit</button>
                    <button type="button" name="editformcancel" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
                <button onClick={()=> Navigate("/photos/new/" + gallery._id)}>Add new photo.</button>
            
            </div>
            <div className={styles.topalign}>
                { photoslist && photoslist.map((photo) => {
                    return(
                        <Photo photo={photo} />
                    )
                })}
            </div>
        </div>
    )
} 

export default Gallery;