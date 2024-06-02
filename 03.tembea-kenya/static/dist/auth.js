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
/**********MAIN PAGE ANIMATION************/
const displaySignIn = document.querySelector('#sign-in-btn');
const displaySignUp = document.querySelector('#sign-up-btn');
const mainContainer = document.querySelector('.container');
displaySignUp.addEventListener('click', () => {
    mainContainer.classList.add('sign-up-mode');
});
displaySignIn.addEventListener('click', () => {
    mainContainer.classList.remove('sign-up-mode');
});
/*********BEGIN USER AUTHENTICATION********/
const signInBtn = document.querySelector('#login');
const signUpBtn = document.querySelector('#register');
const registerEmail = document.querySelector('#register-email');
const registerUsername = document.querySelector('#register-username');
const registerPassword = document.querySelector('#register-password');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
// define the db url
const usersUrl = 'http://localhost:3000/users';
// define enum for user roles and priviledges
var userPriviledges;
(function (userPriviledges) {
    userPriviledges["Admin"] = "admin";
    userPriviledges["Client"] = "client";
    userPriviledges["Viewer"] = "viewer";
})(userPriviledges || (userPriviledges = {}));
class registerNewUser {
    // let  userInfo: userData
    constructor() {
        this.getUserData();
    }
    // method to ge the user data
    getUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            const email = registerEmail.value.trim();
            const username = registerUsername.value.trim();
            const password = registerPassword.value.trim();
            console.log(email, username, password);
            const userInfo = {
                email: email,
                username: username,
                password: password,
                priviledges: userPriviledges.Client,
            };
            if (yield this.validateUserData(email, username, password)) {
                try {
                    const response = yield fetch(usersUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userInfo)
                    });
                    if (response.ok) {
                        window.location.href = 'index.html';
                    }
                    else {
                        console.log('error adding user to db');
                    }
                }
                catch (error) {
                    console.error(`Failed to save user data into database: ${error}`);
                }
            }
            else {
                alert('an error occured!');
            }
        });
    }
    // method to validated inputted user data
    // tried to use regex but failed utterly.. consult on the best way to do that
    validateUserData(email, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            // this is dump. values cant be null as i already put input required in html
            if (email.trim() == '' || password.trim() == '' || (username === null || username === void 0 ? void 0 : username.trim()) == '') {
                return false;
            }
            else {
                return true;
            }
        });
    }
}
// class loginExistingUser(){
// }
// instantiate the classes
const userInstance = new registerNewUser();
signInBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('sign in button has been clicked')  //worked!
});
signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('sign up button has been clicked')  //worked!
    userInstance.getUserData();
    // .then(()=>{
    //     userInstance.
    // })
});
