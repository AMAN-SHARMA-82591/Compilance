import React from 'react'
import MainMenu from './MainMenu'
import WeekTable from './WeekTable'
import {Redirect,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Community from './Community'
import Settings from './Settings'
import Upload from './Upload'
import People from './People'



function Root() {
    return (
        <div className="section-1-container">
            <div>
                <WeekTable />
                <MainMenu />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/community" component={Community}></Route>
                    <Route exact path="/people" component={People}></Route>
                    <Route exact path="/publish" component={Upload}></Route>
                    <Route exact path="/settings" component={Settings}></Route>
                    <Redirect to="/"></Redirect>
                </Switch>
            </div>
        </div>
    )
}

export default Root
