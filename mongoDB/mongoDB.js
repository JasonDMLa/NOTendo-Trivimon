const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://jameslau21:Cv8qPu722MJjBJb3@first-test-cluster.iz6no.mongodb.net/?retryWrites=true&w=majority&appName=First-Test-Cluster";

const client = new MongoClient(uri);

const findUser = (username, password) => {
  client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      const filter = { username, password };
      return users.findOne(filter);
    })
    .catch((error) => {
      console.error("Error occured while connecting");
    })
    .finally(() => {
      client.close();
    });
};

const createUser = (username, password) => {
  client
    .connect()
    .then(() => {
      // Connect to the "users_test" database and access its "users" collection
      const database = client.db("users_test");
      const users = database.collection("users");

      // Create a document to insert
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

      // Insert the defined document into the "users" collection
      return users.insertOne(user);
    })
    .catch((error) => {
      console.error(
        "Error occurred while connecting to MongoDB or inserting document:",
        error
      );
    })
    .finally(() => {
      // Close the MongoDB client connection
      client.close();
    });
};

const updateUser = (username, saveDataStates) => {
  const {
    animalsCompleted,
    historyCompleted,
    musicCompleted,
    scienceCompleted,
    sportsCompleted,
    videoGamesCompleted,
  } = saveDataStates;
  client
    .connect()
    .then(() => {
      const database = client.db("users_test");
      const users = database.collection("users");

      // Create a filter for the user with the specified username
      const filter = { username };

      // Specify the update using the $set operator
      const updateDoc = {
        $set: {
          // Use $set to update specific fields
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

      // Update the first document that matches the filter
      return users.updateOne(filter, updateDoc);
    })
    .catch((error) => {
      console.error(
        "Error occurred while connecting to MongoDB or updating document:",
        error
      );
    })
    .finally(() => {
      // Close the connection after the operation completes
      client.close();
    });
};

module.exports = { findUser, createUser, updateUser };
