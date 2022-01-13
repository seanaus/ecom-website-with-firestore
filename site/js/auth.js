// Sean Austin
// 13/01/2022
// Return signed in user information, this is set in the script section of 'navBar.ejs'
// This information is passed upto the view from the node js server and saved to the BROWSER'S localStorage
const auth = () => {
  const _auth = JSON.parse(localStorage.getItem("auth"));
  const user = {
    id: _auth.id,
    foreName: _auth.forename,
    surName: _auth.surname,
    email: _auth.email,
    token: _auth.token,
  };
  return user;
};
export { auth };
