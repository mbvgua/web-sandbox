"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('hello world');
//define all the constants
const email = document.querySelector('#register-email');
const username = document.querySelector('#register-username');
const password = document.querySelector('#register-password');
const form = document.querySelector('form');
const signUpBtn = document.querySelector('#register');
const responseDiv = document.querySelector('.response');
// define the db url
const usersUrl = 'http://localhost:3000/users';
// define enum for user roles and priviledges
var userPriviledges;
(function (userPriviledges) {
    userPriviledges["Admin"] = "admin";
    userPriviledges["Client"] = "client";
})(userPriviledges || (userPriviledges = {}));
/*define the sigup class
look for a way to export reusable code chunks into auth.js then import into
signup and login.js respectively to avoid code duplication*/
class signupUser {
    construtor() {
        this.validateInputs();
    }
    // define error method
    setError(element, message) {
        const inputControll = element.parentElement;
        const displayError = inputControll.querySelector('.error');
        displayError.innerText = message;
        inputControll.classList.add('error');
        inputControll.classList.remove('success');
    }
    // define the succes method
    setSuccess(element) {
        const inputControll = element.parentElement;
        const displayError = inputControll.querySelector('.error');
        displayError.innerText = '';
        inputControll.classList.add('success');
        inputControll.classList.remove('error');
    }
    // username validation regex
    isValidUsername(username) {
        const userUsername = String(username).toLowerCase();
        const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]*$/;
        return usernameRegex.test(userUsername);
    }
    // email validation regex
    isValidEmail(email) {
        const userEmail = String(email).toLowerCase();
        // find a better regex
        const emailRegex = /^[A-Za-z0-9. _-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}/;
        return emailRegex.test(userEmail);
    }
    // password validation regex
    isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/;
        return passwordRegex.test(password);
    }
    validateInputs() {
        return __awaiter(this, void 0, void 0, function* () {
            // get values of every input field
            let emailVal = email.value.trim();
            let usernameVal = username.value.trim();
            let passwordVal = password.value.trim();
            if (this.isValidEmail(emailVal) && (this.isValidUsername(usernameVal)) && this.isValidPassword(passwordVal)) {
                // console.log('valid user inputs')
                this.setSuccess(email);
                this.setSuccess(username);
                this.setSuccess(password);
                //use promises to post data into users.json
                const userInfo = {
                    email: emailVal,
                    username: usernameVal,
                    password: passwordVal,
                    priviledges: userPriviledges.Client,
                };
                try {
                    const response = yield fetch(usersUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userInfo)
                    });
                    if (response.ok) {
                        // here is where ill add the timeout to allow display succes text
                        responseDiv.style.display = 'flex';
                        responseDiv.style.visibility = 'visible';
                        responseDiv.innerHTML = '<label> Congratulations! You have successfully created an account</label>';
                        setTimeout(() => {
                            // redirect to homepage. NOT WORKING AS EXPECTED!!!
                            window.location.href = 'index.html';
                        }, 3000);
                    }
                    else if (!response.ok) {
                        /*where ill add login to ensure email is unique. how would i do that in the
                        backend side of things with pyhton and still achieve integrartion in ts?*/
                        responseDiv.style.display = 'flex';
                        responseDiv.style.visibility = 'visible';
                        responseDiv.style.backgroundColor = 'rgb(231, 44, 15)';
                        responseDiv.innerHTML = '<label> An error occured while creating your account. Try again? </label>';
                    }
                }
                catch (error) {
                    console.error(`Failed to save user data into database: ${error}`);
                }
            }
            else if (!this.isValidEmail(emailVal)) {
                this.setError(email, 'Please use a valid email address');
            }
            else if (!this.isValidUsername(usernameVal)) {
                this.setError(username, 'Usernames must have only letters, numbers, dots or underscores');
            }
            else if (!this.isValidPassword(passwordVal)) {
                this.setError(password, 'Password must have a minimum of 8 characters contain lowercase and uppercase letters, a digit and special characters');
            }
        });
    }
}
// instantiate the class
const signupUserInstance = new signupUser();
// add event listener to on form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    signupUserInstance.validateInputs();
});
// export{}
