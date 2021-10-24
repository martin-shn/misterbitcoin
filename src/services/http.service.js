import Axios from 'axios'
import utilService from './utils.js'

const BASE_URL = ''
// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? '/api/'
//     : '//localhost:8080/api/'


var axios = Axios.create({
    // withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            // window.location.assign('/')
        }
        throw err
    }
}


export async function dummyData(len=40){
    const namesUrl = `https://randommer.io/api/Name?nameType=fullname&quantity=${len}`
    const phoneUrl = `https://randommer.io/api/Phone/Generate?CountryCode=il&Quantity=${len}`
    
    const names = await _fetch(namesUrl)
    const phones = await _fetch(phoneUrl)

    const contacts = Array(len).fill(null).map((contact,idx)=>(
        {
            _id: utilService.makeId(),
            n: names[idx],
            p: phones[idx],
            e: names[idx].toLowerCase().replace(' ','') + '@gmail.com',
            balance: 100,
            imgUrl: `https://robohash.org/${names[idx].toLowerCase().replace(' ','') + '@gmail.com'}?set=set5`
        }
    ))
    return contacts;
}

async function _fetch(url){
    try {
        var config = {
            method: 'get',
            url,
            headers: { 
              'X-Api-Key': '7ae89d9568ec49369408dde4fed608fa'
            }
          };
        const res = await axios(config)
        return res.data;
        }catch (err){
            console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
            console.dir(err)
            if (err.response && err.response.status === 401) {
            }
            throw err
        };    
}
