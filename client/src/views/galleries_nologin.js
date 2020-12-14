import {  navigate } from '@reach/router'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';

const FetchGalleries = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/photos/owner/123")
        //console.log(response.json())
        return response.json();
            //setGalleries(res.json()))
    } catch (err) {
        console.log(err);
    }
}
const GalleriesNoLogin = (props) => {
    const [ galleries, setGalleries ] = useState([]);
    const user = { name: "No login"}
    //const Navigate = useNavigate();
    
    useEffect(() => {
        FetchGalleries()
            .then(res => setGalleries(res));
    });

    return (
        <div className="Main" style={{ width: "auto" }}>
            <h1 className="UserName">{user.name}</h1>
            <Button onClick={navigate.bind(this, '/gallery/new')}>Add gallery!</Button>
            <CardDeck>
                {galleries && galleries.map(gallery => (
                    <Card key={gallery._id}>
                        <Card.Img variant="top" src={gallery.photo[0] && gallery.photo[0].path} />
                        <Card.Title>{gallery.gallery_name}</Card.Title>
                        <Card.Body>
                            <Card.Title>{gallery.title}</Card.Title>
                            <p>Photos: {gallery.photo.length}</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={navigate.bind(this, '/gallery/' + gallery._id)}>View Gallery</Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardDeck>
        </div>
    )
}

export default GalleriesNoLogin;