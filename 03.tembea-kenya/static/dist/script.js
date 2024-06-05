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
const hotelsUrl = 'http://localhost:3000/hotels';
const toursUrl = 'http://localhost:3000/tours';
const usersUrl = 'http://localhost:3000/users';
const bookingsUrl = 'http://localhost:3000/bookings';
// get the webpage div elements 
const hotelDiv = document.querySelector('.hotel-div');
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
            hotels.slice(0, 10).forEach(hotel => {
                // destructure the hotel array
                let id = hotel.hotel_id;
                let name = hotel.hotel_name;
                let photo = hotel.photo1;
                let rates = hotel.rates_from;
                html += `<div class="hotel-card" pid="${id}">
                <div class="img">
                    <img src="${photo}" alt="hotel pic">
                </div>
                <div class="content">

                    <p class="title"> ${name} </p>
                    <p class="desc"> Go placidly amid the noise and haste and remember what peace there may be in silence</p>
                    <p class="price"> $ ${rates} </p>
                    <p class="info"> see full itenerary <i class='bx bx-right-arrow-alt'></i></i></p>
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
}
const hotelsInstance = new hotelOperations();
hotelsInstance;
