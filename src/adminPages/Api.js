import axios from 'axios'



const SECAUTH = axios.create({
    baseURL: 'https://bakedbyart.herokuapp.com/admin'
})
SECAUTH.interceptors.request.use( (req) => {

    req.headers.authori = `belalat ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})


export const axiosGetOrders = async () => {
 try {
    const {data} = await SECAUTH.get('/allorders');
    
    return data
 } catch (error) {
     console.log(error)
    return error
 }
}

export const axiosDeliverUpdate = async (theId) => {
try {
    const {data} = await SECAUTH.patch(`/delivered/${theId}`)
    console.log(data)
   return data
} catch (error) {
    console.log(error)
    return error
}
}

export const axiosDeleteOrder = (eId) => {
    SECAUTH.delete(`/delorder/${eId}`)
    .then( () => console.log('deleted'))
    .catch(error => console.log('network error'))
}

// VALIDATE ADMIN
export const axiosValidAdmin = async () => {
    
    try {
     const {data} = await SECAUTH.get('/validate')
     console.log(data)
    } catch (error) {
        
       return 'invalid'

    }
}


// FETCH ALL MESSAGES

export const axiosFetchMessages = async () => {
    try {
        const {data} = await SECAUTH.get('/allmessage')
        return data
    } catch (error) {
        return alert("Failed To Proceed")
    }
}

export const axiosDelMessage = async (messId) => {
    try {
        const {data} = await SECAUTH.delete(`/delmessage/${messId}`)
        return data
    } catch (error) {
        return alert("Failed To Proceed")
    }
}