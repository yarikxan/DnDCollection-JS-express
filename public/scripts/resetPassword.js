import Cookie from './cookiesJob.js';


//this is a script that controlls all actions on resetPassword window

const handleResetSwitchToLogin = (event) => {
    event.preventDefault();

    document.getElementById('resetPasswordBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
}
document.getElementById('resetSwitchToLogin').addEventListener('click', handleResetSwitchToLogin);

const emailInput = document.getElementById('resetEmailInput');
const codeInput = document.getElementById('resetCodeInput');
const passwordInput = document.getElementById('resetPasswordInput');
const errorMsg = document.getElementById('resetErrorMsg');
const infoMsg = document.getElementById('resetInfoMsg');

let email;
let secretCode;
const handleSendEmail = async (event) => {
    event.preventDefault();

    if(!emailInput.value){
        displayError('Wrong Email');
        return;
    }

    email = emailInput.value;
    const body = {
        email: email,
    }

    try {
        displayInfo('Loading...');
        const response = await fetch('/sendResetMail', {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=utf-8'},
            body: JSON.stringify(body),
        });//will get mailId, 'Mail sent' and verificationCode. or object with error description
         
        if(response.status == 500) {
            displayError('Server error');
            return;
        } else {
            const data = await response.json();
            displayInfo(data.data.msg);
            secretCode = data.data.code;
            document.getElementById('resetPasswordBtn').style.display = 'block';
            return;
        }    
    } catch(err) {
        console.log(err);
        displayError('Server Error'); 
        return; 
    }
}
document.getElementById('resetEmailBtn').addEventListener('click', handleSendEmail);


const handleResetPassword = async (event) => {
    event.preventDefault();

    if(!codeInput.value) {
        displayError('Wrong Code');
        return;
    }

    if(!passwordInput.value || !validatePassword(passwordInput.value)) {
        displayError('Password must contain only characters from specialset: A-Z, a-z, 0-9 !@$%&*?[]  and have atleast one letter and one digit');
        return;
    }
    
    const body = {
        email: email,
        resetCode: codeInput.value,
        password: passwordInput.value,
    }
    try {
        const response = await fetch('/changeUserPassword', {
            method: 'PATCH',
            headers: {'Content-type': 'application/json;charset=utf-8'},
            body: JSON.stringify(body),
        });//only status is intresting 

        if(response.status == 200){
            window.location.href = '/';
        } else {
            const data = await response.json();
            displayError(data.error);
        } 

    }catch(err){
        displayError('Server Error');
        console.log(err);
    }
}
document.getElementById('resetPasswordBtn').addEventListener('click', handleResetPassword);


function displayInfo(infoText){
    errorMsg.style.display = 'none';
    infoMsg.style.display = 'block';
    infoMsg.textContent = infoText;
}

function displayError(errorText) {
    infoMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    errorMsg.textContent = errorText;
}

function validatePassword(newPassword) {
    const pattern = /(?=.*[a-z])(?=.*\d)[A-Za-z0-9\d@$%&!*?\[\]]{8,20}/;
    return pattern.test(newPassword);
}
