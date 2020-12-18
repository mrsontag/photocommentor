import React, { useState, useEffect, useRef } from 'react';
import styles from './photopage.module.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import AddComment from '../Components/addcomment';
import Target from "../Components/target";


const PhotoPage = props => {
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const { id } = props;
    const [value, setValue] = useState(0)
    const [photo, setPhoto] = useState({});
    const [gallery, setGallery] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [commentloc, setCommentLoc] = useState(null);
    const [activecomment, setActiveComment] = useState(null);
    const [diam, setDiam] = useState(10);
    const [selection, setSelection] = useState({ xloc: 0, yloc: 0, diam: 10, hidden: true });

    const image = useRef(null);
    const imgcontainer = useRef(null);
    const Navigate = useNavigate();
    
    let imagebox;

    useEffect(() => {
        if (!isLoading) {
            auth0SecureAPI(getAccessTokenSilently, "photos/" + id)
                .then(res => {
                    console.log(res.photo[0])
                    setPhoto({ ...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id });
                    setGallery( {gallery_name: res.gallery_name, gallery_id: res._id})
                    for (const rating of res.photo[0].ratings) {
                        console.log("looking at", rating.user_id);
                        if (rating.user_id === user.sub) {
                            setValue(rating.rating);
                            break;
                        }
                    }
                })
                .catch(err => console.log(err));
                
        }
        console.log("Ran use effect");
    }, [isLoading]);

    const clickEdit = () => {
        if (editMode) {
            auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, photo)
                .then(res => {
                    setPhoto({...res.photo[res.photo.length - 1]});
                    setGallery({gallery_name: res.gallery_name, gallery_id: res._id})
                })
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }

    const mouseUp = (event) => {
        if (!selection.hidden) {
            imagebox = (image.current.getBoundingClientRect());
            let xpct = Math.round((selection.xloc - imagebox.left) / imagebox.width * 100);
            let ypct = Math.round((selection.yloc - imagebox.top) / imagebox.height * 100);
            let diampct = diam / imagebox.width * 100;
            setCommentLoc({
                ...selection,
                xpct: xpct,
                ypct: ypct,
                diam: diam,
                diampct: diampct
            })
            setActiveComment(null);
            setSelection({ xloc: 0, yloc: 0, diam: 10, hidden: true });
        }
    }

    const mouseMove = (event) => {
        imagebox = (image.current.getBoundingClientRect());
        if (!selection.hidden) {
            event.preventDefault();
            const selectiondiam = Math.max(10, 2 * Math.sqrt(((event.clientX - imagebox.left) - selection.xloc) ** 2 + ((event.clientY - imagebox.top) - selection.yloc) ** 2));
            setDiam(selectiondiam);
        }
    }

    const mouseDown = (event) => {
        imagebox = (image.current.getBoundingClientRect());
        const new_selection = {
            xloc: event.clientX - imagebox.left,
            yloc: event.clientY - imagebox.top,
            diam: diam,
            hidden: false
        };
        setSelection(new_selection);
        setDiam(10);
        setActiveComment(null);
    }

    const setMyRating = (newrating) => {
        let found = false;
        let temp_photo
        if (!photo.ratings || !photo.ratings.length) {
            temp_photo = {
                ...photo,
                ratings: [{
                    rating: newrating,
                    user_id: user.sub,
                    user_name: user.name
                }]
            }
        } else {
            temp_photo = {
                ...photo,
                ratings: photo.ratings.map(rating => {
                    if (rating.user_id === user.sub) {
                        found = true;
                        return {
                            ...rating,
                            rating: newrating,
                            user_name: user.name
                        }
                    } else {
                        return rating;
                    }
                })
            }
            if (!found) {
                temp_photo = {
                    ...temp_photo,
                    ratings: [...temp_photo.ratings, {
                        rating: newrating,
                        user_id: user.sub,
                        user_name: user.name
                    }]
                }
            }
        }
        setPhoto(temp_photo);
        auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, temp_photo)
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <div ref={imgcontainer} id="img_container" name="imagecontainer" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                <Target key="selector" xloc={selection.xloc} yloc={selection.yloc} diam={diam} active={true} hidden={selection.hidden} />
                <img onLoad={() => setActiveComment(27)} src={photo.path} ref={image} alt="User submitted with comments" />
                {photo.comments && photo.comments.map((comment, index) => {
                    imagebox = (image.current.getBoundingClientRect());
                    const xloc = (comment.x / 100 * imagebox.width) + imagebox.left;
                    const yloc = (comment.y / 100 * imagebox.height) + imagebox.top;
                    console.log(comment.x, comment.y, comment.diam)
                    const showdiam = (comment.diam / 100 * imagebox.width);
                    const clickTarget = () => {
                        if (activecomment === comment._id) {
                            setActiveComment(null)
                        } else {
                            setActiveComment(comment._id)
                        }
                    }
                    return (
                        <Target key={comment._id} onClick={(event) => {
                            event.stopPropagation();
                            clickTarget();
                        }} xloc={xloc} yloc={yloc} diam={showdiam} active={(activecomment === comment._id)} hidden={false} text={index + 1} />
                    )
                })}
            </div>
            {//NEED TO RE-WRITE 
            }
            <div className="star">
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            setMyRating(newValue);
                        }}
                    />
                </Box>
            </div>
            {//END RE-WRITE 
            }
            <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
            <form className={!editMode ? " " + styles.invisible : styles.floating}>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto({ ...photo, path: e.target.value })} />
            </form>
            <AddComment comment={activecomment} setActiveComment={setActiveComment} commentloc={commentloc} setCommentLoc={setCommentLoc} photo={photo} setPhoto={setPhoto} id={id} />
            <h5>Ratings</h5>
            { photo.ratings && photo.ratings.map((rating) => {
                return (
                    <p>{rating.user_name} - {rating.rating}</p>
                )
            })}
            <h5>Comments</h5>
            { photo.comments && photo.comments.map((comment, index) => {
                const clickComment = () => {
                    if (activecomment === comment._id) {
                        setActiveComment(null)
                    } else {
                        setActiveComment(comment._id)
                    }
                }
                return (
                    <>
                        <p onClick={clickComment} className={(activecomment === comment._id) ? styles.active : styles.regular}>{`${index + 1}: ${comment.user_name} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
                    </>
                )
            })}
            <button onClick={() => Navigate("/gallery/" + photo.gallery_id)}>Go back to gallery!</button>
        </div>
    )
}

export default PhotoPage;