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
            const hotels = await response.json() as []
            
        return hotels 
        } catch(error){
            console.error(`the error is ${error}`)
        }
    }

    async updateHotelsUI(){
        let hotels = await this.getHotels()

        let html = ''
        hotels.slice(0,10).forEach(hotel =>{

            // destructure the hotel array
            let id = hotel.id
            let name = hotel.name
            let photo = hotel.photo1
            let rates = hotel.price


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
            </div>`
        })

        hotelDiv.innerHTML = html

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
        tours.forEach(tour =>{

            html += `<div class="destination-card" id="${tour.id}">
                        <div class="img">
                            <img src="${tour.photo1}" alt="destination pic">
                        </div>
                            <p class="title"> ${tour.name} </p>
                            <p class="price"> $ ${tour.price} </p>
                        <button id="book-destination"> book destination</button>
                    </div>`
        })

        tourDiv.innerHTML = html

    }
}


const hotelsInstance = new hotelOperations()
const toursInstance = new tourOperations()

// invoke the classes
hotelsInstance
toursInstance