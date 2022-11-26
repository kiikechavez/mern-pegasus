import axios from 'axios';

export const getProductsRequest = async () => await axios.get('/products');

export const createProductRequest = async (product) => {
    const form = new FormData()

    for (let key in product){
        form.append(key, product[key])
    }

    return await axios.post('/products', form, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
}
    

export const deleteProductRequest = async _id => await axios.delete('/products/'+_id)

export const getProductRequest = async _id => await axios.get('/products/'+_id)

export const updateProductRequest = async (_id, newFields) => await axios.put(`/products/${_id}`, newFields)