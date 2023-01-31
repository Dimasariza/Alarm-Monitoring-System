import {EventEmitter} from 'events'

export default class LoginManager extends EventEmitter{

    constructor() {
        super()
        this.username = "batera";
        this.password = "123";
        this.loggedIn = true;
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
    }

    showHideDisplay(){
        if(this.showDisplay){
            this.showDisplay = false;
            this.emit('hide');
        }else{
            this.showDisplay = true;
            this.emit('show');
        }
    }
}