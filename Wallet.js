class Wallet{
    constructor(money){
        let _money = money;

        this.getCurrentWalletValue = () => _money;

        this.checkIfUserCanPlay = (value) => {
            if(_money >= value) return true;
            return false;
        }

        this.changeWallet = (amount, type="+") =>{
            if(typeof amount === "number" && !isNaN(amount)){
                if(type ==="+"){
                    return _money += amount;
                }else if(type ==="-"){
                    return _money -= amount;
                }else{
                    throw new Error("Invalid operation type");
                }
            } else{
                console.log(typeof amount);
                throw new Error("Invalid input")
            }
        }

    }
}
//const wallet = new Wallet(200);