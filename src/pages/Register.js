import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import styles from "./Register_styles.css";
import {loginThunk, registerThunk} from "../services/users/users-thunks";
import {initFollowThunk} from "../services/thunks/follow-thunk";
import * as service from "../services/follow-service";
import {initLikeThunk} from "../services/thunks/like-thunk";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const register = async () => {
      try {
        localStorage.clear();
        await dispatch(registerThunk({ userName, password, email, gender }));
        // navigate("/login");
        await dispatch(loginThunk({ userName, password })).then((res) => {
          // console.log("user info: ", window.localStorage.getItem("currentUser"));
          const user_id = JSON.parse(window.localStorage.getItem("currentUser"))._id;
          navigate(`/home?_id=${user_id}`);
        });
        const user_id = JSON.stringify(JSON.parse(window.localStorage.getItem("currentUser"))._id);
        dispatch(initFollowThunk( user_id ))
        dispatch(initLikeThunk(user_id))

      } catch (error) {
        console.log(error);
        alert("something is wrong!")
      }
  };

  return (
      <div >
        <h1 >Sign up for free to start listening.</h1>
        <p >or</p>

        <div  >
          <h2 >Sign up with your email address*</h2>

          <div >
            What should we call you?
            <input
                placeholder="Enter a userName*"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required={true}
            />
          </div>


          <div >
            What's your email?
            <input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required={true}
            />
          </div>

          <div >
            Create a password*
            <input
                placeholder="Create a password*"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                required={true}
            />
          </div>


          <div >
            <label>
              <input type="radio" name="gender" value="male" onChange={(e) => {
                setGender(e.target.value);
              }} />
              male
            </label>
            <label>
              <input type="radio" name="gender" value="female" onChange={(e) => {
                setGender(e.target.value);
              }} />
              female
            </label>
            <label>
              <input type="radio" name="gender" value="other" onChange={(e) => {
                setGender(e.target.value);
              }} />
                non-binary
            </label>
          </div>

          <div >
            <button type="button" onClick={register}>Sign Up</button>
          </div>
          <p  style={{ fontSize: "1.6rem" }}>
            Have an account? <Link to="/login"> Log in.</Link>
          </p>
        </div>
      </div>
  );
};

export default Register;
