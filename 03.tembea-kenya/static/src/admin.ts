console.log('hello world')


// get the various form variables
const home = document.querySelector('#home')! as HTMLElement
const users = document.querySelector('#users')! as HTMLElement
const hotels = document.querySelector('#hotels')! as HTMLElement
const tours = document.querySelector('#tours')! as HTMLElement
const offers = document.querySelector('#offers')! as HTMLElement
const bookings = document.querySelector('#bookings')! as HTMLElement

const mainDiv = document.querySelector('.main-content')! as HTMLElement
const homeDiv = document.querySelector('#home-div')! as HTMLElement
const usersDiv = document.querySelector('#users-div')! as HTMLElement
const hotelsDiv = document.querySelector('#hotels-div')! as HTMLElement
const toursDiv = document.querySelector('#tours-div')! as HTMLElement
const offersDiv = document.querySelector('#offers-div')! as HTMLElement
const bookingsDiv = document.querySelector('#bookings-div')! as HTMLElement
const adminResponseDiv = document.querySelector('.response')! as HTMLDivElement

// html variables for appending data into tale
const addUsersDiv = document.querySelector('.append-users')! as HTMLElement
const addHotelsDiv = document.querySelector('.append-hotels')! as HTMLElement
const addToursDiv = document.querySelector('.append-tours')! as HTMLElement
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
        home.addEventListener('mousedown', ()=>{
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
            usersDiv.style.display = 'none'
        })
        home.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            homeDiv.style.display = 'block'
            homeDiv.style.visibility = 'visible'
        })
        users.addEventListener('mousedown', ()=>{
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
            homeDiv.style.display = 'none'
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
            homeDiv.style.display = 'none'
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
            homeDiv.style.display = 'none'
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
            homeDiv.style.display = 'none'
        })
        bookings.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            bookingsDiv.style.display = 'block'
            bookingsDiv.style.visibility = 'visible'
        })

    }

    async logoutAdmin(){
        const logoutBtn = document.querySelector('#logout')! as HTMLButtonElement

        logoutBtn.addEventListener('click', (event)=>{
            event.preventDefault()
            window.location.href = 'login.html'
        })
    }


}



class usersAdmin{
    // private users: usersData[]

    constructor(){
        this.showUser()
        // this.deleteUser(id)
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
                    <button id="delete-user" onclick="this.removeUser(${user.id})"> Delete </button>
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


    async deleteUser(id:string):Promise<void>{
        await fetch(`http://localhost:3000/users/${id}`,{
            method: 'DELETE',
        })
    }

    async removeUser(id:string){
        const deleteBtn = document.querySelector('#delete-user')! as HTMLButtonElement
        deleteBtn.addEventListener('click',()=>{
            this.deleteUser(id)
        })
    }
    
    // async updateUser(){
    //     console.log('radaaa.. lunj bado')

    // }
    
}



class hotelsAdmin{

    constructor(){
        this.showHotel()
    }

    async showHotel():Promise<void>{
        // fetch users from db
        const response=  await fetch (hotelsUrl)
        let hotels = await response.json()
        localStorage.setItem('hotels', JSON.stringify(hotels))

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

    async addHotel(){
        const hotelNameInput = document.getElementById('add-hotel-name')! as HTMLInputElement
        const locationInput = document.getElementById('add-location')! as HTMLInputElement
        const urlInput = document.getElementById('add-image-url')! as HTMLInputElement
        const descInput = document.getElementById('add-description')! as HTMLInputElement
        const starsInput = document.getElementById('add-star-rating')! as HTMLInputElement
        const priceInput = document.getElementById('add-price')! as HTMLInputElement

        const addHotelBtn = document.getElementById('add-new-hotel')! as HTMLButtonElement

        addHotelBtn.addEventListener('click', (event)=>{
            event.preventDefault()

            let hotelName:string = hotelNameInput.value.trim()
            let location:string = locationInput.value.trim()
            let url:string = urlInput.value.trim()
            let description:string = descInput.value.trim()
            let stars:string = starsInput.value.trim()
            let price:string = priceInput.value.trim()

            const newHotel = {
                name : hotelName,
                location,
                url,
                description,
                star_rating : stars,
                price
            }

            try{
                const response = fetch(hotelsUrl, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newHotel)
                });

                if (response.ok) {
                    alert('new hotel added succesfully')
                } 

            } catch(error){
                console.log(error)
            }
        })




    }
    
    // async updateHotel(){
    //     console.log('radaaa.. lunj bado')

    // }
    
}



class toursAdmin{

    constructor(){
        this.showTour()
    }

    async showTour():Promise<void>{
        // fetch users from db
        const response=  await fetch (toursUrl)
        let tours = await response.json()
        localStorage.setItem('tours', JSON.stringify(tours))
        // console.log(tours)
        
        // add tours to the existing table
        let html = ``
        tours.forEach((tour)=>{
            html += `
                <tr>
                <td>${tour.id}</td>
                <td>${tour.name}</td>
                <td>${tour.destination}</td>
                <td>${tour.description}</td>
                <td>${tour.price}</td>
                <td class="actions">
                    <button> Delete </button>
              </td>
                </tr>`
        })
        addToursDiv.innerHTML = html
        // allow for crud operations

        return tours
    }

    async addTour(){
        const tourNameInput = document.getElementById('add-tour-name')! as HTMLInputElement
        const destinationInput = document.getElementById('add-destination')! as HTMLInputElement
        const descriptionInput = document.getElementById('add-description')! as HTMLInputElement
        const urlInput = document.getElementById('add-url')! as HTMLInputElement
        const priceInput = document.getElementById('add-price')! as HTMLInputElement

        const addTourBtn = document.getElementById('add-new-tour')! as HTMLButtonElement

        addTourBtn.addEventListener('click', (event)=>{
            event.preventDefault()

            let tourName:string = tourNameInput.value.trim()
            let destination:string = destinationInput.value.trim()
            let url:string = urlInput.value.trim()
            let description:string = descriptionInput.value.trim()
            let price:string = priceInput.value.trim()

            const newTour = {
                name: tourName,
                destination,
                url,
                description,
                price
            }

            try{
                const response = fetch(toursUrl, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTour)
                });

                if (response.ok) {
                    alert('new hotel added succesfully')
                } 

            } catch(error){
                console.log(error)
            }
        })




    }
    
    // async updateHotel(){
    //     console.log('radaaa.. lunj bado')

    // }
    
}



class bookingsAdmin{

    constructor(){
        this.showBookings()
    }

    async showBookings():Promise<void>{
        // fetch users from db
        const response=  await fetch (bookingsUrl)
        let bookings = await response.json()
        localStorage.setItem('bookings', JSON.stringify(bookings))
        // console.log(bookings)
        
        // add bookings to the existing table
        let html = ``
        bookings.forEach((booking)=>{
            // ----------achieve this functionality!!!!
            // const {id:string, username:string, email:string} = booking.user
            // const {name:string,destination:string,price:number} = booking.tour
            // const {name:string, location:string} = booking.hotel
            html += `
                <tr>
                <td>${booking.id}</td>
                <td>${booking.id}</td>
                <td>${booking.id}</td>
                <td>${booking.id}</td>
                <td>${booking.id}</td>
                <td class="actions">
                    <button> Delete </button>
              </td>
                </tr>`
        })
        addBookingsDiv.innerHTML = html
        // allow for crud operations

        return bookings
    }

    // async addBooking(){
    //     const tourNameInput = document.getElementById('add-tour-name')! as HTMLInputElement
    //     const destinationInput = document.getElementById('add-destination')! as HTMLInputElement
    //     const descriptionInput = document.getElementById('add-description')! as HTMLInputElement
    //     const priceInput = document.getElementById('add-price')! as HTMLInputElement

    //     const addTourBtn = document.getElementById('add-new-tour')! as HTMLButtonElement

    //     addTourBtn.addEventListener('click', (event)=>{
    //         event.preventDefault()

    //         let tourName:string = tourNameInput.value.trim()
    //         let destination:string = destinationInput.value.trim()
    //         let description:string = descriptionInput.value.trim()
    //         let price:string = priceInput.value.trim()

    //         const newTour = {
    //             name: tourName,
    //             destination,
    //             description,
    //             price
    //         }

    //         try{
    //             const response = fetch(toursUrl, {
    //                 method: "POST",
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(newTour)
    //             });

    //             if (response.ok) {
    //                 alert('new hotel added succesfully')
    //             } 

    //         } catch(error){
    //             console.log(error)
    //         }
    //     })




    }
    
    // async updateHotel(){
    //     console.log('radaaa.. lunj bado')

    // }
    




document.addEventListener('DOMContentLoaded', ()=>{

    // instantiate all the classes
    const displayUiInstance = new displayUi()
    const usersAdminInstance = new usersAdmin()
    const hotelsAdminInstance = new hotelsAdmin()
    const toursAdminInstance = new toursAdmin()
    // const hotelsAdminInstance = new hotelsAdmin()
    // const bookingsAdminInstance = new bookingsAdmin()

    // invoke them
    displayUiInstance
    displayUiInstance.logoutAdmin()

    usersAdminInstance
    usersAdminInstance.addUser() 
    // usersAdminInstance.deleteUser(id) 
        
 

    hotelsAdminInstance
    hotelsAdminInstance.addHotel()

    toursAdminInstance
    toursAdminInstance.addTour()


    // perform various operations

})

// export {hotelsUrl,usersUrl,bookingsUrl,toursUrl}

