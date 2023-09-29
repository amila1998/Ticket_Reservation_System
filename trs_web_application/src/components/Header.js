import React, { useEffect } from "react";
import logo from "../assets/train.png";
import logout from "../assets/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { getAxiosInstance } from "../utils/axios";
import { AutherizationAPI } from "../utils/api";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoggedIn && !token){
          const isLocalLogin = localStorage.getItem("isLogin");
          const localToken = localStorage.getItem("token");
          if (isLocalLogin) {
            dispatch(authActions.login(localToken));
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
        } catch (error) {
          console.log("🚀 ~ file: Header.js:17 ~ getInfo ~ error:", error);
          dispatch(authActions.logout());
        }
      };
      getInfo();
    }
  }, [isLoggedIn, token]);

  return (
    <nav class="navbar navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src={logo}
            alt="Bootstrap"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          ></img>
          Express Book
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn && user && (
                <>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={user.imagePath}
                        width={30}
                        className="profile_image"
                      ></img>
                      {user.name}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                      <li>
                        <a class="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <div class="dropdown-item logout">
                          <i class="fa fa-sign-out"></i>
                          Logout
                        </div>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
