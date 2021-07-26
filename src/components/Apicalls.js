import axios from 'axios';

const URL = 'https://bakedbyart.herokuapp.com/breads'
const USERURL = 'https://bakedbyart.herokuapp.com/users'
const NORMALURL = 'https://bakedbyart.herokuapp.com'

const SECAUTH = axios.create({
    baseURL: 'https://bakedbyart.herokuapp.com/orders'
})

const APIUSER = axios.create({
    baseURL: 'https://bakedbyart.herokuapp.com/validate'
})

const USERAUTH = axios.create({
    baseURL: USERURL
})

USERAUTH.interceptors.request.use( (req) => {

    req.headers.authori = `vakid ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})

APIUSER.interceptors.request.use( (req) => {

    req.headers.authori = `vakid ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})

SECAUTH.interceptors.request.use( (req) => {
    req.headers.authori = `belatmo ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})


export const fetchBreads = async () => {
try {
const {data} = await axios.get(URL)
return data
} catch (error) {
console.log(error)
}
}

export const delData = async (breadId) => {
    try {
      const {data} = await axios.delete(URL + `/delbread/${breadId}`)

    
      console.log(data)
       
    } catch (error) {
        console.log(error)
    }
} 

export const fetchBanana = async () => {
    try {
        const {data} = await axios.get('https://bakedbyart.herokuapp.com/breads/bananabreads')

        return data

    } catch (error) {
       alert('NETWORK ERROR')
       console.log(error)
    }
}

export const fetchCookies = async () => {
    try {
        const {data} = await axios.get('https://bakedbyart.herokuapp.com/breads/cookies')

        return data

    } catch (error) {
        console.log('No Internet')
    }
}

export const fetchBreadInfo = async (breadId) => {
try {
    const {data} = await axios.get(URL + `/info/${breadId}`)
    return data
    
} catch (error) {
    console.log(error)
}
}

export const axiosAddUser = async (formData) => {
    try {
    const {data} = await axios.post(USERURL + `/adduser`, formData)
    console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const axiosAuth = async (formData) => {
try {
    const {data} = await axios.post(USERURL + '/auth',formData)
    return data
} catch (error) {
    console.log(error)
}
}

export const axiosCreateOrder = async (theData) => {
    try {
    const {data} = await SECAUTH.post('/add', theData)

    return data

    } catch (error) {
        console.log(error)
    }
}

export const axiosfetchOderno = async (orderId) => {
    try {
        const {data} = await SECAUTH.get(`/orderinfo/${orderId}`)
        return data
    } catch (error) {
        console.log('error sa fetch orderId' + error)
    }
}


export const axiosValidateUser = async () => {
    try {
        const {data} = await APIUSER.get('/')
        return data
    } catch (error) {
        alert('You must be Logged In')
    }
}

// ACCOUNTS PAGE API

export const axiosUpdateUser = async (theData) => {
    try {
        const {data} = await USERAUTH.patch(`/updateuser`, theData)
        return data
    } catch (error) {
        alert("Failed To Update")
    }
}

export const axiosDelUser = async ( ) => {
    try {
        const {data} = await USERAUTH.delete(`/deluser`)
        return data
    } catch (error) {
        alert("Failed To DELETE")
    }
}

export const axiosChangePass = async (theData) => {
    try {
        const {data} = await USERAUTH.patch(`/passchange`, theData)
        console.log(data)
    } catch (error) {
        return alert("Failed To Proceed ")
    }
}

// CONTACT FORM
export const axiosSendMessage = async (theData) => {
    try {
       const {data} = await axios.post(NORMALURL + '/messages/newmessage', theData)
       console.log(data)
    } catch (error) {
        return alert("Failed To Proceed ")
    }
}

