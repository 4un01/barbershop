const days = document.querySelector('.days');
const today = new Date();
const currentDate = new Date();
const monthAndYear = document.getElementById('monthAndYear');
const months = [
    'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December' 
];
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('nxt');

async function checkIfUserCanAccessPage(){
    const res = await checkIfLoggedIn();
    if(!res){
        window.location.href = '/auth.html';
    }else{
        return;
    }
}

function calender(date){
    days.textContent = '';

    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthAndYear.textContent = `${months[month]} ${year}`;

    addDaysOfWeek();

    const lastDatePrevMonth = new Date(year, month, 0).getDate();
    const lastDay = new Date(year, month + 1, 0).getDay();

    addDaysBefore(firstDay, lastDatePrevMonth);
    addDays(lastDate, month, year);
    addDaysAfter(lastDay);
}

function addDaysOfWeek(){
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    
    for(let i = 0; i < daysOfWeek.length; i++){
        const dayOfWeek = document.createElement('p');
        dayOfWeek.textContent = daysOfWeek[i];
        days.appendChild(dayOfWeek);
    };
    return;
}

function addDaysBefore(firstDay, lastDatePrevMonth){
    for(let j = firstDay; j > 0; j--){
        const daysBefore = document.createElement('p');
        daysBefore.textContent = lastDatePrevMonth - j + 1;
        daysBefore.classList.add('daysBefore');
        daysBefore.addEventListener('click', () => selectTodayBefore(daysBefore));
        days.appendChild(daysBefore);
    };
    return;
}

function addDays(lastDate, month, year){
    for(let i = 1; i <= lastDate; i++){
        const day = document.createElement('p');
        day.textContent = i;
        day.classList.add('day');
        if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
            day.id = 'today';
            const date = new Date(year, month, i);
            getBookingTimes(date);
        }
        day.addEventListener('click', () => selectToday(day, month, year)); 
        days.appendChild(day);
    };
    return;
}

function addDaysAfter(lastDay){
    let nextMonthsDateCount = 0;
    for(let k = lastDay; k < 6; k++){
        nextMonthsDateCount++;
        const daysAfter = document.createElement('p');
        daysAfter.textContent = nextMonthsDateCount;
        daysAfter.classList.add('daysAfter');
        daysAfter.addEventListener('click', () => selectTodayAfter(daysAfter));
        days.appendChild(daysAfter);
    };
    return;
}

function selectToday(day, month, year){
    const currentToday = document.getElementById('today');
        if(currentToday){
        currentToday.removeAttribute('id');
    }
    day.id = 'today';
    const date = new Date(year, month, day.textContent);
    getBookingTimes(date);
}

function selectTodayBefore(daysBefore){
    currentDate.setMonth(currentDate.getMonth() - 1);
    const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysBefore.textContent);
    const bookingTimeContainer = document.querySelector('.bookingTimeContainer');
    bookingTimeContainer.style.display = 'none';
    calender(thisDate); 
}

function selectTodayAfter(daysAfter){
    currentDate.setMonth(currentDate.getMonth() + 1);
    const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysAfter.textContent);
    const bookingTimeContainer = document.querySelector('.bookingTimeContainer');
    bookingTimeContainer.style.display = 'none';
    calender(thisDate); 
}

async function getBookingTimes(date){
    try{
        const response = await fetch('/booking/times', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({date: date})
        });

        if(response.ok){
            const availableHours = await response.json();
            const bookingTimeContainer = document.querySelector('.bookingTimeContainer');
            bookingTimeContainer.style.display = 'flex';
            const timeContainer = document.querySelector('.timeContainer');
            timeContainer.textContent = '';
            availableHours.forEach(hour => {
                const time = document.createElement('div');
                time.textContent = hour;
                time.classList.add('times');
                time.addEventListener('click', () => bookTime(hour, date));
                timeContainer.appendChild(time);
            });
        }else{
            throw new Error('Something went wrong in the getBookingTimes Function');
        }
    }catch(e){
        console.log(e.message);
    }
}

async function bookTime(hour, date){
    const [h, m] = hour.split(':');
    const bookingDateAndTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    bookingDateAndTime.setHours(h, m, 0, 0);

    try{
        const response = await fetch('/booking/book', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({startsAt: bookingDateAndTime})
        });

        if(response.ok){
            window.location.href = './myBookings'
        }else{
            throw new Error();
        }
    }catch(e){
        console.log(e.message)
    }
}

checkIfUserCanBook();
calender(today);
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    const bookingTimeContainer = document.querySelector('.bookingTimeContainer');
    bookingTimeContainer.style.display = 'none';
    calender(currentDate);
});
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    const bookingTimeContainer = document.querySelector('.bookingTimeContainer');
    bookingTimeContainer.style.display = 'none';
    calender(currentDate);
});