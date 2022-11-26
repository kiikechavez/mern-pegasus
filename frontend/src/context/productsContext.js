import { useState, createContext, useContext, useEffect } from 'react';
import { getProductsRequest, createProductRequest, deleteProductRequest, getProductRequest, updateProductRequest } from '../api/products';

export const productContext = createContext()

export const useProducts = () => {
    const context = useContext(productContext);
    return context;
}

export const ProductProvideer = ({ children }) => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await getProductsRequest();
        setProducts(res.data);
    }

    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            setProducts([...products, res.data]);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (_id) => {
        const res = await deleteProductRequest(_id);
        try {
            if (res.status === 204) {
                setProducts(products.filter(product => product._id !== _id));
            }
        } catch (error) {
            return res.status(500).json("Error: " + error.message);
        }
    }

    const getProduct = async (_id) => {
        const res = await getProductRequest(_id)
        return res.data
    }

    const updateProduct = async (_id, product) => {
        const res = await updateProductRequest(_id, product)
        setProducts(products.map((product) => (product._id === _id ? res.data : product)));
    }

    useEffect(() => {
        getProducts();
    }, [])

    return <productContext.Provider value={{
        products,
        getProducts,
        createProduct,
        deleteProduct,
        getProduct,
        updateProduct
    }}>
        {children}
    </productContext.Provider>
}