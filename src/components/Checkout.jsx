import React, {useEffect, useState} from 'react'
import {TextField} from '@material-ui/core'
import DatePicker from 'react-datepicker'
import {useHistory} from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";

const Checkout = () => {

const history = useHistory()

const [formData, setFormData] = useState({
fullname: JSON.parse(localStorage.getItem('shipto')) === null ? '' : JSON.parse(localStorage.getItem('shipto')).fullname, 
phone: JSON.parse(localStorage.getItem('shipto')) === null ? '' : JSON.parse(localStorage.getItem('shipto')).phone, 
address: JSON.parse(localStorage.getItem('shipto')) === null ? '' : JSON.parse(localStorage.getItem('shipto')).address.split(",")[0] ,
city: JSON.parse(localStorage.getItem('shipto')) === null ? '' : JSON.parse(localStorage.getItem('shipto')).address.split(",")[1]
})

const [method, setMethod] = useState()
const [forDate, setForDate] = useState(1)

const [theDate, setTheDate] = useState(new Date())

const handleChange = e => {
const {name, value} = e.target;
setFormData({...formData, [name]: value})
}

const proceedFunc = () => {

    localStorage.setItem('shipto', JSON.stringify({
        fullname: formData.fullname,
        address: `${formData.address}, ${formData.city}`,
        phone: formData.phone
    }))

    history.push('/summary')
}

const renderCheckAll = () => {
    if(formData.fullname.length > 1 && formData.address.length > 1 && formData.phone.length > 1 && formData.city.length > 1 && method !== undefined){
     return (<button onClick={proceedFunc} className="crt-proc">PROCEED</button>)   
    }else{
        return <></>
    }
}

useEffect( () => {

if(theDate < new Date() && forDate > 1){
    
    alert('Please Select Valid Date')
    window.location.reload()
}else{
    setForDate(prev => prev + 1)
}

}, [theDate])
return (
<div className="checkout-page page">

    <div className="shipping-bx">
        <h3 className="sb-ttle">Shiping Details</h3>
        
        <div className="shipto-bx">
            <TextField style={{marginBottom: '5px'}} variant="outlined" size="small"
            value={formData.fullname} name="fullname"
            onChange={handleChange} label="Fullname" fullWidth/>

            <TextField style={{marginBottom: '5px'}} variant="outlined" size="small"
            value={formData.address} name="address"
            onChange={handleChange} label="Address" fullWidth/>

            <TextField style={{marginBottom: '5px'}} variant="outlined" size="small"
            value={formData.phone} name="phone"
            onChange={handleChange} label="Phone" fullWidth/>

            <TextField style={{marginBottom: '5px'}} variant="outlined" size="small"
            value={formData.city} name="city"
            onChange={handleChange} label="City" fullWidth/>
        </div>

        <h3 className="sb-ttle">Select Delivery Date </h3>
        <div className="date-bx">
            <DatePicker  selected={theDate} onChange={
            (date) => setTheDate(date)
            } />
            <i className="fas fa-calendar-day"></i>
        </div>
    </div>
            
    <div className="billing-method">
        <h3 className="sb-ttle">Billing Method</h3>
        <p style={{marginBottom: '10px'}} className="note">Note: The only option we have at the<br /> moment is Cash On Delivery</p>
        {/* <div onClick={() => setMethod('paypal')} className={method === 'paypal' ? 'meth-blue': 'method'}>
            Paypal
        </div> */}
        <div onClick={() => setMethod('cod')} className={method === 'cod' ? 'meth-blue': 'method'}>
            Cash On Delivery
        </div>
        
        {renderCheckAll()}
    </div>
</div>
)
}

export default Checkout
