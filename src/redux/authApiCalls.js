import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginStart, loginSuccess, loginFailure } from "../reducers/auth-reducers";

export const login = async (payload, dispatch) => {
    dispatch(loginStart());
    try {
        const url = process.env.REACT_APP_API_URL + "/login";
        const { data } = await axios.post(url, payload);
        const decodeData = jwt_decode(data.data);
        dispatch(loginSuccess({ ...decodeData, token: data.data }));
        alert(data.message);
        window.location = "/home";
        return true;
    } catch (error) {
        dispatch(loginFailure());
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        ) {
            alert(error.response.data.message);
        } else {
            console.log(error);
            alert("Something went wrong!");
        }
        return false;
    }
};