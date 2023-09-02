import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import RootSection1 from './Section-1/Root';
import RootSection2 from './Section-2/Root';
import TopBar from './TopBar';
import LeftBar from './LeftBar';

function Root() {
    return (
        <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/dashboard" render={() =>
                <>
                    <TopBar />
                    <LeftBar />
                    <div className="App">
                        <RootSection1 />
                        <RootSection2 />
                    </div>
                </>
            }></Route>
        </Switch>
    )
}

export default Root