import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header'
import SignIn from './components/SignIn'
import SignUp from './components/Signup';
import Contact from './components/Contact';
import AddBread from './components/AddBread';
import Banana from './components/Banana.jsx';
import Cookies from './components/Cookies';
import Cart from './components/Cart';
import Info from './components/Info';
import Checkout from './components/Checkout'
import Summary from './components/Summary';
import Finish from './components/Finish';
import MoboHeader from './components/MoboHeader';
import MyOrders from './components/MyOrders';
import AdminPage from './adminPages/Orders';
import Accounts from './components/Accounts';


import './styles/styles.css';
import AllMessage from './adminPages/AllMessage';

const App = () => {

const [xMenu, setXmenu] = useState(false)
const [setting, setSetting] = useState(false)
const [bigSetting, setBigSetting] = useState(false)
const [newlyOrder, setNewlyOrder] = useState(true)

const [contactOpen, setContactOpen] = useState(false)
const [cartImg, setCartImg] = useState(JSON.parse(localStorage.getItem('carts')))

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
const [currPage, setCurrPage] = useState()

const renderSignIn = () => (
<SignIn user={user} setUser={setUser} currPage={currPage} setCurrPage={setCurrPage} />
)

const renderSignUp = () => (
<SignUp user={user} setUser={setUser} currPage={currPage} setCurrPage={setCurrPage} />
)
const renderAddBread = () => (
<AddBread />
)

const renderBanana = () => (
<Banana />
)
const renderInfo = (props) => (
<Info theInfo={props} cartImg={cartImg} setCartImg={setCartImg} />
)

const renderCookies = () => (
<Cookies />
)
const renderCart = () => (
<Cart setCurrPage={setCurrPage} user={user} cartImg={cartImg} setCartImg={setCartImg} />
)
const renderHome = () => (
<Home contactOpen={contactOpen} setContactOpen={setContactOpen} />
)

const renderCheckOut = () => (
<Checkout />
)
const renderSummary = () => (
<Summary newlyOrder={newlyOrder} setNewlyOrder={setNewlyOrder} />
)
const renderFinish = (props) => (
<Finish setCartImg={setCartImg}
newlyOrder={newlyOrder} setNewlyOrder={setNewlyOrder} theProps={props} />
)

const renderMyOrder = () => (
<MyOrders />
)

const renderAdminPage = () => (
<AdminPage />
)

const renderAccPage = () => (
<Accounts user={user} setUser={setUser} />
)

const renderAllMessage = () => (
<AllMessage />  
)

useEffect(() => {
const body = window.document.querySelector('body')

if(xMenu === true){
  body.style.overflow = "hidden"
}else{
  body.style.overflow = "scroll"
  body.style.overflowX = "hidden"
}

}, [xMenu])
return(
<Router>

  <Contact contactOpen={contactOpen} setContactOpen={setContactOpen} />
  <Header bigSetting={bigSetting} setBigSetting={setBigSetting}
  setting={setting}   setSetting={setSetting}
  xMenu={xMenu}  setXmenu={setXmenu}
  user={user} setUser={setUser}
  cartImg={cartImg} setCartImg={setCartImg} 
  contactOpen={contactOpen} setContactOpen={setContactOpen} 
  />
  <MoboHeader setting={setting}   setSetting={setSetting}
  xMenu={xMenu}  setXmenu={setXmenu}
  user={user} setUser={setUser}
  contactOpen={contactOpen} setContactOpen={setContactOpen}
  />

  

  <Route path="/" exact render={renderHome} />
  <Route path="/signin" render={renderSignIn} />
  <Route path="/register"  render={renderSignUp} />
  <Route path="/adminbreads" render={renderAddBread} />
  <Route path="/banana" render={renderBanana} />
  <Route path="/cookies" render={renderCookies} />
  <Route path="/info/:id" render={renderInfo} />
  <Route path="/cart" render={renderCart} />
  <Route path="/checkout" render={renderCheckOut} />
  <Route path="/summary" render={renderSummary} />
  <Route path="/orderinfo/:id" render={renderFinish} />
  <Route path="/myorders" render={renderMyOrder} />
  <Route path="/admin" exact render={renderAdminPage} />
  <Route path="/accounts" exact render={renderAccPage} />
  <Route path="/admin/messages" render={renderAllMessage} />



</Router>
)
}

export default App;