const myBookings = document.querySelector('.myBookings');
const booking = document.querySelector('.booking');
const date = document.querySelector('.date');
const time = document.querySelector('.time');


async function getBookings(){
    try{
        const response = await fetch('/booking/myBookings');

        if(response.ok){
            const bookingInfo = await response.json();
            renderBookings(bookingInfo);
        }else{
            throw new Error();
        }
    }catch(e){
        console.log(e.message)
    }
};

function renderBookings(bookingInfo){
    const {day, date, month, time} = bookingInfo;

    const myBookings = document.querySelector('.myBookings');
    const booking = document.createElement('div');
    booking.classList.add('booking');
    myBookings.appendChild(booking);
    const date = document.createElement('div');
    date.classList.add('date');
    booking.appendChild(date);
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    booking.appendChild(timeDiv);

    const dayDOM = document.createElement('p');
    dayDOM.textContent = day;
    date.appendChild(dayDOM);

    const dateDOM = document.createElement('h4');
    dateDOM.textContent = date;
    date.appendChild(dateDOM);

    const monthDOM = document.createElement('p');
    monthDOM.textContent = month;
    date.appendChild(monthDOM);

    const timeDOM = document.createElement('h4');
    timeDOM,textContent = time;
    timeDiv.appendChild(timeDOM);
}

checkIfUserCanAccessPage();