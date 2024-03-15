import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config.js";
import "./login.css";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="Login">
      <div className="wrapper">
        <form onSubmit={register}> {/* Use onSubmit instead of onClick for form submission */}
          <h1>Register</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={handleEmailChange}
              required
            />
            <FaUser />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={handlePasswordChange}
              required
            />
            <FaLock />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="app.js">Forgot Password?</a>
          </div>

          <div className="remember-link">
            <p>
              Already have an account? <a href="/">Login</a>
            </p>
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
