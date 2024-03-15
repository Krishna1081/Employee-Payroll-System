// Login.js
import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css"; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null); // Initialize user state to null

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser);
            setUser(currentUser);
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
        } catch (error) {
            console.error(error.message);
        }
    };   

    const logout = async () => {
        await signOut(auth);
    };   

    return (
        <div className="Login">
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>

                    <div className="input-box">
                        <input type="text" placeholder="username" required onChange={e => setLoginEmail(e.target.value)}/>
                        <FaUser />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="password" required onChange={e => setLoginPassword(e.target.value)}/>
                        <FaLock />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />Remember me
                        </label>
                        <a href="app.js">Forgot Password?</a>
                    </div>

                    <div className="remember-link">
                        <p>
                            Don't have an account <a href="register">Register</a>
                        </p>
                        <button type="button" className="btn" onClick={login}>
                            Login
                        </button>
                        <h4> User Logged In: </h4>
                        {user && user.email} {/* Display user email if user is logged in */}
                        {user && <button onClick={logout}>Sign Out</button>} {/* Display Sign Out button if user is logged in */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
