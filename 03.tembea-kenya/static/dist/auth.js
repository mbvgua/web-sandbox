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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeDataInstance = exports.userOperationsInstance = exports.toursUrl = exports.hotelsUrl = exports.bookingsUrl = exports.usersUrl = void 0;
console.log('hello world');
// define the usersUrl
const usersUrl = 'http://localhost:3000/users';
exports.usersUrl = usersUrl;
const hotelsUrl = 'http://localhost:3000/hotels';
exports.hotelsUrl = hotelsUrl;
const toursUrl = 'http://localhost:3000/tours';
exports.toursUrl = toursUrl;
const bookingsUrl = 'http://localhost:3000/bookings';
exports.bookingsUrl = bookingsUrl;
// class to fetch users in db
class userOperations {
    constructor() {
        this.fetchUsers();
    }
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(usersUrl);
                const users = yield response.json();
                return users;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    addUsers(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(usersUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfo)
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
class storeData {
    constructor() {
        this.storeData();
    }
    storeData() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
// instantiate the class
const userOperationsInstance = new userOperations();
exports.userOperationsInstance = userOperationsInstance;
const storeDataInstance = new storeData();
exports.storeDataInstance = storeDataInstance;
