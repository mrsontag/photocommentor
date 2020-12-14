import './App.css';
import {Router} from '@reach/router'
import Login from './views/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './authroutes';
import GalleriesNoLogin from "./views/galleries_nologin";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/"/>
        <GalleriesNoLogin path="/nologin/"/>
        <AuthRoutes path="/*" />
      </Router>
    </div>
  );
}

export default App;
