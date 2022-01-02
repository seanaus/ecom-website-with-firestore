const firebase = require("../db");
const firestore = firebase.firestore();
const bcrypt = require("bcrypt");
const localStorage = require("local-storage");
const { getUsers, getUserByEmail } = require("./user");
// const { stringify } = require("nodemon/lib/utils");
const admin = {
  email: "admin@googlemail.com",
  password: "Aus25031549",
  salt: "$2b$10$0bOy5I.kfP3qwOeMXqWUle",
  hash: "",
};
const signInOptions = {
  emailAndPassword: 0,
  googleAuth: 1,
};
const encrypt = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const checkUser = async (email, password) => {
  const user = await checkEmail(email);

  if (user) {
    valid = await checkPassword(password, user.password);
    if (valid) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const checkEmail = async (email) => {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (user) {
    return user;
  } else {
    return false;
  }
};
const checkPassword = async (raw, encrypted) => {
  try {
    if (await bcrypt.compare(raw, encrypted)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const cacheUser = (fbAuth) => {
  const user = {
    id: fbAuth.id,
    forename: fbAuth.forename,
    surname: fbAuth.surname,
    email: fbAuth.email,
    token: fbAuth.token.i,
  };
  localStorage.set("auth", JSON.stringify(user));
};
const activeUser = () => {
  const defaultUser = {
    id: "-1",
    forename: "",
    surname: "",
    email: null,
    token: "",
  };
  const user = JSON.parse(localStorage.get("auth"));

  if (user) {
    return user;
  } else {
    return defaultUser;
  }
};
const clearCache = () => {
  localStorage.clear();
};
const authUser = () => {
  const auth = JSON.parse(localStorage.get("auth"));
  if (auth && auth.id !== "-1") {
    return true;
  } else {
    return false;
  }
};

const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const token = response.user.getIdToken();
    const auth = {
      token: token,
      existingUser: false,
      success: true,
    };
    return auth;
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      const auth = {
        token: "",
        existingUser: true,
        success: false,
      };
      return auth;
    } else {
      const auth = {
        token: "",
        existingUser: false,
        success: false,
      };
      return auth;
    }
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  authFailed = {
    id: "-1",
    forename: "NOT FOUND",
    surname: "NOT FOUND",
    email: email,
    token: "N/A",
    success: false,
  };
  try {
    admin.hash = await bcrypt.hash(admin.password, admin.salt);
    const adminCon = await firebase
      .auth()
      .signInWithEmailAndPassword(admin.email, admin.hash);
    const user = await getUserByEmail(email);
    if (user) {
      if (checkPassword(password, user.password)) {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, user.password);
        const token = response.user.getIdToken();
        return {
          id: user.id,
          forename: user.forename,
          surname: user.surname,
          email: user.email,
          token: token,
          success: true,
        };
      } else {
        console.log("Password Miss Match");
        return authFailed;
      }
    } else {
      console.log("User Not Found");
      return authFailed;
    }
  } catch (error) {
    console.log(error.message);
    return authFailed;
  }
};
const createFirebaseUser = async (email, password, signInOption) => {
  switch (signInOption) {
    case signInOptions.emailAndPassword:
      const auth = await createUserWithEmailAndPassword(email, password);
      return auth;
    case signInOptions.googleAuth:
  }
};
const signInFirebaseUser = async (email, password, signInOption) => {
  switch (signInOption) {
    case signInOptions.emailAndPassword:
      const auth = await signInWithEmailAndPassword(email, password);
      return auth;
    case signInOptions.googleAuth:
  }
};
module.exports = {
  signInOptions,
  activeUser,
  encrypt,
  checkUser,
  checkEmail,
  checkPassword,
  cacheUser,
  clearCache,
  authUser,
  createFirebaseUser,
  signInFirebaseUser,
};
