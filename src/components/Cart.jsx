import React from 'react'
import {useHistory} from 'react-router-dom'

const Cart = ({cartImg, setCartImg, user, setCurrPage}) => {
// cartImg is an Array
const history = useHistory()

const validateNextRoute = (totalam) => {
if(!user){
    alert('You Must Sign In First')
    setCurrPage('shopping')
    history.push('/signin')
    localStorage.setItem('total', JSON.stringify({totalAm: totalam}))
}else{
    localStorage.setItem('total', JSON.stringify({totalAm: totalam}))
    history.push('/checkout')
}
}

const removingBread = bId => {
    
    const allCart = JSON.parse(localStorage.getItem('carts'));
    const newBreadsArr = allCart.filter(bre => bre.bId !== bId)
    
    localStorage.setItem('carts', JSON.stringify(newBreadsArr));
    setCartImg(JSON.parse(localStorage.getItem('carts')));
}

const renderCart = () => {


const totalArr = [];
cartImg.forEach(crt => {
    totalArr.push(crt.cost)
})
const totalAmnt = totalArr.reduce((acc, curr) => acc + curr, 0)



return (
<React.Fragment>
<div className="cart-left">
    {
        cartImg.map(bread => (
            <div className="cart-bx" key={bread.bId}>
                <div className="cart-whole">
                    <img src={bread.bImg} alt="bakedbyart" className="cartimg" />
                </div>
                <div className="cart-det">
                    <div className="cart-descr">
                        <h2 className="cart-breadname">{bread.bName}</h2>
                        <h4 className="cart-qnty">Quantity: {bread.qnty}{bread.qnty > 1 ? 'pcs' : 'pc'}</h4>
                        <h5 className="cart-cost">COST: ₱{bread.cost}</h5>
                    </div>
                    <div className="cart-actions">
                        <button onClick={() => removingBread(bread.bId)} className="remove">REMOVE</button>
                        <button onClick={() => {
                           if(bread.categ === 'banana'){
                               history.push('/banana')
                           }else{
                               history.push('/cookies')
                           }
                        }}
                        style={{background: 'dodgerblue'}} className="remove">GO TO MENU</button>
                    </div>
                </div>
            </div>
        ))
    }
</div>
<div className="cart-right">
    <div className="order-bx">
        <h4 className="order-sum">ORDER DETAILS</h4>
        <div className="crt-total">
            <p className="crt-cap">TOTAL</p>
            <p className="crt-amnt">₱{totalAmnt.toFixed(2)}</p>
        </div>
        <div className="crt-payment-btns">
            <button onClick={() => {
            if(!cartImg.length) {
                localStorage.removeItem('carts')
                setCartImg(JSON.parse(localStorage.getItem('carts')))
                return alert('Your Cart Is Empty')
            }
            validateNextRoute(totalAmnt)}} className="paym-btn">Proceed To Payment</button>
            
            <button onClick={() => history.push('/banana')}
            className="paym-btn" style={{background: 'brown'}}>Continue Shopping</button>
        </div>
    </div>
</div>
</React.Fragment>
)
}


const renderEmpty = () => (
    <h2 style={{textAlign: 'center'}} className="cart-mt">Cart is empty</h2>
)

return (
<div className="cart-page page">
    <a href="http://localhost:3000/#allmenu" className="cart-backbtn"><i className="fas fa-caret-left"></i> BACK</a>
    {cartImg === null ? renderEmpty() : renderCart()}
    
</div>
)
}

export default Cart
