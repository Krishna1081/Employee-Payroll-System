import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase-config.js";
import { Navigate, Link } from 'react-router-dom'; // Import Navigate and Link from react-router-dom

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false); // State to manage "Remember Me" checkbox
    const [loggedIn, setLoggedIn] = useState(false); // Initialize loggedIn state to false
    const [errorMessage, setErrorMessage] = useState(""); // State to manage error message

    useEffect(() => {
        const storedEmail = localStorage.getItem("loginEmail"); // Get saved email from local storage
        if (storedEmail) {
            setLoginEmail(storedEmail); // Set email in state if found in local storage
            setRememberMe(true); // Set "Remember Me" checkbox to true
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser);
            setLoggedIn(!!currentUser); // Set loggedIn state to true if user is logged in
        });
        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            const currentUser = userCredential.user;
            console.log("Logged in user:", currentUser);
            setLoggedIn(true); // Set loggedIn state to true after successful login

            // Save email in local storage if "Remember Me" checkbox is checked
            if (rememberMe) {
                localStorage.setItem("loginEmail", loginEmail);
            } else {
                localStorage.removeItem("loginEmail"); // Remove email from local storage if "Remember Me" checkbox is unchecked
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Invalid credentials"); // Set error message for invalid credentials
        }
    };   

    const handlePasswordReset = async () => {
        const email = prompt("Enter your email for password reset:");
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset email sent successfully!");
            } catch (error) {
                console.error("Error sending password reset email:", error);
            }
        }
    };

    if (loggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="Login">
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>

                    <div className="input-box">
                        <input type="text" placeholder="username" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)}/>
                        <FaUser />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
                        <FaLock />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />Remember me
                        </label>
                        <Link to="#" onClick={handlePasswordReset}>Forgot Password?</Link>
                    </div>

                    <div className="remember-link">
                        <p>
                            Don't have an account <Link to="/register">Register</Link>
                        </p>
                        <button type="button" className="btn" onClick={login}>
                            Login
                        </button>
                    </div>
                </form>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;
