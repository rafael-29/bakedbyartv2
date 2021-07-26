import { CircularProgress } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import {fetchBreadInfo} from './Apicalls'

const Info = ({theInfo, setCartImg }) => {

const history = useHistory()
const infoId = theInfo.match.params.id

const [breadDetails, setBreadDetails] = useState()
const [theQnty, setTheQnty] = useState(1)

const findFunc = async () => {

const result = await fetchBreadInfo(infoId)

setBreadDetails(result)

}


const saveToLocal = () => {

    const toSave = {
        bId: breadDetails._id,
        bName:breadDetails.breadName,
        cost: breadDetails.cost * theQnty,
        qnty: theQnty,
        bImg: breadDetails.breadImage,
        categ: breadDetails.categ
    }

 

  let breads
  if(localStorage.getItem('carts') === null){
    breads = [];
    breads.push({...toSave})
    
    localStorage.setItem('carts', JSON.stringify(breads))
    setCartImg(JSON.parse(localStorage.getItem('carts')))
  }else{
    breads = JSON.parse(localStorage.getItem('carts'))
    
    const exist = breads.find(br =>br.bId === toSave.bId)

    if(exist){
        const newObj = {
            bId: toSave.bId,
            bName:toSave.bName,
            cost: exist.cost + toSave.cost,
            qnty: exist.qnty + toSave.qnty,
            bImg: toSave.bImg,
            categ: toSave.categ
        }
        let newArr = breads.filter(bre => bre.bId !== toSave.bId)
        newArr.push(newObj)
        localStorage.setItem('carts', JSON.stringify(newArr))
        setCartImg(JSON.parse(localStorage.getItem('carts')))
        return alert('Added To Cart')
    }

    breads.push({...toSave})
    localStorage.setItem('carts', JSON.stringify(breads))
    setCartImg(JSON.parse(localStorage.getItem('carts')))
  }

  alert('Added To Cart')

}

const testMap = () => {
    if(breadDetails.categ === 'banana'){
        history.push('/banana')
    }else{
        history.push('/cookies')
    }
}

const renderInfo = () => (
<div className="info-page-bx page">
    <div className="ip-left">
        <img src={breadDetails.breadImage}
         alt="bakedbyart" className="ip-leftimg" />
    </div>
    <div className="ip-right">
        <h3 className="ip-breadname">{breadDetails.breadName}</h3>
        <h5 className="ip-cap">MENU</h5>
        <p className="ip-descr">
            {breadDetails.description}
        </p>
        <h3 className="amount">Amount ₱ {breadDetails.cost}</h3>
        <div className="ip-qntybx">
            <div onClick={() => {
            theQnty === 1 ?  setTheQnty(1) : setTheQnty(prev => prev -1)
            
            }} className="ipbtnx">-</div>
            <div className="ip-amnt">{theQnty}</div>
            <div onClick={() => setTheQnty(prev => prev + 1)} className="ipbtnx">+</div>
        </div>
        <h5 className="ip-cap">TOTAL PRICE</h5>
        <div className="total-price">{breadDetails.cost * theQnty}</div>
        <div className="ip-btnsbx">
            <button onClick={saveToLocal} className="ip-btnsingle ip-add-to-cart">ADD TO CART</button>
            <button onClick={testMap} className="ip-btnsingle ip-cancelbtn">BACK TO MENU</button>
        </div>
    </div>
</div>
)
useEffect( () => {
    findFunc()
}, [])
return (
<div className="info-page page">

{breadDetails === undefined ? <CircularProgress /> : !breadDetails ? <h2>No Result</h2> : renderInfo()}


</div>
)
}

export default Info
