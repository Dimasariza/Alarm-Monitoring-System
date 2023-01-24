import React, { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function KeyboardComponent({virtualKeyboardManager, keyboardDisplayState}) {
    const[displayState, setDisplayState] = useState(false);
    const[keyboardState, keyboardStateSet] = useState('default');
    const[inputKeyboard, inputKeyboardSet] = useState("___________");
    const keyboard = useRef();

    useEffect(() => {
        virtualKeyboardManager.on('show', () => {
            keyboardStateSet('default');
            inputKeyboardSet("___________");
            setDisplayState(true);
            keyboard.current.clearInput();
        });
        virtualKeyboardManager.on('hide', () => {setDisplayState(false)});
    }, [])
    
    let keyboardLayout = {
        'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o w [ ] \\',
            '{lock} a s d f g h j k l ; \' {enter}',
            '{shift} z x c v b n m , . / {shift}',
            '.com {space} @'
          ],
          'shift': [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M &lt; &gt; ? {shift}',
            '.com {space} @'
          ]
    }

    function onChange(input){
        inputKeyboardSet(input);
      };
    
     function onKeyPress(button){
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button == '{bksp}' && inputKeyboard.length > 0) inputKeyboardSet(prev => prev.substring(0, prev.length - 1))
        if (button == '{enter}') handleSubmit()
      };

      function handleSubmit(){
        virtualKeyboardManager.hideKeyboard(inputKeyboard);
      }
    
      function handleShift(){
        console.log("Handling shift from " + keyboardState);
        if(keyboardState == 'default'){
            keyboardStateSet('shift');
        }else{
            keyboardStateSet('default');
        }
      };

  return (
    <div className={displayState ? 'mainContainer-Keyboard' : 'mainContainer-login-off'}>
        <div style={{background: 'rgba(0, 0, 0, 0.7)', width: '100%', flexShrink: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: '#FFFFFF'}}>{virtualKeyboardManager.inputPrompt}</div>
            <div style={{color: '#FFFFFF', 'letterSpacing': 3}}>{inputKeyboard}</div>
        </div>
        <Keyboard  
            keyboardRef={r => (keyboard.current = r)}
            onChange={(inp) => {onChange(inp)}}
            onKeyPress={(inp) => {onKeyPress(inp)}}
            layout={keyboardLayout}
            layoutName={keyboardState}
        />
    </div>
  );
}

export default KeyboardComponent;
