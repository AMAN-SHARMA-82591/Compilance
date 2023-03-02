import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom'
import Login from './Login';
import Register from './Register';

function Root() {

    return (
        <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
        </Switch>
    )
}

export default Root