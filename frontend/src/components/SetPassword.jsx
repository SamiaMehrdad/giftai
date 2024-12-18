import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import styles from "./SetPassword.module.css";

const SetPassword = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post("/api/auth/set-password", {
                token,
                password,
            });
            localStorage.setItem("token", response.data.token);
            setMessage("Password set successfully! Logging you in...");
            setTimeout(() => (window.location.href = "/"), 2000);
        } catch (error) {
            setMessage("Failed to set password. Please try again.");
        }
    };

    return (
        <div className={styles.setPasswordContainer}>
            <h3>Set Your Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Set Password</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default SetPassword;
