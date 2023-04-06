import React from 'react'
import {Link} from "react-router-dom";
import './index.css';
const NavBar = () => {
  return (
    <div className={'navbar-bg me-0 d-flex justify-content-end align-items-center pe-5'}>
        <Link
            to="/premium"
            className={`text-warning pt-2 navbar-text mx-3`}
        >
            <span>Premium</span>
        </Link>

        <div className={`text-white`}>|</div>

        <Link
            to="/login"
            className={`text-muted pt-2 navbar-text mx-3`}
        >
            <span>Login</span>
        </Link>
        
        <Link
            to="/register"
            className={`text-muted pt-2 navbar-text pe-2`}
        >
            <span>Register</span>
        </Link>
    </div>
    
  )
}

export default NavBar