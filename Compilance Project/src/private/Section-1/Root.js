import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Community from './Community'
import Settings from './Settings'
import Upload from './Upload'
import People from './People'
import MainMenu from './MainMenu'

function Root() {
  return (
    <div>
      <MainMenu />
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/community" component={Community}></Route>
        <Route exact path="/people" component={People}></Route>
        <Route exact path="/publish" component={Upload}></Route>
        <Route exact path="/settings" component={Settings}></Route>
      </Switch>
    </div>
  )
}

export default Root
