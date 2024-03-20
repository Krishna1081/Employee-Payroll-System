import { FaUser, FaLock } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config.js";
import { useState } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import "./login.css";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success

  const handleEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("User registered:", userCredential.user);
      // Set registration success state to true
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Registration error:", error.message);
      setError("Failed to register. Please try again.");
    }
  };

  // If registration was successful, redirect to the dashboard
  if (registrationSuccess) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="Login">
      <div className="wrapper">
        <form onSubmit={register}>
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

          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <FaLock />
          </div>

          {error && <div className="error">{error}</div>}

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
