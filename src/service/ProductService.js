import axios from "axios";
let URL_PRODUCT = "http://localhost:8080/products";

export const getAllProducts = async (name, categoryId) => {

    try {
        let url = "http://localhost:8080/products?_expand=category&_sort=name&_order=asc";
        if (name){
            url += `&name_like=${name}`;
        }
         if(categoryId){
             url += `&categoryId=${categoryId}`;
         }

       let resp = await axios.get(url);
        return {
            data: resp.data,
            total: resp.headers["x-total-count"]
        }
    } catch (e) {
        return {
           data: [],
            total:0
        }
    }


}



export const create = async (value) => {
    try {
        await axios.post(`${URL_PRODUCT}`, value)
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
