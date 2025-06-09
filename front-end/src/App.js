import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskList, setData } from "./store/store";
import { fetchOrganizationList } from "./store/slices/organizationListSlice";
import AppRoutes from "./private/Common/AppRoutes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const selectedOrgId = useSelector(
    (state) => state.organizationData.selectedOrgId
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(setData(decodedToken.profile));
      dispatch(fetchOrganizationList());
      if (selectedOrgId) {
        localStorage.setItem("selectedOrgId", selectedOrgId);
        dispatch(fetchTaskList());
      }
    }
  }, [dispatch, token, selectedOrgId]);

  return <AppRoutes token={token} />;
}

export default App;
