const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');


menuBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'flex';});
closeBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'none';})