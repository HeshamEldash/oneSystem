let APIENDPOINT = "http://127.0.0.1:8000/app-api"

if (import.meta.env["PROD"]){
    APIENDPOINT = import.meta.env["BACKEND_ENDPOINT"]
}  

export default APIENDPOINT