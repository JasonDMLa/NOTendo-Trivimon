import React, { useState } from "react";
import { postUser } from "../data/mongoApi"; // Ensure postUser is defined
import { getAllUsers } from "../data/mongoApi";
import LoginAccount from "./LoginAccount";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [showLoginAccount, setShowLoginAccount] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    // Frontend error handling
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      // Attempt to create a user
      getAllUsers().then((allUsers) => {
        let listUsers = allUsers.map((user) => {
          return user.username;
        });
        console.log(listUsers);

        if (username !== "" && !listUsers.includes(username)) {
          const response = postUser(username, password);

          // If the response indicates success
          setSuccessMessage("Account created successfully!"); // Display success message
          setUsername(""); // Clear username input
          setPassword(""); // Clear password input
          setCreateSuccess(true);
        } else {
          setError("Username already exists. Please choose another.");
        }
      });
    } catch (err) {
      // Error handling for existing username or other issues
      if (
        err.response &&
        err.response.data.error.includes("Username already exists")
      ) {
        setError("Username already exists. Please choose another.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleLoginAccountClick = () => {
    setShowLoginAccount(true);
  };

  if (showLoginAccount && createSuccess) {
    return <LoginAccount />; // Render CreateAccount when button is clicked
  }

  const handleBackToLogin = (e) => {
    return <LoginAccount />;
  };

  return (
    <div>
      <h1>Create a New Account</h1>
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
        <button type="submit" onClick={handleLoginAccountClick}>
          Create Account
        </button>
        <div>
          <button onClick={handleBackToLogin}>
            Back to Login
          </button>
        </div>
      </form>

      {/* Display Error if exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Success Message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default CreateAccount;
