import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { authAdminRole } from "../Common/Constants";
import RequireOrganization from "../Common/RequiredOrganization";
import { ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";

// Lazy loaded components
const RootPrivate = lazy(() => import("../Root.js"));
const Login = lazy(() => import("../Login.js"));
const Register = lazy(() => import("../Register"));
const IndexPeople = lazy(() => import("../components/people/Index"));
const IndexHome = lazy(() => import("../components/home/Index"));
const IndexTasks = lazy(() => import("../components/tasks/Index"));
const IndexOrganization = lazy(() =>
  import("../components/organization/Index")
);
const PeopleDetails = lazy(() =>
  import("../components/people/common/PeopleDetails")
);
const OrganizationDetails = lazy(() =>
  import("../components/organization/common/OrganizationDetails")
);
const NoPageFound = lazy(() => import("./NoPageFound"));

function AppRoutes({ token }) {
  const profileData = useSelector((state) => state.basicInformation?.profile);

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        {!token ? (
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
            <Route
              path="/home"
              element={
                <RequireOrganization>
                  <IndexHome />
                </RequireOrganization>
              }
            />
            <Route
              path="/tasks"
              element={
                <RequireOrganization>
                  <IndexTasks />
                </RequireOrganization>
              }
            />
            <Route
              path="/people"
              element={
                <RequireOrganization>
                  <IndexPeople />
                </RequireOrganization>
              }
            />
            <Route
              path="/people/:id"
              element={
                <RequireOrganization>
                  <PeopleDetails />
                </RequireOrganization>
              }
            />
            <Route
              path="/organization/:id"
              element={
                <RequireOrganization>
                  <OrganizationDetails />
                </RequireOrganization>
              }
            />
            <Route path="*" element={<NoPageFound />} />
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
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </Suspense>
  );
}

export default AppRoutes;
