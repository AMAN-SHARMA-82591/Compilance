import React from 'react';
import { Routes, Route, Outlet } from 'react-router';
import IndexHome from './components/home/Index';
import IndexPeople from './components/people/Index';
import IndexCommunity from './components/community/Index';
import TopBar from './components/TopBar';
import LeftBar from './components/LeftBar';
import IndexProfile from './components/profile/Index';
import IndexTasks from './components/tasks/Index';
import PeopleDetails from './components/people/common/PeopleDetails';

function Root() {
    return (
        <>
            <TopBar />
            <LeftBar />
            <div style={{ margin: '60px 0 0 83px' }}>
                <Outlet />
                {/* <Routes> */}
                    {/* <Route index element={<IndexHome />}></Route> */}
                    {/* <Route path='/people' element={<IndexPeople />}></Route> */}
                    {/* <Route path='/people/:id' element={<PeopleDetails />}></Route> */}
                    {/* <Route path='/community' element={<IndexCommunity />}></Route> */}
                    {/* <Route path='/Profile' element={<IndexProfile />}></Route> */}
                    {/* <Route path='/tasks' element={<IndexTasks />}></Route> */}
                {/* </Routes> */}
            </div>
        </>
    )
}

export default Root