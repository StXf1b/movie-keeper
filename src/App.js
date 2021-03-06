import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from "./components/Navbar"
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Movies from "./pages/Movies/Movies";
import All from "./pages/All/All";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { useAuthContext } from './hooks/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
      <div className="container">
        <BrowserRouter>
        <Navbar />  
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/create">
              {user && <Create />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
            <Route exact path="/signup">
              {!user && <Signup />}
              {user && <Redirect to="/" />}
            </Route>
            <Route exact path="/movies/:id">
              {user && <Movies />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/all">
              {user && <All />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/profile/:id">
              {user && <Profile />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/settings/:id">
              {user && <Settings />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="*">
              {user && <Redirect to="/" />}
              {!user && <Redirect to="/login" />}
            </Route>
            
          </Switch>
        </BrowserRouter>
      </div>
      )}
    </div>
  );
}

export default App;
