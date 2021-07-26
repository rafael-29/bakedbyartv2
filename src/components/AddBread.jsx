import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {TextField, Button, Grid, CircularProgress} from '@material-ui/core'

import {delData} from './Apicalls' 

const categMenu = ['banana', 'cookies']

const AddBread = () => {

const [allBread, setAllBread] = useState()

const [formData, setFormData] = useState({
    breadName: '', cost: 0 , qnty: 1 , description: '', breadImage: '',
    categ: 'cookies'
})

const [isEdit, setIsEdit] = useState(false)
const [editId, setEditId] = useState()

const fetchBreads = async () => {
try {
  const {data} = await axios.get('https://bakedbyart.herokuapp.com/breads')

  setAllBread(data)
} catch (error) {
    console.log(error)
}
}

const editBread = (bread) => {
    setIsEdit(true)
    setFormData({
        breadName: bread.breadName
        , cost: bread.cost
         , qnty: bread.qnty
         , description: bread.description
        , breadImage: bread.breadImage,
        categ: bread.categ
    })
    setEditId(bread._id)
    
}

const deleteBread = async (bread) => {
  await delData(bread._id)
    fetchBreads();
   
}

const renderAllBreads = () => {
    return allBread.map(bread => (
        <div className="breadbx" key={bread._id}>
            <div className="breadbx-padding">
            <h3 className="breadbx-ncap">{bread.breadName}</h3>
            <h3 className="breadbx-ncap">Cost: {bread.cost}</h3>
            <h3 className="breadbx-ncap">{bread.description}</h3>
            </div>
            
            <img className="breadbx-admin-img" src={bread.breadImage} alt="bakedbyart breads" />
            <br />
            <Button onClick={() => {
            window.document.getElementById('forcetop').click();
            editBread(bread)}}>Edit</Button>
            <Button  onClick={() => deleteBread(bread)}>Delete</Button>
        </div>
    ))
}

const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
}

const submitData = e => {
e.preventDefault()

const toSend = {
    breadName: formData.breadName, 
    cost: parseFloat(formData.cost), 
    qnty:formData.qnty,
    description: formData.description,
    breadImage: formData.breadImage,
    categ: formData.categ
}

if(!isEdit){
    axios.post('https://bakedbyart.herokuapp.com/breads/addbread', toSend)
    .then( (result) => {
    alert('added successfully')
    fetchBreads();
    })
    .catch( () => console.log('no internet'))
}else{
    axios.patch(`https://bakedbyart.herokuapp.com/breads/update/${editId}`, toSend)
    .then( result => {
    console.log(result)
        setFormData({
            breadName: '', cost: 0 , qnty: 1 , description: '', breadImage: ''
        })
        setIsEdit(false)
        alert(result.data)
        fetchBreads()
    })
    .catch(error => console.log('no Internet'))

}


}

const convertFile = (f) => {
    return new Promise( (resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.readAsDataURL(f)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = err => reject(err)
    })
}

const uploadFile = async e => {
    const thefile = e.target.files[0];

    const thePic = await convertFile(thefile)

    setFormData({...formData, breadImage: thePic})
}

useEffect( () => {

    fetchBreads()

}, [])

return(
<div className="bread-adminpage page" id="addbreadform">

    <h2 className="addbread-ttle">Add Bread Details</h2>

    <form className="addbread-form" >

        <TextField style={{marginBottom: '20px'}} variant="outlined" name="breadName" label="Bread Name" size="small"
        value={formData.breadName} onChange={handleChange} fullWidth />

        <TextField style={{marginBottom: '20px', marginRight: '10px'}} variant="outlined" name="cost" label="Cost" size="small"
        value={formData.cost} onChange={handleChange} type="number" />

        <TextField style={{marginBottom: '20px', marginRight: '10px'}} variant="outlined" name="qnty" label="Quantity" size="small"
        value={formData.qnty} onChange={handleChange} type="number" />

        <div className="admin-categ-bx">
            <label className="acb-lbl">Category </label>
            <select className="acb-select"
            value={formData.categ} 
            onChange={e => setFormData({...formData, categ: e.target.value})} >
                {categMenu.map(cat => (
                    <option value={cat}>{cat}</option>
                ))}
                
            </select>
        </div>
        <br />

        <TextField style={{marginBottom: '20px'}} variant="outlined" name="description" label="Description(optional)" size="small"
        value={formData.description} onChange={handleChange} fullWidth />

        <div>
            <input type="file" onChange={uploadFile} />
        </div>
        <br />

        <Grid container spacing={4}>
            <Grid item>
                <Button onClick={() => setFormData({
    breadName: '', cost: 0 , qnty: 1 , description: '', breadImage: '',
    categ: 'cookies'
})}
                style={{marginBottom: '20px'}} variant="contained">CLEAR</Button>
            </Grid>
            <Grid item>
                <Button onClick={submitData}
                style={{marginBottom: '20px'}} variant="contained">{ isEdit ? 'UPDATE DATA' : 'ADD TO DATA'}</Button>
            </Grid>
        </Grid>
        
    </form>
    <a style={{visibility: 'hidden'}} id="forcetop" href="#addbreadform">top</a>

<div className="allbread-admin">
    {allBread === undefined ? <CircularProgress /> : !allBread.length ? <h2>No Breads</h2> : renderAllBreads()}
</div>
</div>
)
}

export default AddBread