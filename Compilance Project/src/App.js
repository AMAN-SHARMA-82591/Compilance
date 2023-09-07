/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import RootPrivate from './private/Root';
import Login from './private/Login';
import Register from './private/Register';

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    }
  }, [login]);
  return (
    <Switch>
      {!localStorage.getItem('token') && (
        <>
          <Redirect exact from="/" to='/login'></Redirect>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </>
      )}
      <Redirect exact from='/' to='/home'></Redirect>
      <Route component={RootPrivate} />
    </Switch>
  )
}

export default App;
