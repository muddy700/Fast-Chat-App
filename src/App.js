import {React, useEffect, useState} from 'react'
import './App.css';
// import {Button} from '@material-ui/core';
import Login from './pages/loginPage.js'
import {Home } from './pages/homePage';

const App = () => {

  const [render, setRender] = useState(1)
  const [currentUser, setCurrentUser] = useState('')

  const loginPage = <Login setCurrentUser={setCurrentUser} setRender={setRender} />
  const homePage = <Home username={currentUser} />

  const components = {
    1 : loginPage,
    2 : homePage
  }

  return (
    <div> {components[render]} </div>
  );
}

export default App;
