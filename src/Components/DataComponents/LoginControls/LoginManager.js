import {EventEmitter} from 'events'

export default class LoginManager extends EventEmitter{

    constructor(AlarmManager) {
        super()
        this.username = "batera";
        this.password = "123";
        this.loggedIn = false;
        this.showDisplay = false;
    }

    loginAttempt(username, password){
        if(this.username == username && this.password == password){
            this.loggedIn = true;
            this.showDisplay = false;
            this.emit('LoginSuccess');
        }else{
            this.emit('DisplayErrorMassage');
        }
    }

    logoutAttempt(){
        if(!this.loggedIn) return
        this.loggedIn = false;
        this.showDisplay = false;
        this.emit('LogoutSuccess');
        console.log(this.loggedIn);
    }

    showHideDisplay(){
        if(this.showDisplay){
            this.emit('hide');
            this.showDisplay = false;
        }else{
            this.emit('show');
            this.showDisplay = true;
        }
        console.log(this.showDisplay);
    }
}