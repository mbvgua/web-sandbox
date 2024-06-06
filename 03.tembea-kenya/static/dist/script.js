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
// get all the major urls
// import {hotelsUrl,usersUrl,bookingsUrl,toursUrl} from './admin.ts'
const hotelsUrl = 'http://localhost:3000/hotels';
const toursUrl = 'http://localhost:3000/tours';
const usersUrl = 'http://localhost:3000/users';
const bookingsUrl = 'http://localhost:3000/bookings';
// get the webpage div elements 
const hotelDiv = document.querySelector('.hotel-div');
const tourDiv = document.querySelector('.tour-div');
// let hotels:[] = []
// console.log(hotels)
// class to fetch data from the 
class hotelOperations {
    constructor() {
        this.getHotels()
            .then(() => {
            this.updateHotelsUI();
        });
    }
    // let hotels:{} = {}
    getHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(hotelsUrl);
                const hotels = yield response.json();
                return hotels;
            }
            catch (error) {
                console.error(`the error is ${error}`);
            }
        });
    }
    updateHotelsUI() {
        return __awaiter(this, void 0, void 0, function* () {
            let hotels = yield this.getHotels();
            let html = '';
            hotels.forEach(hotel => {
                // destructure the hotel array
                let id = hotel.id;
                let name = hotel.name;
                let photo = hotel.photo1;
                let rates = hotel.price;
                html += `<div class="hotel-card" pid="${id}">
                <div class="img">
                    <img src="${photo}" alt="hotel pic">
                </div>
                <div class="content">

                    <p class="title"> ${name} </p>
                    <p class="desc"> Go placidly amid the noise and haste and remember what peace there may be in silence</p>
                    <p class="price"> $ ${rates} </p>
                    <p class="info" id="book-hotel"> see full itenerary <i class='bx bx-right-arrow-alt'></i></i></p>
                    <p>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                    </p>
                </div>
            </div>`;
            });
            hotelDiv.innerHTML = html;
        });
    }
    hotelsDropdown() {
        return __awaiter(this, void 0, void 0, function* () {
            let hotels = yield this.getHotels();
            const hotelsDropdown = document.querySelector('.hotel-dropdown');
            let html = '';
            hotels.forEach((hotel) => {
                html += `<a href="#">${hotel.name}</a>`;
            });
            hotelsDropdown.innerHTML = html;
        });
    }
}
class tourOperations {
    constructor() {
        this.getTours()
            .then(() => {
            this.updateToursUI();
        });
    }
    // let hotels:{} = {}
    getTours() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(toursUrl);
                const tours = yield response.json();
                return tours;
            }
            catch (error) {
                console.error(`the error is ${error}`);
            }
        });
    }
    updateToursUI() {
        return __awaiter(this, void 0, void 0, function* () {
            let tours = yield this.getTours();
            let html = '';
            tours.forEach(tour => {
                html += `<div class="destination-card" id="${tour.id}">
                        <div class="img">
                            <img src="${tour.photo1}" alt="destination pic">
                        </div>
                            <p class="title"> ${tour.name} </p>
                            <p class="price"> $ ${tour.price} </p>
                        <button id="book-destination"> book destination</button>
                    </div>`;
            });
            tourDiv.innerHTML = html;
        });
    }
    toursDropdown() {
        return __awaiter(this, void 0, void 0, function* () {
            let tours = yield this.getTours();
            const toursDropdown = document.querySelector('.tour-dropdown');
            let html = '';
            tours.forEach((tour) => {
                html += `<a href="#">${tour.name}</a>`;
            });
            toursDropdown.innerHTML = html;
        });
    }
}
const hotelsInstance = new hotelOperations();
const toursInstance = new tourOperations();
// invoke the classes
hotelsInstance;
hotelsInstance.hotelsDropdown();
toursInstance;
toursInstance.toursDropdown();
