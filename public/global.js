const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const loginBtn = document.getElementById('loginBtn');

async function checkIfLoggedIn(){
    try{
        const response = await fetch('/auth/status')
        if(response.ok){
            const resJson = await response.json();
            if(resJson.loggedIn){
                loginBtn.textContent = 'Log Out';
                loginBtn.href = '';
                loginBtn.addEventListener('click', logout);
                return true;
            }
        }else{
            loginBtn.textContent = 'Log In';
            loginBtn.href = './auth.html';
            loginBtn.removeEventListener('click', logout);
            return false;
        }
    }catch(e){
        console.log(e.message);
    }
}

async function logout(e){
    e.preventDefault();
    
    try{
        const response = await fetch('/auth/logout', {method: 'DELETE'});
        const resJson = await response.json();
        if(!resJson.loggedIn){
            loginBtn.textContent = 'Log In';
            loginBtn.href = './auth.html';
            return loginBtn.removeEventListener('click', logout);
            window.location.href = '/';
        }
    }catch(e){
        console.log(e.message)
    }
}


checkIfLoggedIn();
menuBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'flex';});
closeBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'none';});