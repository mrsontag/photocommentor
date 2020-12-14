import { useNavigate } from '@reach/router';
import React from 'react';
import styles from './photo.module.css';



const Photo = props => {
    const { path, _id, ratings, comments } = props.photo;
    const Navigate = useNavigate();
    
    return (
        <div className={styles.small} onClick={() => Navigate("/photos/" + _id)}>
            <img src={path} alt="Comment-tagged"/>
            <h5>Ratings</h5>
            { ratings && ratings.map((rating) => {
                return (
                    <p>{rating.user_id} - {rating.rating}</p>
                )
            })}
            <h5>Comments</h5>
            { comments && comments.map((comment) => {
                return (
                    <p>{`${comment.user_id} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
                )
            })}
        </div>
    )
}

export default Photo;
