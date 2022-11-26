import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useProducts } from '../context/productsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function ProductsPage() {

  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  })

  useEffect(() => {
    (async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setProduct(product);
      }
    })();
  }, [params.id]);


  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Create a new product</h3>
          <Link to="/" className="text-black text-sm hover:bg-blue-200 bg-blue-400 px-2">Go back</Link>
        </header>

        <Formik
          initialValues={product}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().required("Price is required"),
            stock: Yup.number().required("Stock is required")
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateProduct(params.id, values);
            } else {
              await createProduct(values);
            }
            actions.setSubmitting(false);
            navigate('/')
          }}
          enableReinitialize
        >
          {
            ({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-sm block font-bold text-gray-400">Name</label>
                <Field name='name' className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4" placeholder="name" /> <ErrorMessage component="p" className="text-red-500 text-sm" name='name' />
                <label htmlFor="name" className="text-sm block font-bold text-gray-400">Description</label>
                <Field component="textarea" name='description' className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4" placeholder="description" rows={3} /> <ErrorMessage component="p" className="text-red-500 text-sm" name='description' />
                <label htmlFor="name" className="text-sm block font-bold text-gray-400">Price</label>
                <Field name='price' className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4" placeholder="price" /> <ErrorMessage component="p" className="text-red-500 text-sm" name='price' />
                <label htmlFor="name" className="text-sm block font-bold text-gray-400">Stock</label>
                <Field name='stock' className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4" placeholder="stock" /> <ErrorMessage component="p" className="text-red-500 text-sm" name='stock' />
                <label htmlFor="name" className="text-sm block font-bold text-gray-400">Image</label>
                <input type="file" name="image" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" onChange={(e) => setFieldValue('image', e.target.files[0]) }/>
                <button type='submit' className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" disabled={isSubmitting}>{isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"/>
                ) : 'Save'}</button>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}