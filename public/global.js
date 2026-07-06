const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const loginBtn = document.getElementById('loginBtn');


menuBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'flex';});
closeBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'none';})
loginBtn.addEventListener('click', () => {window.location.href = '/auth.html'});