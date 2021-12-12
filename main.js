//dumny data
const account1 = {
    firstName: "John",
    email: "john@gmail.com",
    password: "1111",
    walletAmount: 500,
};
const account2 = {
    firstName: "Tom",
    email: "tom@gmail.com",
    password: "qwerty",
    walletAmount: 300,
};
const account3 = {
    firstName: "Boll",
    email: "boll@gmail.com",
    password: "4234",
    walletAmount: 200,
};

const accounts = [account1, account2, account3];
const inputLoginEmail = document.getElementById('email_input');
const inputLoginPassword = document.getElementById("password_input");
const btnLogin = document.querySelector('.loginBtn');
const containerApp = document.querySelector('.app');
const containerAddMoneyChosen = document.querySelector('.addMoneyChosenWrap');
const containerMoneyDepositWrapper = document.querySelector('.addingMoneyOperationWrapper')
const inputDepositAmount = document.getElementById('addMoneyInput');

function getCurrentUserWalletAmount(acc){
    return acc.walletAmount;
}

//login logic
let currentAccount;
btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.email === inputLoginEmail.value);

    //if password ok display ui
    if(currentAccount?.password === inputLoginPassword.value){
        document.getElementById("welcome").textContent=`Welcome back ${currentAccount.firstName}!`;
        containerApp.style.opacity=1;

    const game = new Game(getCurrentUserWalletAmount(currentAccount));

    //clear inputs
    inputLoginEmail.value = inputLoginPassword.value = '';
    }else alert('Wrong email or password.');
})

