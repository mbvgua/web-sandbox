"use strict";
console.log('hello world');
/**********MAIN PAGE ANIMATION************/
const signInBtn = document.querySelector('#sign-in-btn');
const signUpBtn = document.querySelector('#sign-up-btn');
const mainContainer = document.querySelector('.container');
signUpBtn.addEventListener('click', () => {
    mainContainer.classList.add('sign-up-mode');
});
signInBtn.addEventListener('click', () => {
    mainContainer.classList.remove('sign-up-mode');
});
