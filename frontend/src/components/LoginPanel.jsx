import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios"; // Updated import for axios
import styles from "./LoginPanel.module.css";

const LoginPanel = ({ onClose }) => {
    const [email, setEmail] = useState(""); // Email input value
    const [password, setPassword] = useState(""); // Password input value
    const [step, setStep] = useState(1); // Step 1: Email input, Step 2: Password input
    const [isValid, setIsValid] = useState(true); // Validation state
    const panelRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        // Trigger panel animation
        const timer = setTimeout(() => panelRef.current.classList.add(styles.show), 10);
        inputRef.current.focus();
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        panelRef.current.classList.remove(styles.show);
        setTimeout(() => onClose(), 500);
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `/api/auth/${provider}`;
    };

    const handleProceed = async () => {
        if (step === 1) {
            // Step 1: Check if email exists
            if (validateEmail(email)) {
                setIsValid(true);
                try {
                    const response = await axios.post("/api/auth/check-email", { email });
                    if (response.data.exists) {
                        setStep(2); // Switch to password input
                    } else {
                        alert("A verification email has been sent. Please check your inbox.");
                        handleClose();
                    }
                } catch (error) {
                    alert("Error occurred. Please try again.");
                }
            } else {
                setIsValid(false); // Invalid email
            }
        } else if (step === 2) {
            // Step 2: Login with password
            if (password.trim()) {
                try {
                    const response = await axios.post("/api/auth/login", { email, password });
                    alert(`Login successful! Token: ${response.data.token}`); // Replace with token handling
                    handleClose();
                } catch (error) {
                    alert("Invalid password. Please try again.");
                }
            } else {
                //alert("Password cannot be empty.");
                setIsValid(false); // Invalid password
            }
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/forgot-password", { email });
            alert("Password reset link has been sent to your email.");
        } catch (error) {
            alert("Error sending reset link. Please try again.");
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleFocus = () => setIsValid(true);

    return (
        <div className={styles.loginPanel} ref={panelRef}>
            <button className={` ${styles.closeButton}`} onClick={handleClose}></button>
            <div className={styles.loginPanelContent}>
                <div className={styles.innerContainer}>
                    <h3>Welcome!</h3>
                    <div className={styles.emailLogin}>
                        <p>{step === 1 ? "Create account / Sign in" : "Let’s get you in!"}</p>
                        <input
                            type={step === 1 ? "email" : "password"}
                            placeholder={step === 1 ? "Your Email Address" : "Your Password"}
                            className={`${styles.emailInput} ${!isValid ? styles.invalid : ""}`}
                            value={step === 1 ? email : password}
                            onChange={(e) => (step === 1 ? setEmail(e.target.value) : setPassword(e.target.value))}
                            onFocus={handleFocus}
                            ref={inputRef}
                            required
                        />
                        <button className={styles.proceedButton} onClick={handleProceed}>
                            GO
                        </button>
                        <a
                            href="#"
                            style={{ opacity: step !== 2 ? 0 : 1 }}
                            className={styles.forgotPassword}
                            onClick={handleForgotPassword}
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <p>Or sign in with:</p>
                    <div className={styles.socialButtons}>
                        <button className={styles.googleButton} onClick={() => handleSocialLogin("google")}>
                            Google
                        </button>
                        <button className={styles.facebookButton} onClick={() => handleSocialLogin("facebook")}>
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPanel;
