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

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.loading.isMainLoading);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isLoggedIn && isLoggedIn) {
      const getInfo = async () => {
        try {
          const res = await getAxiosInstance().get(AutherizationAPI.info, {
            headers: { Authorization: `bearer ${token}` },
          });
          dispatch(authActions.setInfo({ user: res.data }));
          dispatch(loadingActions.removeIsMainLoading());
        } catch (error) {
          console.log("🚀 ~ file: Header.js:17 ~ getInfo ~ error:", error);
          dispatch(authActions.logout());
          dispatch(loadingActions.removeIsMainLoading());
        }
      };
      getInfo();
    }
  }, [isLoggedIn, token]);

  return (
    <div className="App">
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
        <div>
          <Header />
          <main className="main">
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={isLoggedIn ? <Dashboard /> : <AuthScreen />}
                />
              </Routes>
            </Router>
          </main>
          <Footer/>
        </div>
      )}
    </div>
  );
}

export default App;
