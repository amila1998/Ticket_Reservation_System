//App.js
// Import necessary modules
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import AuthScreen from "./screens/AuthScreen";
import Header from "./components/Header";
import Loading from "./utils/loading";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";
import { loadingActions } from "./store/loadingSlice";
import { getAxiosInstance } from "./utils/axios";
import { AutherizationAPI } from "./utils/api";
import Footer from "./components/Footer";
import Unauthorized from "./utils/Unauthorized";
import DeactivateAccounts from "./utils/DeactivateAccounts";
import Profile from "./components/Profile";
import { ResetPassword } from "./components/ResetPassword";

// Define the main App component
function App() {
  // Define and extract state variables using useSelector and useDispatch
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.loading.isMainLoading);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // Effect hook to handle authentication and loading
  useEffect(() => {
    if (!isLoggedIn && !token) {
      dispatch(loadingActions.setIsMainLoading());
      const isLocalLogin = localStorage.getItem("isLogin");
      const localToken = localStorage.getItem("token");
      if (isLocalLogin) {
        dispatch(authActions.login(localToken));
      } else {
        dispatch(authActions.logout());
        dispatch(loadingActions.removeIsMainLoading());
      }
    }
  }, [isLoggedIn, token]);

  // Effect hook to retrieve user information
  useEffect(() => {
    if (isLoggedIn && isLoggedIn) {
      const getInfo = async () => {
        try {
          await dispatch(loadingActions.setIsMainLoading());
          const res = await getAxiosInstance().get(AutherizationAPI.info, {
            headers: { Authorization: `bearer ${token}` },
          });
          await dispatch(authActions.setInfo({ user: res.data }));
          await dispatch(loadingActions.removeIsMainLoading());
        } catch (error) {
          console.log("🚀 ~ file: Header.js:17 ~ getInfo ~ error:", error);
          await dispatch(authActions.logout());
          await dispatch(loadingActions.removeIsMainLoading());
        }
      };
      getInfo();
    }
  }, [isLoggedIn, token]);

  // Render the main components of the app based on user authentication status
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Header />
          <main className="main">
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      user.role == "traveler" ? (
                        <Unauthorized />
                      ) : user.isActive ? (
                        <Dashboard />
                      ) : (
                        <DeactivateAccounts />
                      )
                    ) : (
                      <AuthScreen />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isLoggedIn ? (
                      user.role == "traveler" ? (
                        <Unauthorized />
                      ) : user.isActive ? (
                        <Profile />
                      ) : (
                        <DeactivateAccounts />
                      )
                    ) : (
                      <AuthScreen />
                    )
                  }
                />
                <Route
                  path="/resetPassword/:token"
                  element={<ResetPassword />}
                />
              </Routes>
            </Router>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

// Export the main App component
export default App;
