// mongoDB.js
import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://jameslau21:Cv8qPu722MJjBJb3@first-test-cluster.iz6no.mongodb.net/?retryWrites=true&w=majority&appName=First-Test-Cluster";

const client = new MongoClient(uri);

export const findUser = (username, password) => {
  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const filter = { username, password };
      return users.findOne(filter);
    })
    .catch((error) => {
      console.error("Error occurred while connecting to MongoDB", error);
    })
    .finally(() => {
      client.close();
    });
};

export const createUser = (username, password) => {
  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const user = {
        username,
        password,
        saveData: {
          animalsCompleted: false,
          historyCompleted: false,
          musicCompleted: false,
          scienceCompleted: false,
          sportsCompleted: false,
          videoGamesCompleted: false,
        },
      };

      return users.insertOne(user);
    })
    .catch((error) => {
      console.error(
        "Error occurred while connecting to MongoDB or inserting document:",
        error
      );
    })
    .finally(() => {
      client.close();
    });
};

export const updateUser = (username, saveDataStates) => {
  const {
    animalsCompleted,
    historyCompleted,
    musicCompleted,
    scienceCompleted,
    sportsCompleted,
    videoGamesCompleted,
  } = saveDataStates;

  return client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const filter = { username };
      const updateDoc = {
        $set: {
          saveData: {
            animalsCompleted,
            historyCompleted,
            musicCompleted,
            scienceCompleted,
            sportsCompleted,
            videoGamesCompleted,
          },
        },
      };

      return users.updateOne(filter, updateDoc);
    })
    .catch((error) => {
      console.error(
        "Error occurred while connecting to MongoDB or updating document:",
        error
      );
    })
    .finally(() => {
      client.close();
    });
};
