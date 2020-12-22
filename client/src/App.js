import './App.css';
import { Router } from '@reach/router'
import Login from './views/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './authroutes';
import GalleriesNoLogin from "./views/galleries_nologin";

function App() {
    return (
        <div className="App">
            {/*<div id="background">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600">
                    <path fill="#ffffff" fill-opacity="1" d="M0,192L48,170.7C96,149,192,107,288,74.7C384,43,480,21,576,42.7C672,64,768,128,864,176C960,224,1056,256,1152,272C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>*/}   
            <div className="container">
                <Router>
                    <Login path="/" />
                    <GalleriesNoLogin path="/nologin/" />
                    <AuthRoutes path="/*" />
                </Router>
            </div>
        </div>
    );
}

export default App;
