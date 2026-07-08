const days = document.querySelector('.days');
const today = new Date();
const monthAndYear = document.getElementById('monthAndYear');
const months = [
    'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December' 
];


function renderDays(date){
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthAndYear.textContent = `${months[month]} ${year}`;

    const lastDatePrevMonth = new Date(year, month, 0).getDate();
    const lastDay = new Date(year, month + 1, 0).getDay();
    console.log(lastDay);
    
    for(let j = firstDay; j > 0; j--){
        const daysBefore = document.createElement('p');
        daysBefore.textContent = lastDatePrevMonth - j;
        daysBefore.classList.add('daysBefore');
        days.appendChild(daysBefore);
    };

    for(let i = 1; i <= lastDate; i++){
        const day = document.createElement('p');
        day.textContent = i;
        day.classList.add('day');
        if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
            day.classList.add('today');
        } 
        days.appendChild(day);
    };

    let nextMonthsDateCount = 0;
    for(let k = lastDay; k < 6; k++){
        nextMonthsDateCount++;
        const daysAfter = document.createElement('p');
        daysAfter.textContent = nextMonthsDateCount;
        daysAfter.classList.add('daysAfter');
        days.appendChild(daysAfter);
    }


}

renderDays(today);