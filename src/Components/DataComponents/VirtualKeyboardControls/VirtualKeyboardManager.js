import {EventEmitter} from 'events'

export default class VirtualKeyboardManager extends EventEmitter{

    constructor() {
        super()
        this.keyboardStatus = false;
        this.currentFunction = '';
        this.inputPrompt= '';
    }

    showKeyboard(newFunction, inp){
        this.keyboardStatus = true;
        this.currentFunction = newFunction;
        this.inputPrompt = inp;
        this.emit('show');
    }

    hideKeyboard(finalValue){
        this.currentFunction(finalValue)
        this.keyboardStatus = false;
        this.emit('hide');
    }

}