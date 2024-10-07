// CreateAccount Component
import React, { useState } from "react";
import { postUser, getAllUsers } from "../data/mongoApi"; 
import CharacterSelection from "./CharacterSelection";

const CreateAccount = ({ setShowCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    console.log(username,password,selectedImage)

    try {
      const allUsers = await getAllUsers();
      const userExists = allUsers.some((user) => user.username === username);

      if (!userExists) {
        if(selectedImage !== ""){
          console.log("posted")
        await postUser(username, password, selectedImage);
        setSuccessMessage("Account created successfully!");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setShowCreateAccount(false); 
        }, 2000); 
        } else {
          setError("Character not selected")
        }
        
      } else {
        setError("Username already exists. Please choose another.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
   
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
        <p>select a character</p>
      <CharacterSelection setSelectedImage={setSelectedImage}/>
      </form>
      
      {error && <p className="error-message">{error}</p>} 
      {successMessage && <p className="success-message">{successMessage}</p>} 
      <button onClick={() => setShowCreateAccount(false)}>Back to Login</button>
    </div>
    
    </>
  );
};

export default CreateAccount;
