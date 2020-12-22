import React, { useState, useEffect, useRef } from 'react';
import styles from './newphotopage.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';


const NewPhotoPage = props => {
    const { isLoading, getAccessTokenSilently } = useAuth0();
    const { togallery }  = props;
    const [ photo, setPhoto ] = useState({});
    
    const Navigate = useNavigate();

    useEffect(() => {
        setPhoto( {gallery_id: togallery} );
        console.log("Ran use effect");
    },[isLoading]);

    const savePhoto = () => {
        auth0SecureAPI(getAccessTokenSilently, "photos/add/" + togallery, photo)
        .then(res => {
                console.log(res);
                Navigate("/photos/" + res.photo[res.photo.length - 1]._id);
            })
        .catch(err => console.log(err));
    }

    
    return(
        <div className={styles.container}>
            <img src={photo.path} alt="User submitted with comments" />
            <button onClick={savePhoto}>Save</button>
            <form className={ styles.floating}>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
            </form>
        </div>
    )
}

export default NewPhotoPage;