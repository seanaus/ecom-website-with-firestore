"use strict";
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();

const getUsers = async () => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      console.log("No user record found");
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().forename,
          doc.data().surname,
          doc.data().email,
          doc.data().password
        );
        usersArray.push(user);
      });
      return usersArray;
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getUserByEmail = async (email) => {

  try {
    const users = await getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      console.log('User with the given email not found');
    } else {
      return user
    }
  } catch (error) {
    console.log(error.message);
    return false
  }
}
const addUser = async (forename, surname, email, password) => {
  const data = {
    forename: forename,
    surname: surname,
    email: email,
    password: password,
  };
  try {
    const doc = await firestore.collection("users").add(data);
    return doc.id;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
module.exports = {
  addUser,
  getUsers,
  getUserByEmail
};
