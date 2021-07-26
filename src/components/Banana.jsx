import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import {fetchBanana} from './Apicalls.js'

const Banana = () => {

const [theBreads, setTheBreads] = useState()



const fetchAllBread = async () => {
    
  const data = await fetchBanana()
  setTheBreads(data)
}

const renderLoading = () => (
  <CircularProgress />
)

const renderEmpty = () => (
  <h2 className="bp-loading">Empty</h2>
)

const renderAllBanana = () => {
  return theBreads.map(bread => (
    <div className="bp-bx" key={bread._id}>
      <Link to={`/info/${bread._id}`} style={{textDecoration: 'none'}}>
      <div className="bp-imgbx">
        <img src={bread.breadImage} alt="bakedbyart" className="bp-img" />
      </div>
      <div className="bp-des">
      <h4 className="bp-breadname">{bread.breadName}</h4>
      <h4 className="bp-breadname">₱ {bread.cost}</h4>
      <button className="bp-addtocart">ADD TO CART</button>
      </div>
      </Link>
    </div>
  ))
}



useEffect( () => {
    fetchAllBread()
}, [])
return (
<div className="banana-page page">
    <h2 className="bp-title">Collection of Banana Breads</h2>

    <div className="bp-container">
      {theBreads === undefined ? renderLoading() : !theBreads.length ? renderEmpty() : renderAllBanana()}
    </div>
</div>
)
}

export default Banana
