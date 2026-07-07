const signupLink = document.getElementById('signupLink')
const loginLink = document.getElementById('loginLink')
const signupBtn = document.getElementById('signupBtn');
const login = document.getElementById('login');

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

function getSignupDetails(){
    const name = document.getElementById('name');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPass');

    const userDetails = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    return userDetails;
}
async function sendSignupDetails(){
    const userDetails = getSignupDetails();
    const {name, email, password} = userDetails;

    try{
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        });
        if(response.ok){
            const responseTxt = await response.text();
            if(responseTxt === 'success'){
                window.location.href = '/';
            }
        }else{
            throw new Error('Something went wrong when signing up');
        }
    }catch(e){
        console.log(e.message);
    }
}

function getloginDetails(){
    const email = document.getElementById('email');
    const password = document.getElementById('loginPass');

    const userDetails = {
        email: email.value,
        password: password.value
    };

    return userDetails;
}
async function sendLoginDetails(){
    const userDetails = getloginDetails();

    try{
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        });
        if(response.ok){
            const responseTxt = await response.text();
            if(responseTxt === 'exists'){
                window.location.href = '/';
            }else{
                throw new Error();
            }
        }
    }catch(e){
        console.log(e.message);
    }
}

signupLink.addEventListener('click', switchCards);
loginLink.addEventListener('click', switchCards);
signupBtn.addEventListener('click', sendSignupDetails);
login.addEventListener('click', sendLoginDetails);