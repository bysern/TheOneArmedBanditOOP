//dumny data
const account1 = {
    firstName: "John",
    email: "john@gmail.com",
    password: "1111",
};
const account2 = {
    firstName: "Tom",
    email: "tom@gmail.com",
    password: "qwerty",
};

const accounts = [account1, account2];
const inputLoginEmail = document.getElementById('email_input');
const inputLoginPassword = document.getElementById("password_input");
const btnLogin = document.querySelector('.loginBtn');
const containerApp = document.querySelector('.app');


//login logic
let currentAccount;
btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.email === inputLoginEmail.value);
    console.log(currentAccount);

    //if password ok display ui
    if(currentAccount?.password === inputLoginPassword.value){
        document.getElementById("welcome").textContent=`Welcome back ${currentAccount.firstName}!`;
        containerApp.style.opacity=1;

    //clear inputs
    inputLoginEmail.value = inputLoginPassword.value = '';
    }
})