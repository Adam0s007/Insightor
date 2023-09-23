export const url = `http://localhost:4002/`


export const getPicture = (imgUrl) =>(
    imgUrl ? url + imgUrl : ""
)