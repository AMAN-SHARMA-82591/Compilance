/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import RootPrivate from './private/Root';

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
          <Route component={RootPrivate} />
        </>
      )}
      <Redirect exact from='/' to='/dashboard'></Redirect>
      <Route component={RootPrivate} />
    </Switch>
  )
}

export default App;
