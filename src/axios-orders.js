import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-demo-app.firebaseio.com'
})

export default instance
