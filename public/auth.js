const signupLink = document.getElementById('signupLink')
const loginLink = document.getElementById('loginLink')

function switchCards(e){
    e.preventDefault();

    const signupCard = document.querySelector('.signupCard');
    const loginCard = document.querySelector('.loginCard');

    if(signupCard.style.display === 'none' && loginCard.style.display === 'flex'){
        signupCard.style.display = 'flex';
        loginCard.style.display = 'none';
    }else{
        signupCard.style.display = 'none';
        loginCard.style.display = 'flex';
    }
}

signupLink.addEventListener('click', switchCards);
loginLink.addEventListener('click', switchCards);