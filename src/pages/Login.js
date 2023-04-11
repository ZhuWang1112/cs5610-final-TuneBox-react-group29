import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login_styles.css";
import {loginThunk} from "../services/users/users-thunks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
      try {
          dispatch(loginThunk({ userName, password }));
          navigate("/profile");
      } catch (err) {
          console.log("err", err)
      }
  };

  return (
    <div className={styles.container}>
        <div  className={styles.form_container}>
          <div className={styles.input_container}>
          Enter your userName
            <input
              placeholder="Enter your userName"
              name="userName"

              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required={true}
            />
          </div>

        {/*<div className={styles.input_container}>*/}
        {/*    <input*/}
        {/*        placeholder="Enter your email"*/}
        {/*        name="email"*/}

        {/*        value={email}*/}
        {/*        onChange={(e) => {*/}
        {/*            setEmail(e.target.value);*/}
        {/*        }}*/}
        {/*        required={true}*/}
        {/*    />*/}
        {/*</div>*/}

          <div className={styles.input_container}>
              Enter your password
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required={true}
            />
          </div>

          <p className={styles.forgot_password}>Forgot your password?</p>

          <div className={styles.form_bottom}>
            <button
              type="button" onClick={handleLogin}
            >LOG IN</button>
          </div>

        </div>
        <h1 className={styles.dont_have_account}>Don't have an account?</h1>

        <Link to="/signup">
          <button className={styles.outline_btn}>sign up for TuneBox</button>
        </Link>

    </div>
  );
};

export default Login;