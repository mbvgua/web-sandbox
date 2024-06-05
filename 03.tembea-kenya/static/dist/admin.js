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
// html variables for appending data into tale
const addUsersDiv = document.querySelector('.append-users');
const addHotelsDiv = document.querySelector('.append-hotels');
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
    // constructor(users: usersData[]){
    constructor() {
        // this.users = users
        this.addUser();
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch users from db
            const response = yield fetch(usersUrl);
            let users = yield response.json();
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
                    <button> Update </button>
                    <button> Delete </button>
              </td>
                </tr>`;
            });
            addUsersDiv.innerHTML = html;
            // allow for crud operations
            return users;
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
                <td>${hotel.photo_1}</td>
                <td>${hotel.location}</td>
                <td>${hotel.star_rating}</td>
                <td>${hotel.price}</td>
                <td class="actions">
                    <button> Update </button>
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
    hotelsAdminInstance;
    // perform various operations
});
// export {hotelsUrl,usersUrl,bookingsUrl,toursUrl}
