import React, {useState} from 'react'
import { TextField } from '@material-ui/core'

import {axiosSendMessage} from './Apicalls';

const Contact = ({contactOpen, setContactOpen}) => {

const [formData, setFormData] = useState({
    email: '', message: ''
})

const submitMessage = async e => {
e.preventDefault()
await axiosSendMessage(formData)
}

return (
<div className={contactOpen ? "contact-open" : "display-none" }>
    <h2 className="co-head">Baked.By.Art</h2>

    <form className="contact-form" onSubmit={submitMessage}>

        <TextField variant="outlined" size="small" 
        label="Your Email"
        value={formData.email} 
        onChange={e => setFormData({...formData, email: e.target.value})} fullWidth />
    
        <textarea placeholder="Insert Message Here"
        value={formData.message}
        onChange={e => setFormData({...formData, message: e.target.value})}
        className="co-txt-area" cols="30" rows="6"></textarea>

        <div className="co-btn-cont">

        <button onClick={(e) => { setContactOpen(!contactOpen)}}
         style={{backgroundColor: 'crimson'}} className="co-btn">CANCEL</button>

        <button style={{backgroundColor: 'dodgerblue'}} className="co-btn">SEND</button>
        
        </div>
    </form>
</div>
)
}

export default Contact
