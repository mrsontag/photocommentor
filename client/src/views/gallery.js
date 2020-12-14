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
    const { isnew, setIsNew } = useState(props.isnew);
    const [ gallery, setGallery ] = useState({});
    const photoslist = gallery.photo ?? [];
    const [editMode, setEditMode ] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading ) {
            if(isnew) {
                setGallery({gallery_name:"New gallery . . . ", authorized_user_ids: "List authorized users . . . "});
                setEditMode(true);
            } else {
                auth0SecureAPI(getAccessTokenSilently, "photos/gallery/" + id)
                    .then(res => setGallery(res[0]))
                    .catch(err => console.log(err));   
            }
        }
    },[isLoading]);

    const clickEdit = () => {
        if(editMode) {
            let postpath = isnew ? "new" : "update/" + id
            const gallery_update = {
                gallery_name: gallery.gallery_name,
                authorized_user_ids: gallery.authorized_user_ids,
                owner_id: isnew ? "123" : gallery.owner_id
            }
            console.log(gallery_update);
            auth0SecureAPI(getAccessTokenSilently, "gallery/" + postpath, gallery_update)
                .then(res => {
                    alert("Changes saved!");
                    setIsNew(false);
                })
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }
    return ( isAuthenticated &&
        <div className={styles.container}>
            <h1>Welcome {user.name}</h1>
            <button onClick={()=> Navigate("/loggedin/")}>Back to gallery list!</button>
            <h2>{gallery.gallery_name}</h2>
            <p>Authorized Users: {gallery.authorized_user_ids}</p>
            <button type="button" name="editformgo" onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
            
            <form className={ editMode ? styles.floating : styles.invisible }>
                <input type="text" name="name" value={gallery.gallery_name} onChange={(e) => setGallery({...gallery, gallery_name: e.target.value})}/>
                <label> Authorized Users (separate by commas): </label>
                <input type="text" name="name" value={gallery.authorized_user_ids} onChange={(e) => setGallery({...gallery, authorized_user_ids: e.target.value.toString().split(",")})}/>
                <button type="button" name="editformcancel" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
            <button onClick={()=> Navigate("/photos/new/" + gallery._id)}>Add new photo.</button>
            { photoslist && photoslist.map((photo) => {
                return(
                    <Photo photo={photo} />
                )
                })}
        </div>
    )
} 

export default Gallery;