import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../utils";
import { Link, redirect, useNavigate } from "react-router-dom";
import { postUser } from "../utils";
import { UserContext } from "../contexts/UserContexts";

const AccountCreation = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [AvatarError, setAvatarError] = useState(false);
  const [UserError, setUserError] = useState(false);
  const [avatarErrorText, setAvatarErrorText] = useState(false);
  const [userErrorText, setUserErrorText] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [finishPost, setFinishPost] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setAllUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!UserError) {
      setUserErrorText(true);
    }
    if (!AvatarError) {
      setAvatarErrorText(true);
    }
    if (UserError && AvatarError) {
      postUser(userNameInput, avatarInput).then(() => {
        navigate(`/profile/${userNameInput}`);
      });
    }
    setUserNameInput("");
    setAvatarInput("");
  };

  const userInputHandler = (e) => {
    setUserNameInput(e.target.value);
    setUserErrorText(false);
  };

  const avatarInputHandler = (e) => {
    setAvatarInput(e.target.value);
    setAvatarErrorText(false);
  };
  const checkUserNameValid = (e) => {
    setUserError(false);
    const array = [];
    allUsers.map((user) => {
      if (user.username === e.target.value) {
        array.push("yo");
      }
    });
    if (array.length === 0) {
      setUserError(true);
    }
  };
  const checkAvatarValid = (e) => {
    const regex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    setAvatarError(regex.test(e.target.value));
  };
  console.log(userNameInput, avatarInput, "------");

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            userInputHandler(e);
            checkUserNameValid(e);
          }}
        ></input>
        <label>Avatar URL: </label>
        <input
          type="text"
          onChange={(e) => {
            avatarInputHandler(e);
            checkAvatarValid(e);
          }}
        ></input>
        {UserError && AvatarError ? (
          <button type="submit">Create User</button>
        ) : (
          <button type="submit">Create User</button>
        )}
        {avatarErrorText ? <p>Invalid Avatar Url</p> : <p></p>}
        {userErrorText ? <p>Username taken!</p> : <p></p>}
      </form>
    </div>
  );
};

export default AccountCreation;
