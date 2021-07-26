import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, CircularProgress, Grid, TextField} from '@material-ui/core'


import {axiosValidateUser, axiosUpdateUser, axiosDelUser, axiosChangePass} from './Apicalls'


const Accounts = ({setUser}) => {
const history = useHistory()

const [userInfo, setUserInfo] = useState()
const [editBx, setEditBx] = useState(false)
const [changeBx, setChangeBx] = useState(false)

const [editInfo, setEditInfo] = useState({
    fullname: '', email: '', phone: '', address: ''
})

const [changePass, setChangePass] = useState({
    oldpass: '', newpass: '', confirm: ''
})
const validateFunc = async () => {
 
 try {
   const result = await axiosValidateUser()
   if(result){
       console.log('success auth')
       setUserInfo(result)
   }else{
       localStorage.removeItem('profile')
       setUser(JSON.parse(localStorage.getItem('profile')))
        history.push('/')
   }
 } catch (error) {
     alert('Isa Kang malaking mandurugass')
 }
}

const patchDataFunc = async () => {
const result = await axiosUpdateUser(editInfo)
alert('Update Complete')
setUserInfo(result)
setEditBx(false)
setEditInfo({
    fullname: '', email: '', phone: '', address: ''
})
}

const delUserFunc = async () => {

   const data = await axiosDelUser();
   if(!data) return alert('Network Error')
   alert('Account Has Been Deleted');
   localStorage.removeItem('profile')
   setUser(JSON.parse(localStorage.getItem('profile')));
    history.push('/')
   console.log(data)
}

const changePassFunc = async () => {
    const toSend = {
        oldpass: changePass.oldpass,
        newpass: changePass.newpass
    }
    await axiosChangePass(toSend);
}

const handleChange = e => {
    const {name, value} = e.target;
    setEditInfo({...editInfo, [name]: value})
}

const handleChangePass = e => {
    const {name, value} = e.target;
    setChangePass({...changePass, [name]: value})
}

useEffect( () => {
validateFunc()
}, [])
return (
<div  className="account-page page">
    
    <div className="acc-info">
            {userInfo === undefined ? <CircularProgress /> :
            <React.Fragment>
                <h2 className="acc-bigcap">Account Information.</h2>

                <div className="acc-info-bx">
                    <p className="acc-cap">
                        <span className="acc-span">name: </span>
                        
                        {userInfo.fullname}
                    </p>
                </div>
                <div className="acc-info-bx">
                    <p className="acc-cap">
                        <span className="acc-span">email:  </span>
                        
                        {userInfo.email}
                    </p>
                </div>
                <div className="acc-info-bx">
                    <p className="acc-cap">
                        <span className="acc-span">Address: </span>
                        
                        {userInfo.address}
                    </p>
                </div>
                <div className="acc-info-bx">
                    <p className="acc-cap">
                        <span className="acc-span">Phone: </span>
                        
                        {userInfo.phone}
                    </p>
                </div>

            </React.Fragment>
            }
    </div>
    

    {!userInfo ? <CircularProgress /> : 
    <div className="acc-acction">
            
    <button onClick={() => setEditBx(!editBx)}
    className="acc-btn">EDIT ACCOUNT INFO</button>
    <button onClick={() => setChangeBx(!changeBx)}
    className="acc-btn">CHANGE PASSWORD</button>
    <button className="acc-btn">CONTACT ADMINISTRATOR</button>
    <button onClick={delUserFunc}
     className="acc-btn">REMOVE ACCOUNT</button>
        
    </div>
    }

    <div className={editBx ? "edit-info-bx": "edit-none"} >
        <h2 className="acc-bigcap">Edit Account Information.</h2>

        <TextField variant="outlined" size="small"
        value={editInfo.fullname} name="fullname"
        label="Enter Fullname" onChange={handleChange}
        style={{marginBottom: '5px'}} fullWidth />

        <TextField variant="outlined" size="small"
        value={editInfo.email} name="email"
        label="Enter Email" onChange={handleChange}
        style={{marginBottom: '5px'}} fullWidth />

        <TextField variant="outlined" size="small"
        value={editInfo.address} name="address"
        label="Enter Address" onChange={handleChange}
        style={{marginBottom: '5px'}} fullWidth />

        <TextField variant="outlined" size="small"
        value={editInfo.phone} name="phone"
        label="Enter Phone" onChange={handleChange}
        style={{marginBottom: '5px'}} fullWidth />

        <Grid container spacing={2} style={{marginTop: '10px'}}>
            <Grid item>
                <Button onClick={() => setEditBx(false)}
                variant="outlined" color="secondary" size="small">CANCEL</Button>
            </Grid>
            <Grid item>
                <Button onClick={patchDataFunc}
                variant="outlined" color="primary" size="small">SAVE CHANGES</Button>
            </Grid>
        </Grid>

    </div>

    {/* CHANGE PASSWORD */}
    <div className={changeBx ? "edit-pass-bx": "edit-none"} >
        <h2 className="acc-bigcap">CHANGE PASSWORD</h2>

        <TextField variant="outlined" size="small" type="password"
        value={changePass.oldpass} name="oldpass"
        label="Old Password" onChange={handleChangePass}
        style={{marginBottom: '5px'}} fullWidth />

        <TextField variant="outlined" size="small" type="password"
        value={changePass.newpass} name="newpass"
        label="New Password" onChange={handleChangePass}
        style={{marginBottom: '5px'}} fullWidth />

        <TextField variant="outlined" size="small" type="password"
        value={changePass.confirm} name="confirm"
        label="Confirm Password" onChange={handleChangePass}
        style={{marginBottom: '5px'}} fullWidth />

        <Grid container spacing={2} style={{marginTop: '10px'}}>
            <Grid item>
                <Button onClick={() => setChangeBx(!changeBx)}
                variant="outlined" color="secondary" size="small">CANCEL</Button>
            </Grid>
            <Grid item>
                <Button onClick={changePassFunc}
                variant="outlined" color="primary" size="small">CONFIRM</Button>
            </Grid>
        </Grid>

    </div>

</div>
)
}

export default Accounts
