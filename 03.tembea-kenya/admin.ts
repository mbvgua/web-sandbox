console.log('hello world')

// get the various form variables
const users = document.querySelector('#users')! as HTMLElement
const hotels = document.querySelector('#hotels')! as HTMLElement
const tours = document.querySelector('#tours')! as HTMLElement
const offers = document.querySelector('#offers')! as HTMLElement
const bookings = document.querySelector('#bookings')! as HTMLElement

const mainDiv = document.querySelector('.main-content')! as HTMLElement
const usersDiv = document.querySelector('#users-div')! as HTMLElement
const hotelsDiv = document.querySelector('#hotels-div')! as HTMLElement
const toursDiv = document.querySelector('#tours-div')! as HTMLElement
const offersDiv = document.querySelector('#offers-div')! as HTMLElement
const bookingsDiv = document.querySelector('#bookings-div')! as HTMLElement

class displayUi{
    constructor(){
        this.displayDivs()
        
    }

    async displayDivs(){
        // events listeners for different divs to display respective info
        users.addEventListener('mousedown', ()=>{
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        users.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            usersDiv.style.display = 'block'
            usersDiv.style.visibility = 'visible'
        })
        hotels.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            toursDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        hotels.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            hotelsDiv.style.display = 'block'
            hotelsDiv.style.visibility = 'visible'
        })
        tours.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
            bookingsDiv.style.display = 'none'
        })
        tours.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            toursDiv.style.display = 'block'
            toursDiv.style.visibility = 'visible'
        })
        bookings.addEventListener('mousedown', ()=>{
            usersDiv.style.display = 'none'
            toursDiv.style.display = 'none'
            hotelsDiv.style.display = 'none'
        })
        bookings.addEventListener('mouseup', ()=>{
            mainDiv.style.display = 'flex'
            bookingsDiv.style.display = 'block'
            bookingsDiv.style.visibility = 'visible'
        })

    }


}

const displayUiInstance = new displayUi()
displayUiInstance


