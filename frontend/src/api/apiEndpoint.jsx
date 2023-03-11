

let APIENDPOINT 

if (import.meta.env.PROD){
    APIENDPOINT = "http://157.245.44.13:1337/app-api"

} else{
    APIENDPOINT = "http://127.0.0.1:8000/app-api"
}

export default APIENDPOINT