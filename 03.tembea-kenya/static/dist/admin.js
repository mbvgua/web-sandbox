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
// get the various form variables
const home = document.querySelector('#home');
const users = document.querySelector('#users');
const hotels = document.querySelector('#hotels');
const tours = document.querySelector('#tours');
const offers = document.querySelector('#offers');
const bookings = document.querySelector('#bookings');
const mainDiv = document.querySelector('.main-content');
const homeDiv = document.querySelector('#home-div');
const usersDiv = document.querySelector('#users-div');
const hotelsDiv = document.querySelector('#hotels-div');
const toursDiv = document.querySelector('#tours-div');
const offersDiv = document.querySelector('#offers-div');
const bookingsDiv = document.querySelector('#bookings-div');
const adminResponseDiv = document.querySelector('.response');
// html variables for appending data into tale
const addUsersDiv = document.querySelector('.append-users');
const addHotelsDiv = document.querySelector('.append-hotels');
const addToursDiv = document.querySelector('.append-tours');
// const deleteUserBtn = document.querySelector('.delete-user')! as HTMLElement
// const updateUserBtn = document.querySelector('.update-user')! as HTMLElement
// import the db url
const hotelsUrl = 'http://localhost:3000/hotels';
const toursUrl = 'http://localhost:3000/tours';
const usersUrl = 'http://localhost:3000/users';
const bookingsUrl = 'http://localhost:3000/bookings';
// // define the various interfaces
// type usersData = {
//     id: string,
//     name:string,
//     username: string,
//     privildege: string,
// }
class displayUi {
    constructor() {
        this.displayDivs();
    }
    displayDivs() {
        return __awaiter(this, void 0, void 0, function* () {
            // events listeners for different divs to display respective info
            home.addEventListener('mousedown', () => {
                toursDiv.style.display = 'none';
                hotelsDiv.style.display = 'none';
                bookingsDiv.style.display = 'none';
                usersDiv.style.display = 'none';
            });
            home.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                homeDiv.style.display = 'block';
                homeDiv.style.visibility = 'visible';
            });
            users.addEventListener('mousedown', () => {
                toursDiv.style.display = 'none';
                hotelsDiv.style.display = 'none';
                bookingsDiv.style.display = 'none';
                homeDiv.style.display = 'none';
            });
            users.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                usersDiv.style.display = 'block';
                usersDiv.style.visibility = 'visible';
            });
            hotels.addEventListener('mousedown', () => {
                usersDiv.style.display = 'none';
                toursDiv.style.display = 'none';
                bookingsDiv.style.display = 'none';
                homeDiv.style.display = 'none';
            });
            hotels.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                hotelsDiv.style.display = 'block';
                hotelsDiv.style.visibility = 'visible';
            });
            tours.addEventListener('mousedown', () => {
                usersDiv.style.display = 'none';
                hotelsDiv.style.display = 'none';
                bookingsDiv.style.display = 'none';
                homeDiv.style.display = 'none';
            });
            tours.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                toursDiv.style.display = 'block';
                toursDiv.style.visibility = 'visible';
            });
            bookings.addEventListener('mousedown', () => {
                usersDiv.style.display = 'none';
                toursDiv.style.display = 'none';
                hotelsDiv.style.display = 'none';
                homeDiv.style.display = 'none';
            });
            bookings.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                bookingsDiv.style.display = 'block';
                bookingsDiv.style.visibility = 'visible';
            });
        });
    }
    logoutAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const logoutBtn = document.querySelector('#logout');
            logoutBtn.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = 'login.html';
            });
        });
    }
}
class usersAdmin {
    // private users: usersData[]
    constructor() {
        this.showUser();
        // this.deleteUser(id)
    }
    showUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(usersUrl);
            let users = yield response.json();
            localStorage.setItem('users', JSON.stringify(users));
            // console.log(users)
            // add users to the existing table
            let html = ``;
            users.forEach((user) => {
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
                </tr>`;
            });
            addUsersDiv.innerHTML = html;
            // allow for crud operations
            return users;
        });
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const emailInput = document.getElementById('add-email');
            const usernameInput = document.getElementById('add-username');
            const passwordInput = document.getElementById('add-password');
            const priviledgesInput = document.getElementById('add-priviledges');
            const addUserBtn = document.getElementById('add-new-user');
            addUserBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let email = emailInput.value.trim();
                let username = usernameInput.value.trim();
                let password = passwordInput.value.trim();
                let priviledges = priviledgesInput.value.trim();
                const newUser = {
                    email,
                    username,
                    password,
                    priviledges
                };
                try {
                    const response = fetch(usersUrl, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newUser)
                    });
                    if (response.ok) {
                        alert('new user added succesfully');
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteBtn = document.querySelector('#delete-user');
            deleteBtn.addEventListener('click', () => {
                this.deleteUser(id);
            });
        });
    }
}
class hotelsAdmin {
    constructor() {
        this.showHotel();
    }
    showHotel() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(hotelsUrl);
            let hotels = yield response.json();
            localStorage.setItem('hotels', JSON.stringify(hotels));
            // console.log(hotels)
            // add hotels to the existing table
            let html = ``;
            hotels.forEach((hotel) => {
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
                </tr>`;
            });
            addHotelsDiv.innerHTML = html;
            // allow for crud operations
            return hotels;
        });
    }
    addHotel() {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelNameInput = document.getElementById('add-hotel-name');
            const locationInput = document.getElementById('add-location');
            const urlInput = document.getElementById('add-image-url');
            const descInput = document.getElementById('add-description');
            const starsInput = document.getElementById('add-star-rating');
            const priceInput = document.getElementById('add-price');
            const addHotelBtn = document.getElementById('add-new-hotel');
            addHotelBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let hotelName = hotelNameInput.value.trim();
                let location = locationInput.value.trim();
                let url = urlInput.value.trim();
                let description = descInput.value.trim();
                let stars = starsInput.value.trim();
                let price = priceInput.value.trim();
                const newHotel = {
                    name: hotelName,
                    location,
                    url,
                    description,
                    star_rating: stars,
                    price
                };
                try {
                    const response = fetch(hotelsUrl, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newHotel)
                    });
                    if (response.ok) {
                        alert('new hotel added succesfully');
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
}
class toursAdmin {
    constructor() {
        this.showTour();
    }
    showTour() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(toursUrl);
            let tours = yield response.json();
            localStorage.setItem('tours', JSON.stringify(tours));
            // console.log(tours)
            // add tours to the existing table
            let html = ``;
            tours.forEach((tour) => {
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
                </tr>`;
            });
            addToursDiv.innerHTML = html;
            // allow for crud operations
            return tours;
        });
    }
    addTour() {
        return __awaiter(this, void 0, void 0, function* () {
            const tourNameInput = document.getElementById('add-tour-name');
            const destinationInput = document.getElementById('add-destination');
            const descriptionInput = document.getElementById('add-description');
            const urlInput = document.getElementById('add-url');
            const priceInput = document.getElementById('add-price');
            const addTourBtn = document.getElementById('add-new-tour');
            addTourBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let tourName = tourNameInput.value.trim();
                let destination = destinationInput.value.trim();
                let url = urlInput.value.trim();
                let description = descriptionInput.value.trim();
                let price = priceInput.value.trim();
                const newTour = {
                    name: tourName,
                    destination,
                    url,
                    description,
                    price
                };
                try {
                    const response = fetch(toursUrl, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newTour)
                    });
                    if (response.ok) {
                        alert('new hotel added succesfully');
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
}
class bookingsAdmin {
    constructor() {
        this.showBookings();
    }
    showBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(bookingsUrl);
            let bookings = yield response.json();
            localStorage.setItem('bookings', JSON.stringify(bookings));
            // console.log(bookings)
            // add bookings to the existing table
            let html = ``;
            bookings.forEach((booking) => {
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
                </tr>`;
            });
            addBookingsDiv.innerHTML = html;
            // allow for crud operations
            return bookings;
        });
    }
}
// async updateHotel(){
//     console.log('radaaa.. lunj bado')
// }
document.addEventListener('DOMContentLoaded', () => {
    // instantiate all the classes
    const displayUiInstance = new displayUi();
    const usersAdminInstance = new usersAdmin();
    const hotelsAdminInstance = new hotelsAdmin();
    const toursAdminInstance = new toursAdmin();
    // const hotelsAdminInstance = new hotelsAdmin()
    // const bookingsAdminInstance = new bookingsAdmin()
    // invoke them
    displayUiInstance;
    displayUiInstance.logoutAdmin();
    usersAdminInstance;
    usersAdminInstance.addUser();
    // usersAdminInstance.deleteUser(id) 
    hotelsAdminInstance;
    hotelsAdminInstance.addHotel();
    toursAdminInstance;
    toursAdminInstance.addTour();
    // perform various operations
});
// export {hotelsUrl,usersUrl,bookingsUrl,toursUrl}
