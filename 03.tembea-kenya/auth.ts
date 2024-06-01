console.log('hello world')


/**********MAIN PAGE ANIMATION************/
const signInBtn = document.querySelector('#sign-in-btn')! as HTMLButtonElement
const signUpBtn = document.querySelector('#sign-up-btn')! as HTMLButtonElement
const mainContainer = document.querySelector('.container')! as HTMLDivElement

signUpBtn.addEventListener('click', () => {
    mainContainer.classList.add('sign-up-mode')
})

signInBtn.addEventListener('click', () => {
    mainContainer.classList.remove('sign-up-mode')
})
