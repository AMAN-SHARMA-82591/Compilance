import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Home from './Home2'
import People from './People2'
import Upload from './Upload2'
import Settings from './Settings2'
import Community from './Community2'
import '../App.css'
import LogInAdmin from './LogInAdmin'

function Root() {
    return (
        <div className="section-2">
            <LogInAdmin />
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/community" component={Community}></Route>
                <Route exact path="/people" component={People}></Route>
                <Route exact path="/publish" component={Upload}></Route>
                <Route exact path="/settings" component={Settings}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    )
}

export default Root
