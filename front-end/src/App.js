/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Navigate, Route } from "react-router";
import RootPrivate from "./private/Root";
import Login from "./private/Login";
import Register from "./private/Register";
import { fetchTaskList, setData } from "./store/store";
import IndexPeople from "./private/components/people/Index";
import IndexHome from "./private/components/home/Index";
import IndexTasks from "./private/components/tasks/Index";
import IndexOrganization from "./private/components/organization/Index";
import PeopleDetails from "./private/components/people/common/PeopleDetails";
import "./App.css";
import OrganizationDetails from "./private/components/organization/common/OrganizationDetails";
import { authAdminRole } from "./private/Common/Constants";
import { ToastContainer } from "react-toastify";
// import CounterPage from './private/components/CounterPage';

function App() {
  // const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state) => state.basicInformation?.data?.profile || null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (currentTime > decodedToken.exp) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        dispatch(setData(decodedToken));
        dispatch(fetchTaskList());
      }
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        {!localStorage.getItem("token") ? (
          <>
            <Route path="/*" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="/" element={<RootPrivate />}>
            {profileData && authAdminRole.includes(profileData.role) ? (
              <>
                <Route path="/organization" element={<IndexOrganization />} />
                <Route
                  path="/"
                  element={<Navigate replace to="/organization" />}
                />
              </>
            ) : (
              <Route path="/" element={<Navigate replace to="/home" />} />
            )}
            <Route path="/home" element={<IndexHome />} />
            <Route path="/tasks" element={<IndexTasks />} />
            <Route path="/people" element={<IndexPeople />} />
            <Route path="/people/:id" element={<PeopleDetails />} />
            <Route path="/organization/:id" element={<OrganizationDetails />} />
            {/* <Route path='/community' element={<IndexCommunity />}></Route> */}
            {/* <Route path='/Profile' element={<IndexProfile />}></Route> */}
          </Route>
        )}
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        // theme={"dark"}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default App;
