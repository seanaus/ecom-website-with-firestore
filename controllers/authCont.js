// const localStorage = require("local-storage");
const firebase = require("../db");
const { addUser } = require("../core/user");
const {
  encrypt,
  cacheUser,
  clearCache,
  authUser,
  createFirebaseUser,
  signInFirebaseUser,
} = require("../core/auth");

const createNew = async (req, res, next) => {
  try {
    const password = await encrypt(req.body.password);
    const auth = await createFirebaseUser(req.body.email, password, 0);

    if (auth.existingUser) {
      res.redirect("/logIn");
    } else {
      auth.forename = req.body.forename;
      auth.surname = req.body.surname;
      auth.email = req.body.email;

      auth.id = await addUser(
        auth.forename,
        auth.surname,
        auth.email,
        password
      );
      auth.success = auth.success && auth.id ? true : false;
    }
    if (auth.success) {
      cacheUser(auth);
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
const logIn = async (req, res, next) => {
  try {
    const auth = await signInFirebaseUser(req.body.email, req.body.password, 0);
    if (auth.success) {
      cacheUser(auth);
    }
  } catch (error) {
    res.status(403);
    res.redirect("logIn");
  }
  next();
};

const logOut = (req, res, next) => {
  clearCache();
  next();
};
const authGuard = (req, res, next) => {
  const user = authUser();
  if (!user) {
    res.status(403);
    return res.redirect("logIn");
  }
  next();
};
module.exports = {
  createNew,
  logIn,
  logOut,
  authGuard,
};
