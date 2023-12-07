import axios from 'axios'
// import { baseUrl } from './utils/helpers'

const http = axios.create({
  baseURL: "https://api.tractrac.co/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true
})

export default http
