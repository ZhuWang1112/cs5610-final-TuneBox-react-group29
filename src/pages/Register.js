import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../services/users/users-thunks";
import { initFollowThunk } from "../services/thunks/follow-thunk";
import { createPlaylist } from "../services/playlist-service";
import "./Register_styles.css";
import { ADMINCODE } from "../utils/URL";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [userNameAlert, setUserNameAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [genderAlert, setGenderAlert] = useState(false);

  const addPlaylist = async (userId) => {
    const newPlaylist = {
      user: userId,
      playListName: `Default`,
      description: "",
      isDefault: true,
      img: "/images/playlist-cover.jpeg",
      rating: 0,
    };
    await createPlaylist({ playlist: newPlaylist, cnt: 1 });
  };

  const checkInfo = () => {
    setUserNameAlert(false);
    setPasswordAlert(false);
    setPhoneAlert(false);
    setEmailAlert(false);
    setGenderAlert(false);
    if (userName === "") {
      setUserNameAlert(true);
      return false;
    }
    if (email === "") {
      setEmailAlert(true);
      return false;
    }
    if (cellphone === "") {
      setPhoneAlert(true);
      return false;
    }
    if (password === "") {
      setPasswordAlert(true);
      return false;
    }
    if (gender === "") {
      setGenderAlert(true);
      return false;
    }
    return true;
  };

  const register = async () => {
    setAdminError(false);
    try {
      if (isAdmin && adminCode !== ADMINCODE) {
        setAdminError(true);
        return;
      }
      setAdminCode("");
      // check each field before submit
      const isValid = checkInfo();
      if (!isValid) {
        return;
      }
      localStorage.clear();
      await dispatch(
        registerThunk({
          userName,
          password,
          email,
          cellphone,
          gender,
          isAdmin,
        })
      ).then((res) => {
        const user_id = res.payload._id;
        // add one default playlist for new user
        addPlaylist(user_id);
        // add empty followeeList for new user
        dispatch(initFollowThunk(user_id));
      });
      // navigate("/login");
      await dispatch(loginThunk({ userName, password })).then((res) => {
        const user_id = res.payload._id;
        navigate(`/home?_id=${user_id}`);
      });
    } catch (error) {
      alert("User name or email already exists!");
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
                <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
                  <label
                    htmlFor="userName"
                    className="mt-2 text-warning fw-bold mb-2 col-4 p-0"
                  >
                    UserName
                  </label>
                  {userNameAlert && (
                    <p className={`mb-0 text-danger col p-0`}>
                      Please enter username
                    </p>
                  )}
                </div>

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
                <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
                  <label
                    htmlFor="email"
                    className="mt-2 text-warning fw-bold mb-2 col-4 p-0"
                  >
                    Email
                  </label>
                  {emailAlert && (
                    <p className={`mb-0 text-danger col p-0`}>
                      Please enter email
                    </p>
                  )}
                </div>

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
                <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
                  <label
                    htmlFor="phone"
                    className="mt-2 text-warning fw-bold mb-2 col-4 p-0"
                  >
                    Phone
                  </label>
                  {phoneAlert && (
                    <p className={`mb-0 text-danger col p-0`}>
                      Please enter phone number
                    </p>
                  )}
                </div>

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
                <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
                  <label
                    htmlFor="password"
                    className="mt-2 text-warning fw-bold mb-2 col-4 p-0"
                  >
                    Password
                  </label>
                  {passwordAlert && (
                    <p className={`mb-0 text-danger col p-0`}>
                      Please enter password
                    </p>
                  )}
                </div>

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
                <div className={`row w-100 p-0 m-0 d-flex align-items-center`}>
                  <label className="mt-2 text-warning fw-bold mb-2 col-4 p-0">
                    Gender
                  </label>
                  {genderAlert && (
                    <p className={`mb-0 text-danger col p-0`}>
                      Please select gender
                    </p>
                  )}
                </div>

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

              <div className={`mt-3`}>
                <label className="mt-2 text-warning fw-bold mb-2 col-4 p-0">
                  User Type
                </label>

                <div
                  className={`mt-2 d-flex justify-content-start align-items-center`}
                >
                  <label className={`text-muted fw-bold`}>
                    <input
                      type="radio"
                      name="userType"
                      value="false"
                      onChange={(e) => {
                        setIsAdmin(e.target.value === "true");
                        setAdminError(false);
                        setAdminCode("");
                      }}
                    />
                    Regular
                  </label>
                  <label className={`ms-2 text-muted fw-bold`}>
                    <input
                      type="radio"
                      name="userType"
                      value="true"
                      onChange={(e) => {
                        setIsAdmin(e.target.value === "true");
                      }}
                    />
                    Admin
                  </label>
                  {isAdmin && (
                    <label>
                      <input
                        type="text"
                        name="adminCode"
                        value={adminCode}
                        placeholder="Enter Code"
                        onChange={(e) => {
                          setAdminCode(e.target.value);
                        }}
                        className={`form-control admin-control-input fw-bold text-white ms-1`}
                      />
                    </label>
                  )}
                </div>
                {adminError && (
                  <p className={`text-danger mb-0`}>Wrong Admin Code</p>
                )}
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
