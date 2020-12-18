import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './views/login';
import { Router } from "@reach/router";
import NewGallery from "./views/newgallery";
import NewPhotoPage from "./views/newphotopage";
import Galleries from './views/galleries';
import Gallery from "./views/gallery";
import PhotoPage from "./views/photopage";
import NavBar from "./views/navbar";

const AuthRoutes = props => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ navpath, setNavPath ] = useState([])

    if(isLoading) {
        return (
            <div>Loading . . . </div>
        )
    }

    if(!isAuthenticated) {
        return(
            <div>
                <h1>Not Logged In</h1>
                <p>You must be logged in to perform this action.</p>
                <Login />
            </div>
        )
    }

    return (
        <>
            <NavBar user={user} navpath={navpath}/>
            <Router>
                <Galleries path="/loggedin" setNavPath={ setNavPath }/>
                <NewGallery path="/gallery/new" />
                <Gallery path="/gallery/:id" setNavPath={ setNavPath }/>
                <NewPhotoPage path="/photos/new/:togallery" />
                <PhotoPage path="/photos/:id" setNavPath={ setNavPath }/>
            </Router>
        </>
    )
}

export default AuthRoutes;

/*
<BasicPhotoPage path="/photos/new/:togallery" isnew={true} />
                <BasicPhotoPage path="/photos/:id" isnew={false} />
                <BasicGallery path="/gallery/new" isnew={true} />
                <BasicGallery path="/gallery/:id"  isnew={false} />
                */