import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


import {axiosAuth} from './Apicalls'

const SignIn = ({user, setUser, currPage}) => {

const history = useHistory();

const [loginData, setLoginData] = useState({
    email: '', password: ''
})

const handleAuthChange = e => {
const {name, value} = e.target;
setLoginData({...loginData, [name]: value})
}

const authFunc = async () => {

try {
    const data = await axiosAuth(loginData)
    if(data){
        localStorage.setItem('profile', JSON.stringify(data))
        setUser(JSON.parse(localStorage.getItem('profile')))
    }else{
        alert('Invalid UserPass')
        setLoginData({
            email: '', password: ''
        })
        return
    }
    
    setLoginData({
        email: '', password: ''
    })
    
    if(currPage === 'shopping'){
        history.push('/checkout')
    }else{
        history.push('/')
    }
} catch (error) {
    alert('Network Error')
}
}



if(!user) {
    return (
        <div className="signin-page page">
            <div className="sp-left">
                <h2 className="sp-cap">MEMBER LOGIN</h2>
        
                <div className="input-bx">
                    <h3 className="input-label">Email</h3>
                    <input type="text" value={loginData.email} placeholder="Enter Email"
                     onChange={handleAuthChange}
                    name="email" className="sp-input" />
                </div>
                <div className="input-bx">
                    <h3 className="input-label">Password</h3>
                    <input type="password" value={loginData.password} placeholder="Enter Password"
                     onChange={handleAuthChange}
                    name="password" className="sp-input" />
                </div>  
                <button onClick={authFunc} className="sp-login-btn">Sign In</button>
            </div>
            <div className="sp-right">
                <h2 className="sp-cap">NOT A MEMBER ?</h2>
        
                <p className="sp-descr">Register for free to recieve discounts, specials offers and manage your online account.</p>
        
                <ul className="sp-ul">
                    <li className="sp-li">- Detailed order histories</li>
                    <li className="sp-li">- Discount Offers</li>
                    <li className="sp-li">- Track Order Status</li>
                    <li className="sp-li">- Expedited checkout process</li>
                </ul>
        
                <button onClick={() => history.push('/register')} className="sp-login-btn">Register Now</button>
            </div>
        </div>
        )
}else{
    return (
        <div className="signin-page page">
        <h2>You are already Login</h2>
        { setTimeout( () => {
            history.push('/')   
        }, 1000) }
        </div>
    )
}
}

export default SignIn
