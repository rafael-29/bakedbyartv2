import { CircularProgress, Button } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {axiosFetchMessages, axiosDelMessage} from './Api';

const AllMessage = () => {

const [allMessage, setAllMessage] = useState()


const fetchAllMessage = async () => {
const result = await axiosFetchMessages()
setAllMessage(result)
}

const renderAllMessage = () => {
   return allMessage.map(message => (
        <div className="am-bx" key={message._id}>
            <div className="am-bx-sm">
            <h3 className="am-lbl">from: {message.email}</h3>
            <Button onClick={ async () => {
            const result = await axiosDelMessage(message._id);
            console.log(result)
            await fetchAllMessage()
            }}
            color="secondary" variant="text" size="small">Remove</Button>
            </div>
            <h5 className="am-date">{new Date(message.dateMessage).toLocaleDateString('en-us', {
                day: '2-digit',
                month:'2-digit',
                year: 'numeric'
            })}</h5>
            <p className="am-p">{message.message}</p>
            
            
           
        </div>
    ))
}

useEffect( () => {

fetchAllMessage()

}, [])
return (
<div className="all-messages-page page">
    <h2 className="am-ttle">ALL MESSAGE</h2>

    <div className="am-container">
        {allMessage === undefined ? <CircularProgress /> : 
        !allMessage.length ? <h3>No Messages</h3> : 
        renderAllMessage()}
    </div>
    <Link to="/admin" className="am-back-btn">Return</Link>
</div>
)
}

export default AllMessage
