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
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');
const responseDiv = document.querySelector('.response');
const form = document.querySelector('form');
// define the db url
const usersUrl = 'http://localhost:3000/users';
// define enum for user roles and priviledges
var userPriviledges;
(function (userPriviledges) {
    userPriviledges["Admin"] = "admin";
    userPriviledges["Client"] = "client";
    userPriviledges["Viewer"] = "viewer";
})(userPriviledges || (userPriviledges = {}));
class loginUser {
    construtor() {
        this.validateCredentials();
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
    validateCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            // get values of every input field
            let emailVal = email.value.trim();
            let passwordVal = password.value.trim();
            if (this.isValidEmail(emailVal) && this.isValidPassword(passwordVal)) {
                // console.log('valid user inputs')
                this.setSuccess(email);
                this.setSuccess(password);
                //use promises to post data into users.json
                const userInfo = {
                    email: emailVal,
                    password: passwordVal,
                    priviledges: userPriviledges.Client,
                };
                try {
                    const response = yield fetch(usersUrl);
                    const users = yield response.json();
                    // console.log(users)
                    if (users.length > 0) {
                        // check if user exists in db
                        // remove type any here
                        const validUser = users.find((user) => user.email === emailVal);
                        if (validUser.password === passwordVal) {
                            responseDiv.style.display = 'flex';
                            responseDiv.style.visibility = 'visible';
                            responseDiv.innerHTML = `<label> Welcome back,${validUser.username}! </label>`;
                            setTimeout(() => {
                                // redirect to homepage. NOT WORKING AS EXPECTED!!!
                                window.location.href = 'index.html';
                            }, 3000);
                        }
                        else if (validUser.password !== passwordVal) {
                            responseDiv.style.display = 'flex';
                            responseDiv.style.visibility = 'visible';
                            responseDiv.style.backgroundColor = 'rgb(231, 44, 15)';
                            responseDiv.innerHTML = `<label> Looks like you entered an incorrect password. Try again? </label>`;
                        }
                    }
                    else if (users.length == 0) {
                        responseDiv.style.display = 'flex';
                        responseDiv.style.visibility = 'visible';
                        responseDiv.style.backgroundColor = 'rgb(231, 44, 15)';
                        responseDiv.innerHTML = '<label> Looks like you need to first create an account </label>';
                    }
                }
                catch (error) {
                    console.error(`Failed to login user into due to database: ${error}`);
                }
            }
            else if (!this.isValidEmail(emailVal)) {
                this.setError(email, 'Please use a valid email address');
            }
            else if (!this.isValidPassword(passwordVal)) {
                this.setError(password, 'Password must have a minimum of 8 characters contain lowercase and uppercase letters, a digit and special characters');
            }
        });
    }
}
// instantiate the class
const loginUserInstance = new loginUser();
// add event listener to on form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    loginUserInstance.validateCredentials();
});
