
import React from 'react';
import styles from "./gallerytile.module.css";
import { useNavigate } from '@reach/router';


const GalleryTile = props => {
    const Navigate = useNavigate();
    const { gallery, anon } = props;
    return (
        <div key={gallery._id} className={styles.gallery} onClick={() => Navigate(`/gallery${ anon ? "_anon" : "" }/` + gallery._id)}>
            <h2>{gallery.gallery_name}</h2>
            <p>Photo Count: {gallery.photo.length}</p>
            { gallery.photo.length && gallery.photo.map((photo, index) => {
                //only show six small thumbnails
                return index > 5 ? null : (
                    <img key={photo._id} className={styles.thumbnail} alt="User submitted" src={photo.path} />
                )
                })
            }
        </div>
    )
}

export default GalleryTile;