import { relative } from 'path-browserify';
import React, { useEffect, useState } from 'react';
import './frame.css'

function getErrorTextDisplay(showState){
    if(showState){
        return 'flex';
    }else{
        return 'none';
    }
}

function FrameLogin({loginManager, showLogin, virtualKeyboardManager}) {
    const[displayState, setDisplayState] = useState(showLogin);
    const[showError, setShowError] = useState(false);
    const[inputUsername, setInputUsername] = useState('');
    const[inputPassword, setInputPassword] = useState('');
    const[loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        loginManager.on('show', () => {
            setShowError(false);
            setLoginStatus(loginManager.loggedIn);
            setInputUsername('');
            setInputPassword('');
            setDisplayState(true);
        });
        loginManager.on('hide', () => {setDisplayState(false)});
        loginManager.on('LoginSuccess', () => {setDisplayState(false)});
        loginManager.on('LogoutSuccess', () => {setDisplayState(false)});
        loginManager.on('DisplayErrorMassage', () => {setShowError(true)});
    }, []);
    return (
        <div className={displayState ? 'mainContainer-login' : 'mainContainer-login-off'}>
            <div>
                <div style={{width: 20, height: 20, display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center', background: '#FF0000', top: 30, left: 288}} onClick={() => loginManager.showHideDisplay()}>
                    X
                </div>
                <div className='whiteBox' style={{width: 300, height: 300, display: getErrorTextDisplay(!loginStatus), justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 5}}>
                    Name
                    <input type="text" value={inputUsername} onChange={event => setInputUsername(event.target.value)}  onClick={() => virtualKeyboardManager.showKeyboard(setInputUsername, "Input Username:", true)}/>
                    Password
                    <input type="password" value={inputPassword} onChange={event => setInputPassword(event.target.value)} onClick={() => virtualKeyboardManager.showKeyboard(setInputPassword, "Input Password:", true)}/>
                    <div  style={{display:getErrorTextDisplay(showError), color: '#FF0000', overflowWrap: 'break-word', width: 180}}>
                        {"Username or password is incorrect"}
                    </div>
                    <div className='whiteBox' style={{width: 100, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => loginManager.loginAttempt(inputUsername, inputPassword)}>
                        Login
                    </div>
                </div>
                <div className='whiteBox' style={{width: 300, height: 300, display: getErrorTextDisplay(loginStatus), justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 5}}>
                    {"User " + loginManager.username + " has logged in."}
                    <div className='whiteBox' style={{width: 100, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => loginManager.logoutAttempt()}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrameLogin;