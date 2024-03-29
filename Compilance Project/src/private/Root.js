import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import IndexHome from './components/home/Index';
import IndexPeople from './components/people/Index';
import IndexCommunity from './components/community/Index';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import IndexProfile from './components/profile/Index';
import IndexTasks from './components/tasks/Index';
import { useDispatch } from 'react-redux';
import { fetchTaskList } from '../store/store';


function Root() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTaskList());
    }, [dispatch]);
    return (
        <>
            <TopBar />
            <LeftBar />
            <div style={{ margin: '75px 0 0 83px' }}>
                <Switch>
                    <Route exact path="/home" component={IndexHome}></Route>
                    <Route exact path="/people" component={IndexPeople}></Route>
                    <Route exact path="/community" component={IndexCommunity}></Route>
                    <Route exact path="/Profile" component={IndexProfile}></Route>
                    <Route exact path="/tasks" component={IndexTasks}></Route>
                </Switch>
            </div>
        </>
    )
}

export default Root