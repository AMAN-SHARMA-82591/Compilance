import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Typography, Container, CircularProgress } from "@mui/material";
import { toastError, toastSuccess } from "./ToastContainer";

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const provider = urlParams.get("provider");
    const redirectUri = window.location.origin;

    if (code && provider) {
      let endpoint = "";
      if (provider === "github") {
        endpoint = "/auth/login/github";
      } else if (provider === "linkedin") {
        endpoint = "/auth/login/linkedin";
      } else {
        toastError("Unknown OAuth provider.");
        navigate("/login");
        return;
      }

      fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri }),
        credentials: "include",
      })
        .then(async (response) => {
          const status = response.status;
          const data = await response.json();
          if (data.success) {
            toastSuccess("Login successful");
            localStorage.setItem("uid", data.uid);
            if (status === 200) {
              await navigate("/home");
            } else {
              await navigate("/organization");
            }
            window.location.reload();
          } else {
            toastError(data.message || "Login failed.");
            navigate("/login");
          }
        })
        .catch((error) => {
          toastError(error?.response?.data?.msg ?? "Login failed.");
          navigate("/login");
          console.error(error);
        });
    }
  }, [navigate, location]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <CircularProgress color="primary" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Logging you in. Sit tight...
      </Typography>
    </Container>
  );
}

export default OAuthSuccess;
