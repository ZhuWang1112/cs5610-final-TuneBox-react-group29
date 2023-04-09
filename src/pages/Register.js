import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../components/Inputs/TextField";
// import Select from "../components/Inputs/Select";
import Radio from "../components/Inputs/Radio";

import Button from "../components/Button";
// import logo from "../images/black_logo.svg";
import styles from "./Register_styles.css";


const genders = ["male", "female", "non-binary"];

const Register = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
        ? delete errors[name]
        : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setIsFetching(true);
        const url = process.env.REACT_APP_API_URL + "/users";
        await axios.post(url, data);
        setIsFetching(false);
        alert("Account created successfully");
        navigate("/login");
      } catch (error) {
        setIsFetching(false);
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        ) {
          alert(error.response.data);
        } else {
          console.log(error);
          alert("Something went wrong!");
        }
      }
    } else {
      alert("please fill out properly");
    }
  };

  return (
      <div className={styles.container}>

        <h1 className={styles.heading}>Sign up for free to start listening.</h1>
        <p className={styles.or_container}>or</p>

        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h2 className={styles.form_heading}>Sign up with your email address</h2>

          <div className={styles.input_container}>
            <TextField
                label="What should we call you?"
                placeholder="Enter a userName"
                name="name"
                handleInputState={handleInputState}
                schema={schema.name}
                handleErrorState={handleErrorState}
                value={data.name}
                error={errors.name}
                required={true}
            />
          </div>


          <div className={styles.input_container}>
            <TextField
                label="What's your email?"
                placeholder="Enter your email"
                name="email"
                handleInputState={handleInputState}
                schema={schema.email}
                handleErrorState={handleErrorState}
                value={data.email}
                error={errors.email}
                required={true}
            />
          </div>

          <div className={styles.input_container}>
            <TextField
                label="Create a password"
                placeholder="Create a password"
                name="password"
                handleInputState={handleInputState}
                schema={schema.password}
                handleErrorState={handleErrorState}
                value={data.password}
                error={errors.password}
                type="password"
                required={true}
            />
          </div>



          <div className={styles.input_container}>
            <Radio
                label="What's your gender?"
                name="gender"
                handleInputState={handleInputState}
                options={genders}
                required={true}
            />
          </div>

          <div className={styles.submit_btn_wrapper}>
            <Button label="Sign Up" type="submit" isFetching={isFetching} />
          </div>
          <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
            Have an account? <Link to="/login"> Log in.</Link>
          </p>
        </form>
      </div>
  );
};

export default Register;
