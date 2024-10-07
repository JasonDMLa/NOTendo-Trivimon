import React, { useState } from "react";
import { findUser } from "../data/mongoApi"; // Ensure findUser function is correctly defined
import CreateAccount from "./CreateAccount"; // Import CreateAccount component

const LoginAccount = ({ onStart }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false); // State to toggle between login and create account

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await findUser(username, password); // Call the findUser function

      // Check if user data is returned
      if (response && response.data) {
        setUserData(response.data);
        onStart(); // Call onStart to transition to the game
      } else {
        // If no user data, set error
        setError("User not found. Please check your username and password.");
      }
    } catch (err) {
      // Handle other errors, e.g., network issues
      if (err.response) {
        setError(err.response.data.message); // Error from backend
      } else {
        setError("An error occurred. Please try again."); // General error
      }
    }
  };

  // Toggle between login and create account
  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
  };

  if (showCreateAccount) {
    return <CreateAccount />; // Render CreateAccount when button is clicked
  }

  return (
    <div>
      <h1>Welcome to Trivimon!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
        <div>
          <h2>User Found:</h2>
          <p>Username: {userData.username}</p>
          {/* Add other user details here as needed */}
        </div>
      )}
      <div>
        <p>Don't have an account?</p>
        <button onClick={handleCreateAccountClick}>Create Account Here</button>
      </div>
    </div>
  );
};

export default LoginAccount;
