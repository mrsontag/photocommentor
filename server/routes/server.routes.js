const UserController = require("../controllers/user.controller");
const PhotoController = require("../controllers/photo.controller");
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
const checkScopes = jwtAuthz(['read:messages']);


module.exports = app => {
    app.get("/api/users/", checkJwt, UserController.findAllUsers);
    app.get("/api/users/:id", checkJwt, UserController.findOneSingleUser);
    app.put("/api/users/update/:id", checkJwt, UserController.updateExistingUser);
    app.post("/api/users/new", checkJwt, UserController.createNewUser);
    app.delete("/api/users/delete/:id", checkJwt, UserController.deleteAnExistingUser);

    app.get("/api/photos/", checkJwt, PhotoController.findAllPhotos);
    app.get("/api/photos/:id", checkJwt, PhotoController.findOneSinglePhoto);
    app.post("/api/photos/update/:id", checkJwt, PhotoController.updateExistingPhoto);
    app.post("/api/photos/add/:togallery", checkJwt, PhotoController.addPhotoToGallery);
    app.post("/api/gallery/new", checkJwt, PhotoController.createNewGallery);
    app.post("/api/gallery/update/:id", checkJwt, PhotoController.updateExistingGallery);
    app.delete("/api/photos/delete/:id", checkJwt, PhotoController.deleteAnExistingPhoto);

    app.get("/api/photos/owner/:id", checkJwt, PhotoController.findAllPhotosByOwnerID);
    app.get("/api/photos/user/:id", checkJwt, PhotoController.findAllPhotosByUserID);
    app.get("/api/photos/gallery/:id", checkJwt, PhotoController.findAllPhotosByGalleryID);
};