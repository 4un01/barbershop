const myBookings = document.querySelector('.myBookings');
const booking = document.querySelector('.booking');
const date = document.querySelector('.date');
const time = document.querySelector('.time');


async function getBookings(){
    try{
        const response = await fetch('/booking/myBookings');

        if(response.ok){
            const bookingsInfo = await response.json();
            bookingsInfo.forEach(bookingInfo => {
                renderBookings(bookingInfo);
            });
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

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    booking.appendChild(dateDiv);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    booking.appendChild(timeDiv);

    const dayDOM = document.createElement('p');
    dayDOM.textContent = day;
    dateDiv.appendChild(dayDOM);

    const dateDOM = document.createElement('h4');
    dateDOM.textContent = date;
    dateDiv.appendChild(dateDOM);

    const monthDOM = document.createElement('p');
    monthDOM.textContent = month;
    dateDiv.appendChild(monthDOM);

    const timeDOM = document.createElement('h4');
    timeDOM.textContent = time;
    timeDiv.appendChild(timeDOM);
}

checkIfUserCanAccessPage();
getBookings();