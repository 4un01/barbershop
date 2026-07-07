const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');

async function checkIfLoggedIn(){
    try{
        const response = await fetch('/auth/status')
        if(response.ok){
            const resJson = await response.json();
            if(resJson.loggedIn){
                const loginBtn = document.getElementById('loginBtn');
                loginBtn.textContent = 'Log Out';
                loginBtn.href = '';
                loginBtn.addEventListener('click', logout);
            }
        }else{
            loginBtn.textContent = 'Log In';
        }
    }catch(e){
        console.log(e.message);
    }
}

function logout(){
    
}


checkIfLoggedIn();
menuBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'flex';});
closeBtn.addEventListener('click', () => {document.querySelector('.sidebar').style.display = 'none';})