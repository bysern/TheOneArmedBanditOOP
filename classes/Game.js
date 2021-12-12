class Game {
    constructor(start){
        this.stats = new Statstics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        document.getElementById('addMoneyChose').addEventListener('click', this.addingMoney.bind(this));

        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');

        this.depositWrapper = document.querySelector('.addingMoneyOperationWrapper');
        this.divAddMoneyOrLogout = document.querySelector('.addMoneyOrLogout');
        this.divAddMoneyChosen = document.querySelector('.addMoneyChosenWrap');
        this.btnLogOut = document.getElementById('logOut');
        this.btnAddMoneyChosen = document.getElementById('addMoneyChose');
        this.btnDeposit = document.getElementById('addDeposit');
        //this.inputDepositAmount = document.getElementById('addMoneyInput');

        this.render();
        this.startTimer();

    }

    //default amount is current wallet value
    render(colors = ['grey','grey','grey'],
        amount = this.wallet.getCurrentWalletValue(),
         result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0){

        this.boards.forEach((board, i) =>{
            board.style.backgroundColor = colors[i];
        });
        
        this.spanWallet.textContent = amount;
        if(result){
            result = `Nice! You have won ${wonMoney}$. `;
        }else if (!result && result !== ""){
            result = `Bad luck :( You have lost ${bid}$. `;
        }
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];

        this.inputBid.value = "";
    }

    startGame(){
        if(this.inputBid.value < 1 ) return alert('The amount is too small.');
        const bid = Math.floor(this.inputBid.value);

        this.wallet.getCurrentWalletValue();

        if(!this.wallet.checkIfUserCanPlay(bid)){
            this.addingMoney();
            return alert('You have too little funds or wrong input. Dont worry you can still continue!');
        }
            

        this.wallet.changeWallet(bid, '-');

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        const wonMoney = Result.moneyWonInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getCurrentWalletValue(), win,
        this.stats.showGameStatistics(), bid, wonMoney);


    }

    addingMoney(){
        this.divAddMoneyOrLogout.style.opacity = 1;
        this.depositWrapper.style.opacity = 1;
        this.btnLogOut.addEventListener('click', function(){
            containerApp.style.opacity=0;
        });

        this.btnAddMoneyChosen.addEventListener('click', function(){
            containerAddMoneyChosen.style.opacity=1;
        });
        this.btnDeposit.addEventListener('click', function(e){
            e.preventDefault();
            let amount = Number(inputDepositAmount.value);
            if(amount > 0){
                console.log(this);
                console.log(this.wallet);
                //this.wallet.getCurrentWalletValue() + amount;
                this.wallet.changeWallet(amount);
                containerMoneyDepositWrapper.style.opacity = 0;
                alert('Money added succesfully!');
            }
        });
    }

    startTimer(){
        let timer = 0;
        setInterval(function(){
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
    
            //ading 0 when single digit
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            document.getElementById('timer').textContent = minutes + ":" + seconds;
    
            if(++timer == 300) {
                alert('You have played for 5 minutes already'); 
            }

        }, 1000);
    }
}

