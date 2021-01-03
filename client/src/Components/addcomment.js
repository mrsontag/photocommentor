import React, { useState } from 'react';
import styles from './addcomment.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from '../views/auth0secureapi';
import Target from './target';

const AddComment = props => {
    const { photo, setPhoto, commentloc, setCommentLoc, setActiveComment, anon } = props;
    const { user, getAccessTokenSilently } = useAuth0();
    const [ textvalue, setTextValue ] = useState("Enter text here . . . ")
    const { xloc, yloc, xpct, ypct, diam, diampct } = commentloc ?? {};
    const id = photo._id;

    let comment_user;
    if (anon) {
        comment_user = {
            user_id: "none",
            user_name: "anonymous"
        }
    } else {
        comment_user = {
            user_id: user.sub,
            user_name: user.name
        }
    }
    const saveComment = (comment) => {
        let temp_photo;
        if(photo.comments) {
        temp_photo = {...photo, 
            comments: [
                ...photo.comments, 
                {
                    user_id: comment_user.user_id,
                    user_name: comment_user.user_name,
                    x: xpct,
                    y: ypct,
                    diam: diampct,
                    comment: textvalue
                }
            ] };
        } else {
            temp_photo = {...photo, 
                comments: [
                    {
                        user_id: comment_user.user_id,
                        user_name: comment_user.user_name,
                        x: xpct,
                        y: ypct,
                        diam: diampct,
                        comment: textvalue
                    }
                ] };
        }
        setPhoto(temp_photo);
        
        if (anon) {
            console.log(temp_photo);
            fetch("http://localhost:8002/api/photos_anon/update/" + photo._id, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(temp_photo)})
            .then(res => setPhoto(res.photo.find((photo) => photo._id === id)))
            .catch(err => console.log(err));
        } else {
            auth0SecureAPI(getAccessTokenSilently, "photos/update/" + photo._id, temp_photo)
            .then(res => setPhoto(res.photo.find((photo) => photo._id === id)))
            .catch(err => console.log(err));
        }
        setCommentLoc(null);
        setTextValue("Enter text here . . . ");
        setActiveComment(null);
    }
    
    return (
        <>
            <Target xloc={xloc} yloc={yloc} diam={diam} active={true} hidden={commentloc===null}/>
            <div className={commentloc ?  styles.addcomment : styles.hidden } 
                style={commentloc ? 
                    { 
                        position: "absolute",
                        top: yloc + diam / 2 + 10,
                        left: Math.max(xloc - 300,0)
                    } : 
                    null }
                >
                
                <form name="AddComment">
                    <textarea rows="4" cols="75" name="comment" value={textvalue} onChange={(e)=>setTextValue(e.target.value)}></textarea>
                    <button type="button" onClick={saveComment}>Submit</button>
                    <button type="button" onClick={() => { setTextValue("Enter text here . . . "); setCommentLoc(null);;}}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddComment;
