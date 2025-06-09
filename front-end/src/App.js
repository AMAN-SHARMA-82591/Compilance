import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedProfile, fetchTaskList } from "./store/store";
import { fetchOrganizationList } from "./store/slices/organizationListSlice";
import AppRoutes from "./private/Common/AppRoutes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const selectedOrgId = useSelector(
    (state) => state.organizationData.selectedOrgId
  );
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    if (userId) {
      dispatch(fetchLoggedProfile());
      dispatch(fetchOrganizationList());
      if (selectedOrgId) {
        localStorage.setItem("selectedOrgId", selectedOrgId);
        dispatch(fetchTaskList());
      }
    }
  }, [dispatch, userId, selectedOrgId]);

  return <AppRoutes userId={userId} />;
}

export default App;
