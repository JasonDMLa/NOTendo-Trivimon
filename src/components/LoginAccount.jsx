// LoginAccount Component
import React, { useState } from "react";
import { findUser } from "../data/mongoApi"; 
import CreateAccount from "./CreateAccount"; 

const LoginAccount = ({ onStart }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false); 
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); // Start loading

    try {
      const response = await findUser(username, password);

      if (response && response.data) {
        onStart(); 
      } else {
        setError("User not found. Please check your username and password.");
        setUsername(""); // Clear username on error
        setPassword(""); // Clear password on error
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true); 
  };

  if (showCreateAccount) {
    return <CreateAccount setShowCreateAccount={setShowCreateAccount} />; 
  }

  return (
    <div>
      <h1>Welcome to Trivimon!</h1>
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
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Using a CSS class */}
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      <p>Don't have an account?</p>
      <button onClick={handleCreateAccountClick}>Create Account Here</button>
    </div>
  );
};

export default LoginAccount;
