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
const displayUiInstance = new displayUi();
displayUiInstance;
