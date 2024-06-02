console.log('hello world')

//define all the constants
const email = document.querySelector('#register-email')! as HTMLInputElement
const username = document.querySelector('#register-username')! as HTMLInputElement
const password = document.querySelector('#register-password')! as HTMLInputElement
const form = document.querySelector('form')! as HTMLFormElement
const signUpBtn = document.querySelector('#register')! as HTMLButtonElement
const responseDiv = document.querySelector('.response')! as HTMLDivElement

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


/*define the sigup class
look for a way to export reusable code chunks into auth.js then import into 
signup and login.js respectively to avoid code duplication*/

class signupUser{
    protected construtor(){
        this.validateInputs()
    }

    // define error method
    setError(element:HTMLInputElement, message:string){
        const inputControll:HTMLDivElement = element.parentElement
        const displayError:HTMLDivElement = inputControll.querySelector('.error')

        displayError.innerText = message
        inputControll.classList.add('error')
        inputControll.classList.remove('success')
    }

    // define the succes method
    setSuccess(element:HTMLInputElement){
        const inputControll:HTMLDivElement = element.parentElement
        const displayError:HTMLDivElement = inputControll.querySelector('.error')

        displayError.innerText = ''
        inputControll.classList.add('success')
        inputControll.classList.remove('error')
    }

    // username validation regex
    isValidUsername(username:string){
        const userUsername = String(username).toLowerCase()
        const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]*$/

        return usernameRegex.test(userUsername)
    }

    // email validation regex
    isValidEmail(email:string){
        const userEmail = String(email).toLowerCase()
        // find a better regex
        const emailRegex = /^[A-Za-z0-9. _-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}/
        
        return emailRegex.test(userEmail)
    }

    // password validation regex
    isValidPassword(password:string){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/

        return passwordRegex.test(password)
    }

    async validateInputs(){
        // get values of every input field
        let emailVal = email.value.trim()
        let usernameVal = username.value.trim()
        let passwordVal = password.value.trim()

        if (this.isValidEmail(emailVal) && (this.isValidUsername(usernameVal)) && this.isValidPassword(passwordVal)){
            // console.log('valid user inputs')
            this.setSuccess(email)
            this.setSuccess(username)
            this.setSuccess(password)
            
            //use promises to post data into users.json
            const userInfo:userData = {
                email : emailVal,
                username : usernameVal,
                password : passwordVal,
                priviledges: userPriviledges.Client,
            }

            try{
                const response = await fetch(usersUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userInfo)
                })

                if (response.ok){
                    // here is where ill add the timeout to allow display succes text
                    responseDiv.style.display = 'flex'
                    responseDiv.style.visibility = 'visible'
                    responseDiv.innerHTML = '<label> Congratulations! You have successfully created an account</label>'
                    
                    setTimeout(()=>{    
                        // redirect to homepage. NOT WORKING AS EXPECTED!!!
                        window.location.href = 'index.html'    
                    },3000)
                } else if (!response.ok){
                    /*where ill add login to ensure email is unique. how would i do that in the 
                    backend side of things with pyhton and still achieve integrartion in ts?*/
                    responseDiv.style.display = 'flex'
                    responseDiv.style.visibility = 'visible'
                    responseDiv.style.backgroundColor = 'rgb(231, 44, 15)'
                    responseDiv.innerHTML = '<label> An error occured while creating your account. Try again? </label>'
            }
            } catch(error){
                console.error(`Failed to save user data into database: ${error}`)
            }
            
        } else if (!this.isValidEmail(emailVal)){
            this.setError(email, 'Please use a valid email address')
        } else if(!this.isValidUsername(usernameVal)){
            this.setError(username,'Usernames must have only letters, numbers, dots or underscores')
        } else if(!this.isValidPassword(passwordVal)){
            this.setError(password,'Password must have a minimum of 8 characters contain lowercase and uppercase letters, a digit and special characters')
        }

    }

}


// instantiate the class
const signupUserInstance = new signupUser()


// add event listener to on form submission
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    signupUserInstance.validateInputs()
})

// export{}