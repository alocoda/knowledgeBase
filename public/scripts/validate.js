const pwd = document.getElementById('pwd1');
const confirm_pwd = document.getElementById('pwd2');

validatePwd = () => {
    if(pwd.value != confirm_pwd.value) {
        confirm_pwd.setCustomValidity('Passwords Do Not Match');
    } else {
        confirm_pwd.setCustomValidity('');
    }
}

pwd.onchange = validatePwd;
confirm_pwd.onkeyup = validatePwd;