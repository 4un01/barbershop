const days = document.querySelector('.days');

function test(){
    for(let i =1; i <= 31; i++){
        const day = document.createElement('p')
        day.textContent = i;
        day.classList.add('day');
        days.appendChild(day);
    }
}

test();