import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/product/";

class ProductService {
    addProduct(name, list_of_ingredient) {
        const data = {
            "product": {
                'name': name
            },
            "ingredients": list_of_ingredient
        }
        return axios
            .post(API_URL + "products/add", data, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getIngredients() {
        return axios
            .get(API_URL + "ingredients/all", {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.ingredients;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    getProductById(ID) {
        return axios
            .get(API_URL + "product/" + ID, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.product;
                }
            })
            .catch(error => {
                throw Error(error.response.data.data.error_message)
            });
    }

    uploadImage(id, name, file) {
        const formData = new FormData()
        formData.append(
            'image',
            file,
            file.name
        )
        formData.append(
            'id',
            id
        )
        formData.append(
            'name',
            name
        )
        return axios.put(API_URL + "product/update", formData, {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data.message;
                }
            })
            .catch(error => {
                console.log(error.data)
                return error.data;
            });
    }
}

export default new ProductService();