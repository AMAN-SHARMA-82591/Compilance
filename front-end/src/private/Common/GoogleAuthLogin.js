import { useNavigate } from "react-router";
// import AuthContext from "../AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "./AxiosInstance";
import { toastError, toastSuccess } from "./ToastContainer";

export default function GoogleAuthLogin() {
  //   const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const { data, status } = await axiosInstance.post(
            "/auth/login/google",
            {
              idToken: credentialResponse.credential,
            }
          );
          if (data.success) {
            toastSuccess("Login successfull");
            localStorage.setItem("uid", data.uid);
            if (status === 200) {
              await navigate("/home");
            } else {
              await navigate("/organization");
            }
            window.location.reload();
          }
        } catch (error) {
          toastError(error?.response?.data?.msg ?? "Google login failed.");
          console.error(error);
        }
      }}
      onError={() => toastError("Login Failed.")}
      type="icon"
      shape="circle"
      theme="filled_blue"
      //   text="signin"
      // useOneTap
    />
  );
}
