
import {defaultUrl} from "./http.js"

export const url = defaultUrl

export const getPicture = (imgUrl) =>{
    console.log(imgUrl)
    return imgUrl ? defaultUrl +"/"+ imgUrl : ""
}