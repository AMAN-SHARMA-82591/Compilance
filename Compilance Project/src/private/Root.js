import React, { } from 'react';
import { Switch, Route } from 'react-router-dom'
import IndexHome from './components/home/Index';
import IndexPeople from './components/people/Index';
import IndexCommunity from './components/community/Index';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';

function Root() {
    return (
        <>
            <TopBar />
            <LeftBar />
            <div style={{ margin: '75px 0 0 83px' }}>
                <Switch>
                    <Route exact path="/home" component={IndexHome}></Route>
                    <Route exact path="/people" component={IndexPeople}></Route>
                    <Route exact path="/community" component={IndexCommunity}></Route>
                </Switch>
            </div>
        </>
    )
}

export default Root