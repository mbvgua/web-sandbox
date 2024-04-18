console.log('begin script execution')

let btn = document.querySelector('#btn')	//grab the logo menu icon
let sidebar = document.querySelector('.sidebar')	//grab the sidebar

console.log('got the variables')

btn.onclick = function() {
	sidebar.classList.toggle('active');
	console.log('status changed to active')
}
