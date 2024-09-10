/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import RootPrivate from './private/Root';
import Login from './private/Login';
import Register from './private/Register';
import { fetchTaskList, setData } from './store/store';
import './App.css';
// import CounterPage from './private/components/CounterPage';

function App() {
  // const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (currentTime > decodedToken.exp) {
        localStorage.removeItem('token');
      } else {
        dispatch(setData(decodedToken));
        dispatch(fetchTaskList());
      }
    }
  }, [dispatch]);
  return (
    // <>
    //   <CounterPage />
    // </>
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
