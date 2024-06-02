console.log('hello world')

const email = document.querySelector('#login-email')! as HTMLInputElement
const password = document.querySelector('#login-password')! as HTMLInputElement
const responseDiv = document.querySelector('.response')! as HTMLDivElement
const form = document.querySelector('form')! as HTMLFormElement

// define the db url
const usersUrl:string = 'http://localhost:3000/users' 

// define enum for user roles and priviledges
enum userPriviledges {
    Admin = 'admin',
    Client = 'client',
    Viewer = 'viewer',
}

// define type for user input data
type loginData = {
    // id: number | string
    email: string
    password: string
    priviledges?: string
}

class loginUser{
    protected construtor(){
        this.validateCredentials()
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

    async validateCredentials(){
        // get values of every input field
        let emailVal = email.value.trim()
        let passwordVal = password.value.trim()

        if (this.isValidEmail(emailVal) && this.isValidPassword(passwordVal)){
            // console.log('valid user inputs')
            this.setSuccess(email)
            this.setSuccess(password)
            
            //use promises to post data into users.json
            const userInfo:loginData = {
                email : emailVal,
                password : passwordVal,
                priviledges: userPriviledges.Client,
            }

            try{
                const response = await fetch(usersUrl)
                const users: {id:string, username:string, password:string, email:string}[] = await response.json()
                // console.log(users)
                if (users.length > 0){
                    // check if user exists in db
                    // remove type any here
                    const validUser:any = users.find((user)=> user.email === emailVal)

                    if (validUser.password === passwordVal){
                        responseDiv.style.display = 'flex'
                        responseDiv.style.visibility = 'visible'
                        responseDiv.innerHTML = `<label> Welcome back,${validUser.username}! </label>`
                        
                        setTimeout(()=>{    
                            // redirect to homepage. NOT WORKING AS EXPECTED!!!
                            window.location.href = 'index.html'    
                        },3000)

                    } else if(validUser.password !== passwordVal){
                        responseDiv.style.display = 'flex'
                        responseDiv.style.visibility = 'visible'
                        responseDiv.style.backgroundColor = 'rgb(231, 44, 15)'
                        responseDiv.innerHTML = `<label> Looks like you entered an incorrect password. Try again? </label>`
                    }

                } else if(users.length == 0){
                    responseDiv.style.display = 'flex'
                    responseDiv.style.visibility = 'visible'
                    responseDiv.style.backgroundColor = 'rgb(231, 44, 15)'
                    responseDiv.innerHTML = '<label> Looks like you need to first create an account </label>'
                }
            } catch(error){
                console.error(`Failed to login user into due to database: ${error}`)
            }
            
        } else if (!this.isValidEmail(emailVal)){
            this.setError(email, 'Please use a valid email address')
        } else if(!this.isValidPassword(passwordVal)){
            this.setError(password,'Password must have a minimum of 8 characters contain lowercase and uppercase letters, a digit and special characters')
        }

    }

}


// instantiate the class
const loginUserInstance = new loginUser()


// add event listener to on form submission
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    loginUserInstance.validateCredentials()
})
