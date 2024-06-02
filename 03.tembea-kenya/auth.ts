console.log('hello world')


/**********MAIN PAGE ANIMATION************/
const displaySignIn = document.querySelector('#sign-in-btn')! as HTMLButtonElement
const displaySignUp = document.querySelector('#sign-up-btn')! as HTMLButtonElement
const mainContainer = document.querySelector('.container')! as HTMLDivElement

displaySignUp.addEventListener('click', () => {
    mainContainer.classList.add('sign-up-mode')
})

displaySignIn.addEventListener('click', () => {
    mainContainer.classList.remove('sign-up-mode')
})

/*********BEGIN USER AUTHENTICATION********/
const signInBtn = document.querySelector('#login')! as HTMLButtonElement
const signUpBtn = document.querySelector('#register')! as HTMLButtonElement
const registerEmail = document.querySelector('#register-email')! as HTMLInputElement
const registerUsername = document.querySelector('#register-username')! as HTMLInputElement
const registerPassword = document.querySelector('#register-password')! as HTMLInputElement
const loginEmail = document.querySelector('#login-email')! as HTMLInputElement
const loginPassword = document.querySelector('#login-password')! as HTMLInputElement

// define the db url
const usersUrl:string = 'http://localhost:3000/users' 


// define enum for user roles and priviledges
enum userPriviledges {
    Admin = 'admin',
    Client = 'client',
    Viewer = 'viewer',
}

// define type for user input data
type userData = {
    // id: number | string
    email: string
    username: string
    password: string
    priviledges: string
}



class registerNewUser{

    // let  userInfo: userData

    public constructor(){
        this.getUserData()
    }

    // method to ge the user data
    async getUserData(){
        const email = registerEmail.value.trim()
        const username = registerUsername.value.trim()
        const password = registerPassword.value.trim()
        console.log(email,username,password)

        const userInfo:userData = {
            email : email,
            username : username,
            password : password,
            priviledges: userPriviledges.Client,
        }

        if(await this.validateUserData(email, username,password)){
            try{
                const response = await fetch(usersUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userInfo)
                })

                if (response.ok){
                    window.location.href = 'index.html'
                } else {
                    console.log('error adding user to db')
                }

            } catch(error){
                console.error(`Failed to save user data into database: ${error}`)
            }
        } else {
            alert('an error occured!')
        }

    }

    // method to validated inputted user data
    // tried to use regex but failed utterly.. consult on the best way to do that
    async validateUserData(email:string, password:string, username?:string):Promise<boolean>{
        // this is dump. values cant be null as i already put input required in html
        if (email.trim() == '' || password.trim() == '' || username?.trim() == ''){
            return false
        } else {
            return true
        }
    }



}





// class loginExistingUser(){

// }

// instantiate the classes
const userInstance = new registerNewUser()


signInBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    // console.log('sign in button has been clicked')  //worked!
})

signUpBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    // console.log('sign up button has been clicked')  //worked!
    userInstance.getUserData()
    // .then(()=>{
    //     userInstance.
    // })

})



