import React from 'react'
import {Link, useHistory} from 'react-router-dom'

const Header = ({bigSetting, setBigSetting, setting, setSetting, contactOpen, setContactOpen,cartImg, user, setUser,xMenu, setXmenu }) => {
const history = useHistory()


const logginOut = () => {
    setBigSetting(false)
    localStorage.removeItem('profile')
    setUser(JSON.parse(localStorage.getItem('profile')))
    history.push('/')
}


const renderNotLogIn = () => (
<React.Fragment>
<li className="menu-li">
<Link className="menu-link" to="/">HOME</Link>
</li>
<li className="menu-li">
<a className="menu-link" href="https://bakedbyart.vercel.app/#aboutus">ABOUT</a>
</li>
<li className="menu-li">
<Link className="menu-link" to="/signin">SIGN IN</Link>
</li>
</React.Fragment>
)

const renderLoggedIn = () => (

<React.Fragment>
<li className="menu-li" onClick={() => setBigSetting(false)}>
<Link className="menu-link" to="/">HOME</Link>
</li>
<li className="menu-li" onClick={() => setBigSetting(false)}>
<Link className="menu-link" to="/banana">BANANA BREADS</Link>
</li>
<li className="menu-li" onClick={() => setBigSetting(false)}>
<Link className="menu-link" to="/cookies">COOKIES</Link>
</li>
<li className="menu-li">
    <button className="menu-link link-btn" onClick={() => {
        setBigSetting(!bigSetting)
    }}>
        <img src="./images/setting-lines.svg" width="35" alt="bakedbyart" />
    </button>
</li>
<ul className={bigSetting ? "big-setting" : "mobo-none"} >
    {user.info.admin ? <li onClick={() => history.push('/adminbreads')} className="big-setting-li">Add Breads</li> : 
    <li className="big-setting-li">Your Orders</li>}

{user.info.admin ? <li onClick={() => history.push('/admin')} className="big-setting-li">Admin Page</li> : 
    <li className="big-setting-li">Accounts</li>}
    
    <li onClick={logginOut} className="bgsli">Sign Out <i className="fasi fas fa-sign-out-alt"></i></li>
</ul>
</React.Fragment>
)

return (
<div className="big-header">

<header>
    <div className="logo-cont">
        <img src="/images/april.png" alt="bakedbyart logo" className="april-logo" />
    </div>
    
    <div className="menu-and-btn">
        <ul className="menu-ul">

           
            {cartImg === null ? '' :

            <Link to="/cart" style={{textDecoration: 'none'}}>
            <div className="menu-li" style={{display: 'flex',
            justifyContent: 'center', alignItems: 'flex-start',
            cursor: 'pointer'}}>
                <img src="/images/cart.svg" alt="cart bakedbyart?" width="30" height="30" />
                <li className="cart-length">{cartImg.length}</li>
            </div>
            </Link>
            }

            {!user ? renderNotLogIn() : renderLoggedIn()}

            {
                !user ? <div className="menu-btn">
                <a className="menu-btn-link first-link" href="https://bakedbyart.vercel.app/#allmenu">OUR PRODUCT</a>
                <button style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                }} onClick={() => setContactOpen(!contactOpen)} className="menu-btn-link">CONTACT US</button>
            </div> : <></>
            }
        </ul>
        
    </div>

    <div className="mobo-header">
            {cartImg === null ? <></> : 
            <Link to="/cart" style={{textDecoration: 'none'}}>
            <div className="menu-li" style={{display: 'flex',
            justifyContent: 'center', alignItems: 'flex-start',
            cursor: 'pointer'}}>
                <img src="/images/cart.svg" alt="bakedbyart" width="30" height="30" />
                <p className="cart-length">{cartImg.length}</p>
            </div>
            </Link>
            }
            <div className="mobo-bx" onClick={() => {
                if(setting){
                    setSetting(!setting)
                }
                
                setXmenu(!xMenu)}}>
                <div className={xMenu ? "mobo-line x-line" : "mobo-line"}></div>
            </div>
    </div>

</header>



<div className="second-header">

   
    <div className="follow">
    
        <i className="f-icon fab fa-facebook-f"></i>
        <i className="f-icon fab fa-twitter"></i>
        <i className="f-icon fab fa-instagram"></i>
    </div>
    <p className="callnow-p"><i className="fon fas fa-phone-alt"></i> CALL NOW: 09 2243124</p>
 

</div>

</div>
)
}

export default Header
