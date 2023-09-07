import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Section-1/Home'
import Community from './community/Community'
import Settings from '../Section-1/Settings'
import People from './people/People'

function Root() {
  return (
    <Switch>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/community" component={Community}></Route>
      <Route exact path="/people" component={People}></Route>
      <Route exact path="/settings" component={Settings}></Route>
    </Switch>
  )
}

export default Root
