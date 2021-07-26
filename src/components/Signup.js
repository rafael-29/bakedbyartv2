import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {axiosAddUser} from './Apicalls'

const Register = () => {

const [fData, setFData] = useState({
fname: '', lname:'', address: '', city: '', phone: '',
email: '', password: '', confirmpass: ''
})


// functions
const submitReq = async (e) => {
e.preventDefault();

if(fData.password !== fData.confirmpass) return alert('Password does not match')

const toSend = {
    fullname: `${fData.fname} ${fData.lname}`,
    address: `${fData.address} ${fData.city}`,
    email: fData.email,
    phone: fData.phone,
    password: fData.password
}
await axiosAddUser(toSend)
setFData({
    fname: '', lname:'', address: '', city: '', phone: '',
    email: '', password: '', confirmpass: ''
    })
alert('Registered Successfully')
}

const handleFormChange = e => {
const {name, value} = e.target;

setFData({...fData, [name]:value})
}


return(
<div className="register-page page">

    <h3 className="sp-cap">Online Account Registration</h3>
    <p className="sp-descr">To register as a member of Baked.By.Art, simply complete the form below.
Please note: You must be 18 years of age or older to register an account.</p>



<form className="reg-form" onSubmit={submitReq}>
    <div className="reg-first">

        <label className="input-label">Name</label>
        <div className="reg-namebx">
            <input type="text" className="reg-input regn" name="fname"
             onChange={handleFormChange}
            value={fData.fname} 
            placeholder="name" required/>

            <input type="text" className="reg-input" name="lname"
             onChange={handleFormChange}
            value={fData.lname} 
            placeholder="last name" required/>
        </div>

        <label className="input-label">Email</label>
        <input type="email" name="email" onChange={handleFormChange}
         className="reg-input  regfull" placeholder="Enter Email"
        value={fData.email} required />
        
        <label className="input-label">Address</label>
        <div className="reg-namebx">
        
            <input type="text" name="address" onChange={handleFormChange} className="reg-input regn"
            value={fData.address} 
            placeholder="Address" required/>

            <input type="text" name="city" onChange={handleFormChange} className="reg-input"
            value={fData.city} 
            placeholder="City" required/>

        </div>
        
        <label className="input-label">Phone Number</label>
        <input type="number" className="reg-input regfull" name="phone" onChange={handleFormChange} className="reg-input"
        value={fData.phone}  required />
    </div>

    <div className="reg-second">
        <label className="input-label">Your Password</label>
        <input style={{marginBottom: '5px'}} type="password" name="password" onChange={handleFormChange} className="reg-input" className="reg-input"
        value={fData.password}  required />

        <label className="input-label">Confirm Password</label>
        <input type="password" className="reg-input" name="confirmpass" onChange={handleFormChange} className="reg-input"
        value={fData.confirmpass}  required />

        <button style={{background: '#311716', color: '#f5f5f5'}} className="sp-login-btn">CREATE ACCOUNT</button>
    </div>
</form>




</div>
)
}
export default Register;