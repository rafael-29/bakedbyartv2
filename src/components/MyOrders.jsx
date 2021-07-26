import React, {useState, useEffect} from 'react'
import {CircularProgress} from '@material-ui/core'
import axios from 'axios'

const MyOrders = () => {

const [isValidate, setIsValidate] = useState(false)
const [current, setCurrent] = useState()
const [recent, setRecent] = useState()

const SEC = axios.create({
    baseURL: 'https://bakedbyart.herokuapp.com/myorders'
})
SEC.interceptors.request.use( (req) => {
    req.headers.authori = `beasd ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})



const validateUserFunc = async () => {
const data = await SEC.get('/validate')
if(!data) return setIsValidate(false)
if(data.status === 200) setIsValidate(true)
}

const getAllOrders = async () => {
const {data} = await SEC.get('/current')
console.log(data)
}

useEffect( () => {
validateUserFunc()
getAllOrders()
}, [])

if(!isValidate){
    return (
        <div className="myorders-page page">
        
        <CircularProgress />
    </div>
    )
}
return(
    <div className="myorders-page page">
        
        <div className="current-order">
            <h2 className="mp-cap">Current Order</h2>
        </div>
        <div className="delivered-order">
            <h2 className="mp-cap">Delivered Orders</h2>
        </div>
      
    </div>
)
}

export default MyOrders
