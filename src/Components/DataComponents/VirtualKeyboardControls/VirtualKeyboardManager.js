import {EventEmitter} from 'events'

export default class VirtualKeyboardManager extends EventEmitter{

    constructor() {
        super()
        this.keyboardStatus = false;
        this.currentFunction = '';
        this.inputPrompt= '';
        this.targetIsString = false
    }

    showKeyboard(newFunction, inp, targetIsString){
        this.targetIsString = targetIsString;
        this.keyboardStatus = true;
        this.currentFunction = newFunction;
        this.inputPrompt = inp;
        this.emit('show');
    }

    hideKeyboard(finalValue){
        if(this.targetIsString){
            this.currentFunction(finalValue)
        }else{
            this.currentFunction(Number(finalValue))
        }
        this.keyboardStatus = false;
        this.emit('hide');
    }

}