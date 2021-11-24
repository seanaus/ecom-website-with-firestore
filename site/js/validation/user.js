const form = document.getElementById("register");
const foreName = document.getElementById("forename");
const surName = document.getElementById("surname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const fornameErrors = document.getElementById("forname-errors");
const surnameErrors = document.getElementById("surname-errors");
const emailErrors = document.getElementById("email-errors");
const passwordErrors = document.getElementById("password-errors");

form.addEventListener("submit", (event) => {
    let message = "";
    let valid = true;

    if (password.value.length <= 6) {
        message = "Password must be longer than 6 characters";
        passwordErrors.innerText = message;
        passwordErrors.classList.remove("hideMe");
        valid = false;
    }

    if (password.value.length >= 20) {
        message = "Password must be less than 20 characters";
        passwordErrors.innerText = message;
        passwordErrors.classList.remove("hideMe");
        valid = false;
    }

    if (password.value !== password2.value) {
        message = "Passwords do not match";
        passwordErrors.innerText = message;
        passwordErrors.classList.remove("hideMe");
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
    }

});
password.addEventListener("keypress", (event) => {
    passwordErrors.classList.add("hideMe");
});
password2.addEventListener("keypress", (event) => {
    passwordErrors.classList.add("hideMe");
});