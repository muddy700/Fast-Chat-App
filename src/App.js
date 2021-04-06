import {React, useState} from 'react'
import './App.css';
import Login from './pages/loginPage.js'
import {Home } from './pages/homePage';

const App = () => {

  const [render, setRender] = useState(1)
  const [currentUser, setCurrentUser] = useState('No Logged User')

  const loginPage = <Login setCurrentUser={setCurrentUser} setRender={setRender} />
  const homePage = <Home username={currentUser} setCurrentUser={setCurrentUser} setRender={setRender}/>

  const components = {
    1 : loginPage,
    2 : homePage
  }

  return (
    <div className="main-container"> {components[render]} </div>
  );
}

export default App;
