import axios from "axios"

const API  = "http://localhost:9876/api"

export const registerRequest  = user =>  axios.post(`${API}/register`, user )