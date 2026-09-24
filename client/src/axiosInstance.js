import axios from 'axios'

export const bookBaseUrl = axios.create({
  baseURL: "http://localhost:9999/book"
})

export const userBaseUrl = axios.create({
  baseURL: "http://localhost:9999/user"
})

