import {EventEmitter} from 'events'

export default class DigitalKeyboardManager extends EventEmitter{

    constructor() {
        super()
        this.currentEntry = "";
        this.target = "";
    }

    openKeyboard(target){
        this.target = target;
        this.currentEntry = "";
    }

    addNumber(number){
        this.currentEntry = this.currentEntry + number;
    }

    backspaceNumber(){
        if(this.currentEntry.length == 0) return;
        this.currentEntry = this.currentEntry.substring(0, this.currentEntry.length - 1);
    }
}