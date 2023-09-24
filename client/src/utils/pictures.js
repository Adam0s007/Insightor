
import {defaultUrl} from "./http.js"

export const url = defaultUrl

export const getPicture = (imgUrl) =>(
    imgUrl ? defaultUrl +"/"+ imgUrl : ""
)