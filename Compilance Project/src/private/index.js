/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import './App.css';
import RootSection1 from './Section-1/Root';
import RootSection2 from './Section-2/Root';
import Overdue from './Section-1/Overdue'
import Upcoming from './Section-1/Upcoming'
import InProgress from './Section-1/InProgress'
import Total from './Section-1/Total'
import { Switch, Redirect, Route } from 'react-router-dom';

function Index() {
    return (
        <>
            <Switch>
                {/* <Route exact path="/overdue" component={Overdue}></Route>
            <Route exact path="/upcoming" component={Upcoming}></Route>
            <Route exact path="/inprogress" component={InProgress}></Route>
            <Route exact path="/total" component={Total}></Route>
            <Route exact render={()=>
              <div className="App">
                  <RootSection1 />
                  <RootSection2 />
              </div>
            }></Route> */}
                <Redirect exact from="/" to='/dashboard'></Redirect>

            </Switch>

        </>
    );
}

export default Index;
