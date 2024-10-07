// CreateAccount Component
import React, { useState } from "react";
import { postUser, getAllUsers } from "../data/mongoApi"; 

const CreateAccount = ({ setShowCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const allUsers = await getAllUsers();
      const userExists = allUsers.some((user) => user.username === username);

      if (!userExists) {
        await postUser(username, password);
        setSuccessMessage("Account created successfully!");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setShowCreateAccount(false); // Redirect back to Login
        }, 2000); 
      } else {
        setError("Username already exists. Please choose another.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a New Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Using a CSS class */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Using a CSS class */}
      <button onClick={() => setShowCreateAccount(false)}>Back to Login</button>
    </div>
  );
};

export default CreateAccount;
