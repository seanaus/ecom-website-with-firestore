// const localStorage = require("local-storage");
const firebase = require("../db");
const { addUser } = require("../core/user");
const {
  encrypt,
  checkUser,
  checkEmail,
  cacheUser,
  clearCache,
  authUser,
  createFirebaseUser,
  signInFirebaseUser,
} = require("../core/auth");

// const createNew = async (req, res, next) => {
//     try {
//         if (req.body.email !== undefined) {
//             //Check email address is unique
//             const userExists = await checkEmail(req.body.email);
//             if (!userExists) {
//                 //Encrypt password and save user data to firebase
//                 const password = await encrypt(req.body.password);
//                 const user = await addUser(
//                     req.body.forename,
//                     req.body.surname,
//                     req.body.email,
//                     password
//                 );
//                 //Cache user data to Local Storeage
//                 if (user) {
//                     cacheUser(user);
//                 } else {
//                     console.log("Error saving new user!");
//                 }
//             } else {
//                 console.log("User's email address already exists");
//             }
//         } else {
//             console.log("Email address not supplied!");
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     next();
// };
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
// const logIn = async (req, res, next) => {
//   try {
//     if (req.body.email !== undefined) {
//       const user = await checkUser(req.body.email, req.body.password);
//       if (user) {
//         cacheUser(user);
//       }
//     } else {
//       console.log("no email entry");
//     }
//   } catch (error) {
//     res.status(403);
//     res.redirect("logIn");
//     // console.log(error.message);
//   }
//   next();
// };
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
