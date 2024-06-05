console.log('hello world')


// get the various form variables
const users = document.querySelector('#users')! as HTMLElement
const hotels = document.querySelector('#hotels')! as HTMLElement
const tours = document.querySelector('#tours')! as HTMLElement
const offers = document.querySelector('#offers')! as HTMLElement
const bookings = document.querySelector('#bookings')! as HTMLElement

const mainDiv = document.querySelector('.main-content')! as HTMLElement
const usersDiv = document.querySelector('#users-div')! as HTMLElement
const hotelsDiv = document.querySelector('#hotels-div')! as HTMLElement
const toursDiv = document.querySelector('#tours-div')! as HTMLElement
const offersDiv = document.querySelector('#offers-div')! as HTMLElement
const bookingsDiv = document.querySelector('#bookings-div')! as HTMLElement
const adminResponseDiv = document.querySelector('.response')! as HTMLDivElement

// html variables for appending data into tale
const addUsersDiv = document.querySelector('.append-users')! as HTMLElement
const addHotelsDiv = document.querySelector('.append-hotels')! as HTMLElement
// const deleteUserBtn = document.querySelector('.delete-user')! as HTMLElement
// const updateUserBtn = document.querySelector('.update-user')! as HTMLElement

// import the db url
const hotelsUrl = 'http://localhost:3000/hotels'
const toursUrl = 'http://localhost:3000/tours'
const usersUrl = 'http://localhost:3000/users'
const bookingsUrl = 'http://localhost:3000/bookings'

// // define the various interfaces
// type usersData = {
//     id: string,
//     name:string,
//     username: string,
//     privildege: string,
// }

class displayUi{
    constructor(){
        this.displayDivs()
        
    }

    async displayDivs(){
        // events listeners for different divs to display respective info
        users.addEventListener('mousedown', ()=>{
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        users.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            usersDiv.style.display = 'block'
            usersDiv.style.visibility = 'visible'
        })
        hotels.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            toursDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        hotels.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            hotelsDiv.style.display = 'block'
            hotelsDiv.style.visibility = 'visible'
        })
        tours.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        tours.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            toursDiv.style.display = 'block'
            toursDiv.style.visibility = 'visible'
        })
        bookings.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
        })
        bookings.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            bookingsDiv.style.display = 'block'
            bookingsDiv.style.visibility = 'visible'
        })

    }


}


class usersAdmin{
    // private users: usersData[]

    constructor(){
        this.showUser()
    }

    async showUser():Promise<void>{
        // fetch users from db
        const response=  await fetch (usersUrl)
        let users = await response.json()
        localStorage.setItem('users', JSON.stringify(users))
        // console.log(users)
        
        // add users to the existing table
        let html = ``
        users.forEach((user)=>{
            html += `
                <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.priviledges}</td>
                <td class="actions">
                    <button id="delete-existing-user"> Delete </button>
              </td>
                </tr>`
        })
        addUsersDiv.innerHTML = html
        // allow for crud operations

        return users
    }

    async addUser(){
        const emailInput = document.getElementById('add-email')! as HTMLInputElement
        const usernameInput = document.getElementById('add-username')! as HTMLInputElement
        const passwordInput = document.getElementById('add-password')! as HTMLInputElement
        const priviledgesInput = document.getElementById('add-priviledges')! as HTMLInputElement

        const addUserBtn = document.getElementById('add-new-user')! as HTMLButtonElement

        addUserBtn.addEventListener('click', (event)=>{
            event.preventDefault()

            let email:string = emailInput.value.trim()
            let username:string = usernameInput.value.trim()
            let password:string = passwordInput.value.trim()
            let priviledges:string = priviledgesInput.value.trim()

            const newUser = {
                email,
                username,
                password,
                priviledges
            }

            try{
                const response = fetch(usersUrl, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });

                if (response.ok) {
                    alert('new user added succesfully')
                } 

            } catch(error){
                console.log(error)
            }
        })




    }


    async deleteUser(id:string){
        let users: string | null = JSON.parse(localStorage.getItem('users'))
        // console.log(users)

        const deleteBtn = document.querySelector('#delete-existing-user')! as HTMLButtonElement
        
        deleteBtn.addEventListener('click', (event)=>{
            event.preventDefault()
            localStorage.removeItem(id)
        })
    }
    
    async updateUser(){
        console.log('radaaa.. lunj bado')

        // fetch users from db
        // allow for crud operations
    }
    
}

class hotelsAdmin{

    constructor(){
        this.addHotel()
    }

    async addHotel():Promise<void>{
        // fetch users from db
        const response=  await fetch (hotelsUrl)
        let hotels = await response.json()
        // console.log(hotels)
        
        // add hotels to the existing table
        let html = ``
        hotels.forEach((hotel)=>{
            html += `
                <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${hotel.location}</td>
                <td>${hotel.star_rating}</td>
                <td>${hotel.price}</td>
                <td class="actions">
                    <button> Delete </button>
              </td>
                </tr>`
        })
        addHotelsDiv.innerHTML = html
        // allow for crud operations

        return hotels
    }

    async deleteUser(){
        let users = this.addUser()

        deleteUserBtn.addEventListener('click', (event)=>{
            event.preventDefault()
            console.log('radaaa.. lunj bado')
        })

        // fetch users from db
        // allow for crud operations
    }
    
    async updateUser(){
        // fetch users from db
        // allow for crud operations
    }
    
}




document.addEventListener('DOMContentLoaded', ()=>{

    // instantiate all the classes
    const displayUiInstance = new displayUi()
    const usersAdminInstance = new usersAdmin()
    const hotelsAdminInstance = new hotelsAdmin()
    // const toursAdminInstance = new toursAdmin()
    // const hotelsAdminInstance = new hotelsAdmin()
    // const bookingsAdminInstance = new bookingsAdmin()

    // invoke them
    displayUiInstance

    usersAdminInstance
    usersAdminInstance.addUser() 
    usersAdminInstance.deleteUser() 
        
 

    hotelsAdminInstance

    // perform various operations

})


// export {hotelsUrl,usersUrl,bookingsUrl,toursUrl}

