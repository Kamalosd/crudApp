import axios from'axios'

 export const bookBaseUrl=axios.create({
 baseURL:"http://localhost:9999/book"
})