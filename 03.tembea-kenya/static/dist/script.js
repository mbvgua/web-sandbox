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
                let hotels = yield response.json();
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
            console.log(hotels);
            let html = '';
            hotels.forEach(hotel => {
                // // destructure the hotel array
                // let id = hotel.id
                // let name = hotel.name
                // let description = hotel.description
                // let url = hotel.url
                // let price = hotel.price
                html += `<div class="hotel-card" pid="${hotel.id}">
                <div class="img">
                    <img src="${hotel.url}" alt="hotel pic">
                </div>
                <div class="content">

                    <p class="title"> ${hotel.name} </p>
                    <p class="desc"> ${hotel.description}</p>
                    <p class="price"> $ ${hotel.price} </p>
                    <button class="info" id="book-hotel" onclick="hotelsInstance.bookHotel()"> see full itenerary <i class='bx bx-right-arrow-alt'></i></i></button>
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
    bookHotel() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('radaaaa') -> now it works
            const formDiv = document.querySelector('.form-container-hotels');
            formDiv.style.display = 'block';
            // const
        });
    }
    closeHotelForm() {
        return __awaiter(this, void 0, void 0, function* () {
            const closeDivBtn = document.querySelector('#close-btn');
            const formDiv = document.querySelector('.form-container-hotels');
            closeDivBtn.addEventListener('click', (event) => {
                event.preventDefault();
                // console.log(event.target.parentElement.parentElement)
                // event.target.parentElement.parentElement,dispay = 'none'
                formDiv.style.display = 'none';
                /* i think has the problem for chaining.
                next time revamp the app.. instead use functionality for appendig and
                removing thre respective
                */
            });
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
            tours.forEach((tour) => {
                html += `
            <div class="destination-card" pid="${tour.id}">
                <div class="img">
                    <img src="${tour.url}" alt="tour pic">
                </div>
                <div class="content">

                    <p class="title"> ${tour.name} </p>
                    <p class="price"> $ ${tour.price} </p>

                    <button class="info" onclick="toursInstance.bookTour()"> book tour </button>
                </div>
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
    bookTour() {
        return __awaiter(this, void 0, void 0, function* () {
            const formDiv = document.querySelector('.form-container-tours');
            formDiv.style.display = 'block';
        });
    }
}
// // signup form popup class
// class bookingForm{
//         constructor(){
//                 this.showForm()
//             }
//         async showForm(){
//             const bookHotel = document.querySelector('#book-hotel')! as HTMLElement
//             const bookTour = document.querySelector('#book-tour')! as HTMLElement
//             bookHotel.addEventListener('click', (event)=>{
//                 event.preventDefault()
//                 console.log('ayeeee')
//             })
//             bookTour.addEventListener('click', (event)=>{
//                 event.preventDefault()
//                 console.log('ayeyaah')
//             })
//     }
// }
const hotelsInstance = new hotelOperations();
const toursInstance = new tourOperations();
// const bookingInstance = new bookingForm()
// invoke the classes
hotelsInstance;
hotelsInstance.hotelsDropdown();
hotelsInstance.closeHotelForm();
toursInstance;
toursInstance.toursDropdown();
// bookingInstance
