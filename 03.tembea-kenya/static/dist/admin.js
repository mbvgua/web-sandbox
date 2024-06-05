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
const users = document.querySelector('#users');
const hotels = document.querySelector('#hotels');
const tours = document.querySelector('#tours');
const offers = document.querySelector('#offers');
const bookings = document.querySelector('#bookings');
const mainDiv = document.querySelector('.main-content');
const usersDiv = document.querySelector('#users-div');
const hotelsDiv = document.querySelector('#hotels-div');
const toursDiv = document.querySelector('#tours-div');
const offersDiv = document.querySelector('#offers-div');
const bookingsDiv = document.querySelector('#bookings-div');
const adminResponseDiv = document.querySelector('.response');
// html variables for appending data into tale
const addUsersDiv = document.querySelector('.append-users');
const addHotelsDiv = document.querySelector('.append-hotels');
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
            users.addEventListener('mousedown', () => {
                toursDiv.style.display = 'none';
                hotelsDiv.style.display = 'none';
                bookingsDiv.style.display = 'none';
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
            });
            bookings.addEventListener('mouseup', () => {
                mainDiv.style.display = 'flex';
                bookingsDiv.style.display = 'block';
                bookingsDiv.style.visibility = 'visible';
            });
        });
    }
}
class usersAdmin {
    // private users: usersData[]
    constructor() {
        this.showUser();
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
                    <button id="delete-existing-user"> Delete </button>
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
            let users = JSON.parse(localStorage.getItem('users'));
            // console.log(users)
            const deleteBtn = document.querySelector('#delete-existing-user');
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem(id);
            });
        });
    }
    updateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('radaaa.. lunj bado');
            // fetch users from db
            // allow for crud operations
        });
    }
}
class hotelsAdmin {
    constructor() {
        this.addHotel();
    }
    addHotel() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(hotelsUrl);
            let hotels = yield response.json();
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
    deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = this.addUser();
            deleteUserBtn.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('radaaa.. lunj bado');
            });
            // fetch users from db
            // allow for crud operations
        });
    }
    updateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            // allow for crud operations
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // instantiate all the classes
    const displayUiInstance = new displayUi();
    const usersAdminInstance = new usersAdmin();
    const hotelsAdminInstance = new hotelsAdmin();
    // const toursAdminInstance = new toursAdmin()
    // const hotelsAdminInstance = new hotelsAdmin()
    // const bookingsAdminInstance = new bookingsAdmin()
    // invoke them
    displayUiInstance;
    usersAdminInstance;
    usersAdminInstance.addUser();
    usersAdminInstance.deleteUser();
    hotelsAdminInstance;
    // perform various operations
});
// export {hotelsUrl,usersUrl,bookingsUrl,toursUrl}
