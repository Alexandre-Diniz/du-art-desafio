import axios from 'axios'
import host from './host'

export default axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: host
})