import React, { useState, useEffect } from 'react';
//import Axios from 'axios';
import styles from './gallery.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import Photo from './photo';
import { useNavigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const Gallery = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id, anon }  = props;
    const [ gallery, setGallery ] = useState({});
    const photoslist = gallery.photo ?? [];
    const [editMode, setEditMode ] = useState(false);
    const Navigate = useNavigate();
    const { setNavPath } = props;

    useEffect(() => {
        if(!anon ) {
            auth0SecureAPI(getAccessTokenSilently, "photos/gallery/" + id)
            .then(res => {
                setGallery(res[0]);
                setNavPath( [ 
                    { name: "Home", link: "/home/" + user.sub },
                    { name: res[0].gallery_name, link: "/gallery/" + id }
                ])
            })
            .catch(err => console.log(err));               
        } else {
            fetch("http://localhost:8002/api/photos/gallery_anon/" + id)
            .then(response =>  response.json())
            .then(res =>  {
                setGallery(res[0]);
                setNavPath( [ 
                    { name: "Home", link: "/anon/" },
                    { name: res[0].gallery_name, link: "/gallery_anon/" + id }
                ])
                } )
            .catch(err => console.log(err));
        }
    },[isLoading]);

    const saveGallery = () => {
        const gallery_update = {
            gallery_name: gallery.gallery_name,
            authorized_user_ids: gallery.authorized_user_ids,
            owner_id: gallery.owner_id,
            show_anonymous: gallery.show_anonymous
        }
        auth0SecureAPI(getAccessTokenSilently, "gallery/update/" + id, gallery_update)
            .catch(err => console.log(err));
        setEditMode(false);
    }
    
    const clickedEdit = () => {
        if(gallery.owner_id === user.sub) {
            setEditMode(true);
        }
    }
    //add control to say "all users" vs "specific users"
    //add control to add photos
    return (
        <div className={styles.container}>
            <h2>{gallery.gallery_name}</h2>
            <Button variant="contained" color="primary" name="editformgo" style={ ((user ? user.sub : null) === gallery.owner_id && !editMode) ? { } : { display: "none" } } onClick={clickedEdit}>Edit Gallery</Button>
            <Button variant="contained" color="primary" name="backhome" style={ anon ? { } : { display: "none" } } onClick={() => Navigate(`/anon/`)}>Go back to the gallery list!</Button>
            <div className={ editMode ? styles.visible : styles.invisible }>
                <form className={ styles.floating }>
                    <input type="text" name="name" value={gallery.gallery_name} onChange={(e) => setGallery({...gallery, gallery_name: e.target.value})}/>
                    <Checkbox checked={ gallery.show_anonymous ?? false } name="show_anonymous" onChange={(e) => { console.log(e.target.checked); setGallery({...gallery, show_anonymous: e.target.checked})}}/>
                    <Button style={{margin: "5px" }} variant="contained" color="primary" className={ editMode ? styles.visible : styles.invisible } type="button" name="save" onClick={saveGallery}>Save</Button>
                    <div>
                        <Button style={{margin: "5px" }} variant="contained" color="primary" onClick={(e)=> {e.preventDefault(); Navigate("/photos/new/" + gallery._id)}}>Add new photo.</Button>
                        <Button style={{margin: "5px" }} variant="contained" color="primary" name="editformcancel" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                </form>
                
            </div>
            <div className={styles.topalign}>
                { photoslist && photoslist.map((photo) => {
                    return(
                        <Photo key={photo._id} photo={photo} anon={anon} />
                    )
                })}
            </div>
        </div>
    )
} 

export default Gallery;