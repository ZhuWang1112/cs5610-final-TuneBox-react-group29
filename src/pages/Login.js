import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login_styles.css";
import { loginThunk } from "../services/users/users-thunks";

const Login = () => {
  // const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setShowLoginError(false);
    try {
      localStorage.clear();
      dispatch(loginThunk({ userName, password })).then((res) => {
        const currentUser = window.localStorage.getItem("currentUser");
        if (currentUser) {
          const userID = JSON.parse(
            window.localStorage.getItem("currentUser")
          )._id;
          navigate(`/home?_id=${userID}`);
        } else {
          setShowLoginError(true);
        }
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className={`register-div position-relative`}>
      <div className={`p-5 row w-100 p-0 ms-5`}>
        <div
          className={`register-window-div col-9 col-md-7 col-lg-6 col-xl-5 xxl-5 mt-5`}
        >
          <div className={`mt-5`}>
            <div className={`mt-5`}>
              <h1 className={`text-white fw-bold`}>Welcome Back!</h1>
              {showLoginError && (
                <div
                  className={`position-absolute d-flex justify-content-center`}
                >
                  <h5 className={`text-danger`}>Authentication failed!</h5>
                </div>
              )}
              <div className={`mt-5`}>
                <label
                  htmlFor="login-userName"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  UserName
                </label>
                <input
                  id="login-userName"
                  name="userName"
                  placeholder="Enter your userName"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  type="text"
                  required={true}
                  className={`form-control register-control-input fw-bold text-white`}
                />
              </div>

              <div className={`mt-3`}>
                <label
                  htmlFor="login-password"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  required={true}
                  className={`form-control register-control-input fw-bold text-white`}
                />
              </div>

              <div className={`mt-5 d-flex justify-content-center `}>
                <button
                  type="button"
                  onClick={handleLogin}
                  className={`btn btn-warning text-white fw-bold`}
                >
                  Login
                </button>
              </div>
              <div
                className={`mt-5 d-flex justify-content-center already-have-account text-muted`}
              >
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    {" "}
                    Register for free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`position-absolute login-img-band`}>
        <img src={`/images/welcome-2.avif`} height={"800px"} width={"800px"} />
      </div>
    </div>
  );
};

export default Login;