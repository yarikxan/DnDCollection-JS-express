import Cookies from './cookiesJob.js';

//this is a script that controlls all activities on login window

const errorMsg = document.getElementById('errorMsg');
const login = document.getElementById('loginInput');
const password = document.getElementById('passwordInput');

//switch window to registration
const handleSwitchToReg = (event) => {
    event.preventDefault()

    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('registerBox').style.display = 'block';
};

document.getElementById('switchToReg').addEventListener('click', handleSwitchToReg);

//switch window to reset password
const handleSwitchToReset = (event) => {
    event.preventDefault();

    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('resetPasswordBox').style.display = 'block';
};
document.getElementById('resetPassword').addEventListener('click', handleSwitchToReset);

//'Submit' button click handler
const handleSubmitLogin = async (event) => {
    event.preventDefault();

    if(!login.value || !password.value) { displayError('Wrong details')}
    else {
        const userLogin = login.value;
        const userPassword = password.value;

        const body = {
            login: userLogin,
            password: userPassword,
        };
    
    //will get 'data' object with {userId, email, token(jwt)}
        const response = await fetch('/authUser', {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=utf-8'},
            body: JSON.stringify(body),
        });
        if (response.status == 200) {
            const data = await response.json();
            window.location.href = '/';

        } else if (response.status == 404) { displayError('Wrong details');}
        else {displayError('Server Error');}
    }
}

document.getElementById('submitLogin').addEventListener('click', handleSubmitLogin);

function displayError(errorText){
    errorMsg.style.display = 'block';
    errorMsg.textContent = errorText;
}
