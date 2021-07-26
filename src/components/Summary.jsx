import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import {axiosCreateOrder} from './Apicalls'


const Summary = () => {
const history = useHistory()

const [theCarts, setTheCarts] = useState(JSON.parse(localStorage.getItem('carts')))

const processData = async () => {

const toSend = {
    orders: JSON.parse(localStorage.getItem('carts')),
    total: JSON.parse(localStorage.getItem('total')).totalAm,
    shipment: JSON.parse(localStorage.getItem('shipto'))
}


try {
    const data = await axiosCreateOrder(toSend)
    
    history.push(`/orderinfo/${data}`)
   
} catch (error) {
    alert('network error')
}
}

const renderOrders = () => {
    const thebreads = JSON.parse(localStorage.getItem('carts'));

return thebreads.map(bread => (
    <div className="sump-smple" key={bread.bId}>
        <h5 className="sump-cap">{bread.bName} x{bread.qnty}</h5>
        <h5 className="sump-cap">₱{bread.cost}</h5>
    </div>
))

}

const renderShipping = () => {
const ship = JSON.parse(localStorage.getItem('shipto'))

return(
<React.Fragment>
    <p className="ship-det">Ship To: {ship.fullname}</p>
    <p className="ship-det">Shiping Address: {ship.address}, {ship.city}</p>
    <p className="ship-det">Contact No. {ship.phone}</p>
</React.Fragment>
)

}


if(theCarts === null){
    
    return (
        <React.Fragment>
            <h2>Invalid Route</h2> 
            {
                setTimeout( () => {
                    history.push('/')
                }, 1000)
            }
        </React.Fragment>
    )
    
}
return (
<div className="summary-page page">
    <div className="summary-cont">
        <h3 className="sump-ttle">ORDER SUMMARY</h3>

        <div className="my-order">
            {renderOrders()}
        </div>

        <div className="sump-total">
            <div className="sump-smple">
                <h5 className="sump-cap">total order</h5>
                <h5 className="sump-cap">₱{JSON.parse(localStorage.getItem('total')).totalAm}</h5>
            </div>
            <div className="sump-bx sump-smple">
                <h5 className="sump-cap">AMOUNT TO PAY</h5>
                <h5 className="sump-cap">₱{JSON.parse(localStorage.getItem('total')).totalAm.toFixed(2)}</h5>
                
            </div>
        </div>
        <h4 className="sump-label">Shipping Details</h4>
            
        <div className="sump-ship-details" style={{padding: '0 5px'}}>
            {renderShipping()}
        </div>

        <div className="bil">
            <h4 className="sump-bilmethod">Billing Method: Cash On Delivery</h4>
        </div>
        <p className="sump-note"> <i className="fas fa-exclamation"></i> Note: After Confirming, This info will be sent to our end and will process your order</p>

        <button onClick={processData} className="sump-confirm">Confirm</button>
    </div>
</div>
)
}

export default Summary
