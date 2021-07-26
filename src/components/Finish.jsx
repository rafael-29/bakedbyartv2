import React, {useState, useEffect} from 'react'
import {CircularProgress} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import {axiosfetchOderno} from './Apicalls'

const Finish = ({theProps, newlyOrder, setNewlyOrder, setCartImg }) => {
const history = useHistory();
const orderId = theProps.match.params.id


const [theInfo, setTheInfo] = useState()

const fetchInfoFunc = async () => {
    try {
    const data = await axiosfetchOderno(orderId)
    setTheInfo(data)
    } catch (error) {
        console.log(error)
    }
}

const renderInvoice = () => (
    <React.Fragment>
    <div className="fin-head">
        <h1 className="fin-ttle">Payment Receipt</h1>
    </div>
        
    <div className="finish-container">
        
        <div className="fin-top">
            <div className="fin-cap">INVOICE TO.</div>
            <div className="fin-cap">ORDER NO. #{theInfo.orderno}</div>
        </div>

        <div className="fin-det">
            <h3 className="fin-capsmall">Name</h3>
            <p className="fin-det-cap">{theInfo.shipment.fullname}</p>
        </div>
        <div className="fin-det">
            <h3 className="fin-capsmall">Address</h3>
            <p className="fin-det-cap">{theInfo.shipment.address}</p>
        </div>
        <div className="fin-det">
            <h3 className="fin-capsmall">Date</h3>
            <p className="fin-det-cap">{new Date(theInfo.dateOrdered).toLocaleDateString('en-us', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</p>
        </div>
        <div className="fin-det">
            <h3 className="fin-capsmall">Payment Method</h3>
            <p className="fin-det-cap">Cash On Delivery</p>
        </div>
        {console.log(theInfo)}
    </div>
    <div className="line"></div>
    <div className="fin-products">
        <div className="fin-products-top">
            <h3 style={{width: '600px'}} className="f-top-cap-first">Products</h3>
            <div className="f-right">
                <h3 className="f-top-cap">Qnty</h3>
                <h3 className="f-top-cap">Price</h3>
                <h3 className="f-top-cap">Total</h3>
            </div>
        </div>
        
        <div className="fin-products-top" style={{flexDirection: 'column'}}>
        {theInfo.orders.map(bread => (
            <div className="fin-bx" key={bread.bId}>
                <h3 style={{width: '600px'}} className="mobo-f-cap-first">{bread.bName}</h3>
                <div className="f-right">
                    <h3 className="mobo-f-cap">{bread.qnty}</h3>
                    <h3 className="mobo-f-cap">{bread.cost/bread.qnty}</h3>
                    <h3 className="mobo-f-cap">{`₱${bread.cost.toFixed(2)}`}</h3>
                </div>
            </div>
        ))}
        <div className="fin-prod-totalsum">
            <p className="fpt">TOTAL TO PAY</p>
            <p style={{
                
                padding: '5px 10px'
            }} className="fpt">₱{theInfo.total.toFixed(2)}</p>
        </div>
        </div>

        
    </div>
    </React.Fragment>
)

const removeAllLocal = () => {
    localStorage.removeItem('carts');
    localStorage.removeItem('shipto')
    localStorage.removeItem('total')
    setCartImg(JSON.parse(localStorage.getItem('carts')))
}

useEffect( () => {
    fetchInfoFunc()
    removeAllLocal()
    
}, [])

return (
<div className="finish-page page">
    {theInfo === undefined ? <CircularProgress /> : renderInvoice()}
    
    {newlyOrder ? <div className="thank-you-bx">
        <p className="thank-you-p">Thank You For Ordering</p>
        <button onClick={() => {
            removeAllLocal();
            setNewlyOrder(false)
            setCartImg(JSON.parse(localStorage.getItem('carts')))
            history.push('/')
        }}
        className="thankyou-btn">Back To Home Page</button>
    </div> : <></>}
    
</div>
)
}

export default Finish
