import axios from "axios";

const URL_CATEGORIES = "http://localhost:8080/categories"

export const getAllCategories = async () => {
    try {
        let res = await axios.get(URL_CATEGORIES);
        return res.data;
    } catch (e) {
        return []
    }
}