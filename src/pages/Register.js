import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import styles from "./Register_styles.css";
import {loginThunk, registerThunk} from "../services/users/users-thunks";
import {initFollowThunk} from "../services/thunks/follow-thunk";
import { createPlaylistThunk } from "../services/thunks/playlist-thunk";
import "./Register_styles.css";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [cellphone, setCellphone] = useState("");

  const addPlaylist = (userId) => {
    const newPlaylist = {
      user: userId,
      playListName: `Default`,
      description: "",
      isDefault: true,
      img: "/images/playlist-cover.jpeg",
      rating: 0,
    };
    dispatch(createPlaylistThunk({ playlist: newPlaylist, cnt: 1 }));
  };

  const register = async () => {
    try {
      localStorage.clear();
      await dispatch(registerThunk({ userName, password, email, gender }));
      // navigate("/login");
      await dispatch(loginThunk({ userName, password })).then((res) => {
        // console.log("user info: ", window.localStorage.getItem("currentUser"));
        const user_id = JSON.parse(
          window.localStorage.getItem("currentUser")
        )._id;
        navigate(`/home?_id=${user_id}`);
      });
      const user_id = JSON.parse(
        window.localStorage.getItem("currentUser")
      )._id;
      dispatch(initFollowThunk(user_id));
      // add one default playlist for user
      addPlaylist(user_id);
    } catch (error) {
      console.log(error);
      alert("something is wrong!");
    }
  };

  return (
    <div className={`register-div position-relative`}>
      <div className={`p-5 row w-100 p-0 ms-5`}>
        <div
          className={`register-window-div col-9 col-md-7 col-lg-6 col-xl-5 xxl-5`}
        >
          <div className={`mt-3`}>
            <h5 className={`text-muted`}>START FOR FREE</h5>

            <div className={`mt-3`}>
              <h1 className={`text-white fw-bold`}>Create new account</h1>

              <div className={``}>
                <label
                  htmlFor="userName"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  UserName
                </label>
                <input
                  id="userName"
                  placeholder="Enter a userName*"
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
                  htmlFor="email"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email*"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  required={true}
                  className={`form-control register-control-input fw-bold text-white`}
                />
              </div>

              <div className={`mt-3`}>
                <label
                  htmlFor="phone"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  placeholder="Enter your cellphone*"
                  value={cellphone}
                  onChange={(e) => {
                    setCellphone(e.target.value);
                  }}
                  type="text"
                  required={true}
                  className={`form-control register-control-input fw-bold text-white`}
                />
              </div>

              <div className={`mt-3`}>
                <label
                  htmlFor="password"
                  className="mt-2 text-warning fw-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  placeholder="Create a password*"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  required={true}
                  className={`form-control register-control-input fw-bold text-white`}
                />
              </div>

              <div className={`mt-3`}>
                <label className="mt-2 text-warning fw-bold mb-2">Gender</label>
                <div className={`mt-2 d-flex justify-content-start`}>
                  <label className={`text-muted fw-bold`}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    Male
                  </label>
                  <label className={`ms-3 text-muted fw-bold`}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    Female
                  </label>
                  <label className={`ms-3 text-muted fw-bold`}>
                    <input
                      type="radio"
                      name="gender"
                      value="non-binary"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    Non-binary
                  </label>
                </div>
              </div>

              <div className={`mt-5 d-flex justify-content-center `}>
                <button
                  type="button"
                  onClick={register}
                  className={`btn btn-warning text-white fw-bold`}
                >
                  Create Account
                </button>
              </div>
              <div
                className={`mt-5 d-flex justify-content-center already-have-account text-muted`}
              >
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    {" "}
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`position-absolute register-img-band`}>
        <img src={`/images/music-bg.avif`} height={"900px"} width={"1500px"} />
      </div>
    </div>
  );
};

export default Register;
