import React, { useEffect, createContext,useReducer,useContext } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup"; 
import UserProfile from "./components/screens/UserProfile";
import { BrowserRouter, Switch, Route, Link,useHistory } from "react-router-dom";
import CretePost from "./components/screens/CreatePost";
import { reducer, initialState } from './reducers/userReducer'
import "./App.css";


//Creating context
export var UserContext = createContext();

var Routing = () => {

  var history=useHistory()
  var {state,dispatch}=useContext(UserContext)
  useEffect(()=>
  {
    var user=JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user)
      {
        console.log("App",user)
        dispatch({type:"USER",payload:user})
        history.push('/')
      }
      else{
        history.push('/signin')
      }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/create">
        <CretePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>
  );
};

function App() {
  var [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
