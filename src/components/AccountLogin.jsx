import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
// import { getAllUsers } from "../utils";
// import { UserContext } from "../contexts/UserContexts";

const AccountLogin = () => {
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [correctUser, setCorrectUser] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  // const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  // console.log(loggedInUser);
  const submitClicker = (e) => {
    e.preventDefault();
    setSubmit(input);
    setInput("");
    setDisplayText(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setDisplayText(false);
  };

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setAllUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkUserExists = (e) => {
    setCorrectUser(false);
    allUsers.map((user) => {
      if (user.username === e.target.value) {
        setCorrectUser(true);
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          submitClicker(e);
        }}
      >
        <h1>Login Page</h1>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => {
            checkUserExists(e);
            handleInputChange(e);
          }}
        ></input>

        {/* {correctUser ? (
          <Link to={`/profile/${input}`}>
            <button type="submit">Login</button>
          </Link>
        ) : (
          <button type="submit" >
            Login
          </button>
        )} */}

        {correctUser ? (
          <Link to={`/profile/${input}`}>
            <button type="submit">Login</button>
          </Link>
        ) : (
          <button type="submit">Login</button>
        )}
        {displayText ? (
          <p>Enter a Valid User (check your capitals)</p>
        ) : (
          <p></p>
        )}
      </form>

      <Link to={`/create`}>
        <button>CLICK TO CREATE ACCOUNT</button>
      </Link>
    </>
  );
};

export default AccountLogin;
