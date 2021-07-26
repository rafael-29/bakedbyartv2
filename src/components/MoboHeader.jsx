import React from 'react'
import { useHistory } from 'react-router-dom' 


const MoboHeader = ({setting, setSetting, xMenu,  setXmenu,  user,  setUser}) => {
const history = useHistory()

const renderLogIn = () => (
<ul className="mobo-ul">
    
    <li className="mobo-li" onClick={() => {
        history.push('/')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/home.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <li className="mobo-li" onClick={() => {
        history.push('/banana')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/bread.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <li className="mobo-li" onClick={() => {
        history.push('/cookies')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/cookies.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    
    <li className="mobo-li" onClick={() => {
        setSetting(!setting)
    }}>
        <img src="./images/setting-lines.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <ul className={!setting ? "display-none" : "mobo-setting"}>

        {user.info.admin ? 

        <li onClick={() => {
            history.push('/adminbreads')
        }} className="setting-li">Add Bread</li> 
        
        : 

        <li onClick={() => {
            history.push('/dashboard')
        }} className="setting-li">My Orders</li>
        }
        


        {user.info.admin ? 

        <li onClick={() => {
            history.push('/admin')
        }} className="setting-li">ADMIN</li> 
        
        : 

        <li onClick={() => {
            history.push('/accounts')
        }} className="setting-li">Accounts</li>
        }

        <li onClick={() => {
            localStorage.removeItem('profile')
            setUser(JSON.parse(localStorage.getItem('profile')))
            history.push('/')
            setXmenu(!xMenu)
        }} className="setting-li sign-out-li">sign out <i className="fas fa-sign-out-alt"></i></li>
    </ul>
</ul>
)  

const renderNotLoggedIn = () => (
<ul className="mobo-ul">
    <li className="mobo-li" onClick={() => {
        history.push('/')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/home.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <li className="mobo-li" onClick={() => {
        history.push('/banana')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/bread.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <li className="mobo-li" onClick={() => {
        history.push('/cookies')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/cookies.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
    <li className="mobo-li" onClick={() => {
        history.push('/signin')
        setXmenu(!xMenu)
        setSetting(false)
    }}>
        <img src="./images/user.svg" alt="bakedbyart"
        className="mobo-imgs" />
    </li>
</ul>
)

return (
<div className={!xMenu ? "mobo-menu-bx-left" : "mobo-menu-bx" }>

    {user ? renderLogIn() : renderNotLoggedIn()}

   
</div>
)
}

export default MoboHeader
