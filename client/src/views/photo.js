import { useNavigate } from '@reach/router';
import React from 'react';
import styles from './photo.module.css';



const Photo = props => {
    const { path, _id, ratings, comments } = props.photo;
    const { anon } = props;
    const Navigate = useNavigate();
    
    const avgrating = ratings.length ? ratings.reduce((total, current) => total + current.rating, 0) / (ratings.length) : 0;

    return (
        <div className={styles.small} onClick={() => Navigate(`/photos${ anon ? "_anon" : ""}/` + _id)}>
            <img src={path} alt="Comment-tagged"/>
            <h5>{ratings.length ? `${ratings.length} Rating(s), average ${avgrating}` : "No ratings"}</h5>
            <h5>{comments.length ? comments.length + " Comments" : "No comments"}</h5>
        </div>
    )
}

export default Photo;
