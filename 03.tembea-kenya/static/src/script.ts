console.log('hello world')

// get all the major urls
// import {hotelsUrl,usersUrl,bookingsUrl,toursUrl} from './admin.ts'
const hotelsUrl = 'http://localhost:3000/hotels'
const toursUrl = 'http://localhost:3000/tours'
const usersUrl = 'http://localhost:3000/users'
const bookingsUrl = 'http://localhost:3000/bookings'


// get the webpage div elements 
const hotelDiv = document.querySelector('.hotel-div')! as HTMLDivElement
const tourDiv = document.querySelector('.tour-div')! as HTMLDivElement

// let hotels:[] = []
// console.log(hotels)

// class to fetch data from the 
class hotelOperations{
    public constructor(){
        this.getHotels()
        .then(()=>{
            this.updateHotelsUI()
        })
    }
    
    // let hotels:{} = {}
    async getHotels():Promise<T>{

        try{
            const response = await fetch(hotelsUrl)
            let hotels = await response.json() as []
            
        return hotels 
        } catch(error){
            console.error(`the error is ${error}`)
        }
    }

    async updateHotelsUI(){
        let hotels = await this.getHotels()
        console.log(hotels)

        let html = ''
        hotels.forEach(hotel =>{

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
            </div>`
        })

        hotelDiv.innerHTML = html

    }

    async hotelsDropdown(){
        let hotels = await this.getHotels()
        const hotelsDropdown = document.querySelector('.hotel-dropdown')! as HTMLElement
        let html = ''

        hotels.forEach((hotel):void=>{
            html += `<a href="#">${hotel.name}</a>`
        })

        hotelsDropdown.innerHTML = html
    }

    async bookHotel(){
        // console.log('radaaaa') -> now it works
        const formDiv = document.querySelector('.form-container-hotels')! as HTMLFormElement
        formDiv.style.display = 'block'

        // const
    }

    async closeHotelForm(){
        const closeDivBtn = document.querySelector('#close-btn')! as HTMLButtonElement
        const formDiv = document.querySelector('.form-container-hotels')! as HTMLFormElement
        
        closeDivBtn.addEventListener('click', (event)=>{
            event.preventDefault()
            // console.log(event.target.parentElement.parentElement)
            // event.target.parentElement.parentElement,dispay = 'none'
            formDiv.style.display = 'none'
            /* i think has the problem for chaining.
            next time revamp the app.. instead use functionality for appendig and
            removing thre respective
            */ 

        })
    }

}

class tourOperations{
    public constructor(){
        this.getTours()
        .then(()=>{
            this.updateToursUI()
        })
    }
    
    // let hotels:{} = {}
    async getTours():Promise<T>{

        try{
            const response = await fetch(toursUrl)
            const tours = await response.json() as []
            
        return tours 
        } catch(error){
            console.error(`the error is ${error}`)
        }
    }

    async updateToursUI(){
        let tours = await this.getTours()

        let html = ''
        tours.forEach((tour) =>{

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
            </div>`
        })

        tourDiv.innerHTML = html

    }
    
    async toursDropdown(){
        let tours = await this.getTours()
        const toursDropdown = document.querySelector('.tour-dropdown')! as HTMLElement
        let html = ''
        
        tours.forEach((tour):void=>{
            html += `<a href="#">${tour.name}</a>`
        })
        
        toursDropdown.innerHTML = html
    }
    
    async bookTour(){
        const formDiv = document.querySelector('.form-container-tours')! as HTMLFormElement
        formDiv.style.display = 'block'

        


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

const hotelsInstance = new hotelOperations()
const toursInstance = new tourOperations()
// const bookingInstance = new bookingForm()

// invoke the classes
hotelsInstance
hotelsInstance.hotelsDropdown()
hotelsInstance.closeHotelForm()


toursInstance
toursInstance.toursDropdown()

// bookingInstance