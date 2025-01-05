import React, { useState } from "react";
import { fetchRegister } from "../API/index.js"; // Importing the fetchRegister function
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const RegisterUser = ({setUser}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetchRegister(name, email, password);
      
      if (response.token !== undefined) {
        setSuccessMessage("User registered successfully!");
        setUser(response.user);

        // Save the token and user in localStorage
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", response.user)

        navigate('/user/me');
      } else {
        setErrorMessage(response.token?.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Knight Lancelot"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Lancelot44@camelot.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Your secret phrase"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};
RegisterUser.propTypes = {
  setUser: PropTypes.func.isRequired,
};


export default RegisterUser;
