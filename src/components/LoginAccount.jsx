// LoginAccount Component
import React, { useState } from "react";
import { findUser } from "../data/mongoApi"; 
import CreateAccount from "./CreateAccount"; 

const LoginAccount = ({ onStart, username, setUsername,  password, setPassword, setSaveData }) => {
  
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    try {
      const response = await findUser(username, password);

      if (response && response.data) {
        setSaveData(response.data.saveData)
        onStart(); 
      } else {
        setError("User not found. Please check your username and password.");
        setUsername(""); 
        setPassword(""); 
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
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
        <p>
        Available Users:
        <select id="users-bar" name="user" onClick={() => {
          setUsername("James");
          setPassword("NCPassword123");
        }}>
          <option>{"James"}</option>
        </select>
      </p>
      </form>
      {error && <p className="error-message">{error}</p>} 
      {loading && <p>Loading...</p>} 
      <p>Don't have an account?</p>
      <button onClick={handleCreateAccountClick}>Create Account Here</button>
    </div>
  );
};

export default LoginAccount;
