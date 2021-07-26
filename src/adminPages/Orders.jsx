import React, {useState, useEffect} from 'react'
import {CircularProgress} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import {axiosGetOrders, axiosDeliverUpdate, axiosDeleteOrder, axiosValidAdmin} from './Api'


const Orders = () => {

const history = useHistory()
const [allOrders, setAllOrders] = useState()
const [infoBox, setInfoBox] = useState()
const [isOpen, setIsOpen] = useState(false)

const [isAdmin, setIsAdmin] = useState()

const openDetailFunc = e => {
setIsOpen(!isOpen)
setInfoBox(e)
}

const deleteOrderFunc = () => {
axiosDeleteOrder(infoBox._id)
fetchOrders()
alert('Deleted Successfully')
setIsOpen(false)
}

const updateDeliver = async eId => {
const data = await axiosDeliverUpdate(eId);
fetchOrders();
setInfoBox(data.data)
}

const fetchOrders = async () => {
await axiosValidAdmin()
const data = await axiosGetOrders()
setAllOrders(data)
}

const renderEMpty = () => (
    <h2>EMPTY</h2>
)

const renderAllOrders = () => (
    <div className="order-big-container">
        {allOrders.map(order => (
            <div className={order.delivered ? "admin-orderbx-green" : "admin-orderbx"}  key={order._id} onClick={() => openDetailFunc(order)}>
                <p className="oder-cap">{order.shipment.fullname}</p>
                <p className="oder-cap">ORDERNO. #{order.orderno}</p>
            </div>
        ))}
    </div>
)

const validateFunc = async () => {
    
    try {
      const data = await axiosValidAdmin()
      if(data === 'invalid'){
          setIsAdmin(false)
          console.log('admin false')
          console.log(data)
      }else{
          setIsAdmin(true)
      }
    } catch (error) {
        console.log('log not admin')
    }
}

useEffect( () => {
    fetchOrders()
    validateFunc()
}, [])

return (
<div className="all-orders-page page">
    {isAdmin === undefined ? <CircularProgress /> : !isAdmin ? <h1>Invalid Route</h1> :
    <React.Fragment>
    <div className="a-o-p-head">
    <h2 className="ac-ttle">All Orders</h2>
    <Link className="ac-link" to="/admin/messages">All Message <i className="fas fa-caret-right"></i></Link>
    </div>
    
    <div className="allorder-container">
        
        {allOrders === undefined ? <CircularProgress /> : !allOrders.length ? renderEMpty() : renderAllOrders()}
    </div>
    <div className={isOpen ? "info-box": "info-close"}>
        <div className="small-box-info">
            {infoBox === undefined ? <CircularProgress /> : (
            <React.Fragment>
                <p onClick={() => setIsOpen(false)}
                className="top-close-btn"><i className="far fa-times-circle" style={{pointerEvents: 'none'}}></i></p>
                <div className="sbi-head">
                    <p className="sbi-big-cap">{infoBox.shipment.fullname}</p>
                    <p className="sbi-big-cap">ORDER#{infoBox.orderno}</p>
                </div>
                <h4 className="delivery-stat-bx">Delivery Status: {infoBox.delivered ? 'Delivered' : 'On Delivery'}</h4>
                <div className="sbi-shipment">
                    <h4 className="sbi-big-cap">Shipment Details</h4>
                    <br />
                    <p className="sbi-caps">To. {infoBox.shipment.fullname}</p>
                    <p className="sbi-caps">Address. {infoBox.shipment.address}</p>
                    <p className="sbi-caps">Contact. {infoBox.shipment.phone}</p>
                </div>
                <div className="sbi-orders">
                <h4 style={{marginBottom:'14px'}} className="sbi-big-cap">Cart</h4>
                    {infoBox.orders.map(ord => (
                        <div className="sbi-order" key={ord.bId}>
                            <p className="sbi-caps">{ord.bName} {ord.qnty} {ord.qnty < 2 ? 'pc' : 'pcs'}</p>
                            <p className="sbi-caps">₱{ord.cost}</p>
                        </div>
                    ))}
                </div>
                <div className="sbi-order sbi-total">
                    <p style={{fontWeight: 'bold', fontSize:'1.1rem'}} className="sbi-caps">TOTAL PAYMENT</p>
                    <p style={{fontWeight: 'bold', fontSize:'1.1rem'}} className="sbi-caps">₱{infoBox.total.toFixed(2)}</p>
                </div>

                <div className="ordinary-closebx">

                <div className="none"></div>
                
                <div className="sbi-act-btns">
                    {!infoBox.delivered ?  <button className="sbi-btn btn-delivered" onClick={() => updateDeliver(infoBox._id)}>DELIVERED</button> : <button className="sbi-btn btn-red"  onClick={() => updateDeliver(infoBox._id)}>NOT DELIVERED</button>}
                    <button onClick={deleteOrderFunc} className="sbi-btn btn-del"><i className="fas fa-trash-alt"></i></button>
                </div>

                </div>
            </React.Fragment>
            )}
            
        </div>
    </div>


    </React.Fragment>
    }
</div>
)
}

export default Orders
