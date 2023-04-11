import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./Register_styles.css";
import { registerThunk } from "../services/users/users-thunks";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");



  const register = () => {
    // e.preventDefault();
      try {
        // const url = process.env.REACT_APP_API_URL + "/users";
        // await axios.post(url, data);
        // dispatch(registerThunk({ userName, password, email,  gender }));
       localStorage.clear();
        dispatch(registerThunk({ userName, password }));
        alert("Account created successfully");
        navigate("/login");
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
          <h2 >Sign up with your email address</h2>

          <div >
            What should we call you?
            <input
                placeholder="Enter a userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required={true}
            />
          </div>


          {/*<div >*/}
          {/*  What's your email?*/}
          {/*  <input*/}
          {/*      placeholder="Enter your email"*/}
          {/*      value={email}*/}
          {/*      onChange={(e) => {*/}
          {/*        setEmail(e.target.value);*/}
          {/*      }}*/}
          {/*      required={true}*/}
          {/*  />*/}
          {/*</div>*/}

          <div >
            Create a password
            <input
                placeholder="Create a password"
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
