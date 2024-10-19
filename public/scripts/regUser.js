import Cookies from './cookiesJob.js';

//this is a script that controlls all activity on register window.

const errorMsg = document.getElementById('regErrorMsg');
const login = document.getElementById('regLoginInput')
const email = document.getElementById('regEmailInput');
const password = document.getElementById('regPasswordInput');
const name = document.getElementById('regNameInput');

//Render login/reg window depends on which button was clicked
const destination = window.destination;
if (!destination || destination == 'login') {
    document.getElementById('loginBox').style.display = 'block'
} else {
    document.getElementById('registerBox').style.display = 'block'
}

//Switch windowi to login
const handleSwitchToLogin = (event) => {
    event.preventDefault();

    document.getElementById('registerBox').style.display= "none";
    document.getElementById('loginBox').style.display = "block"
};

document.getElementById('switchToLogin').addEventListener('click', handleSwitchToLogin);

//'Submit' button click handler
const handleSubmitReg = async (event) => {
    event.preventDefault();

    //validating given data
    if(!login.value || !validateLogin(login.value)) { displayError('Login must include only letters and digits and {6,36} lenght')}
    else if (!email.value) {displayError('Email is required')}
    else if (!name.value || !validateName(name.value)) {displayError('Name must be {6,36} lenght')}
    else if (!password.value || !validatePassword(password.value)) {displayError('Password must contain only characters from specialset: A-Z, a-z, 0-9 !@$%&*?[] and have atleast one letter and one digit ')}
    else {

        // body for request
        const body = {
            login: login.value,
            email: email.value,
            password: password.value,
            name: name.value,
        };

    //will get 'data' object with {userId, email, token(jwt)} 
        const response = await fetch(`/createUser`, {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=utf-8'},
            body: JSON.stringify(body), 
        });
        if(response.status == 201){
            const data = await response.json();
            //const authToken = `${data.data.userId}//${data.data.token}`; 
            //Cookies.setCookie('authToken', authToken, 7);
            window.location.href = '/'

            //handling 'creating a account that already exists' situation
        } else if(response.status == 400) {
            const data = await response.json();
            displayError(data.error); }
        else{ displayError('Server error!'); }
    }
};

document.getElementById('submitReg').addEventListener('click', handleSubmitReg);


//some helpers
function validateLogin(userLogin){
    const pattern = /^[A-Za-z0-9]{6,36}$/;
    return pattern.test(userLogin);
}

function validateName(userName){
    const pattern = /.{6,36}/;
    return pattern.test(userName);
}

function validatePassword(userPassword){
    const pattern = /(?=.*[a-z])(?=.*\d)[A-Za-z0-9\d@$%&!*?\[\]]{8,20}/;
    return pattern.test(userPassword);
}

function displayError(errorText){
    errorMsg.style.display = 'block';
    errorMsg.textContent = errorText;
}
