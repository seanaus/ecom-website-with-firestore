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
// const authId = () => {
//   const auth = auth();
//   if (auth) {
//     return auth.id;
//   } else {
//     return false;
//   }
// };
export { auth };
