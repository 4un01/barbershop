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
    const lastDay = new Date(year, month + 1, 0).getDate();

    monthAndYear.textContent = `${months[month]} ${year}`;

    for(let i = 1; i <= lastDay; i++){
        const day = document.createElement('p');
        day.textContent = i;
        day.classList.add('day');
        if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
            day.classList.add('today');
        } 
        days.appendChild(day);
    };
}

renderDays(today);