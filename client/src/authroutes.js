import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './views/login';
import { Router } from "@reach/router";
import Galleries from './views/galleries';
import Gallery from "./views/gallery";
import PhotoPage from "./Components/Details";

const AuthRoutes = props => {
    const { isAuthenticated, isLoading } = useAuth0();
    
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
            <Router>
                <Galleries path="/loggedin"/>
                <Gallery path="/gallery/new" isnew={true} />
                <Gallery path="/gallery/:id" />
                <PhotoPage path="/Detail/new/:togallery" isnew={true}/>
                <PhotoPage path="/Detail/:id" />
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