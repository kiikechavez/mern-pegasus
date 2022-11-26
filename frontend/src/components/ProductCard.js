import toast from 'react-hot-toast';
import { useProducts } from '../context/productsContext';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ product }) {

  const { deleteProduct } = useProducts();
  const navigate = useNavigate();



  const handlerDelete = (_id, name) => {
    toast((t) => (
      <div>
        <p className="text-white items-center flex justify-center">
          Do you want to delete?
        </p>
        <p className="text-white items-center flex justify-center">
          <strong>{name}</strong>
        </p>
        <div className="flex justify-center py-2">
          <button className="bg-red-600 hover:bg-red-400 text-sm px-3 py-1 text-white rounded-sm mx-2" onClick={() => { deleteProduct(_id); toast.dismiss(t.id); }}  >Yes</button>
          <button className='bg-slate-400 hover:bg-slate-500 px-3 py-1 text-white rounded-sm mx-2' onClick={() => toast.dismiss(t.id)}>Not</button>
        </div>
      </div>
    ), {
      style: {
        background: "#202020",
      },
    })
  }

  const handlerUpdate = (_id, name) => {
    toast((t) => (
      <div>
        <p className="text-white items-center flex justify-center">
          Do you want to update?
        </p>
        <p className="text-white items-center flex justify-center">
          <strong>{name}</strong>
        </p>
        <div className="flex justify-center py-2">
          <button className="bg-red-600 hover:bg-red-400 text-sm px-3 py-1 text-white rounded-sm mx-2" onClick={() => {
            navigate(`/products/${product._id}`);
            toast.dismiss(t.id);
          }}  >Yes</button>
          <button className='bg-slate-400 hover:bg-slate-500 px-3 py-1 text-white rounded-sm mx-2' onClick={() => toast.dismiss(t.id)}>Not</button>
        </div>
      </div>
    ), {
      style: {
        background: "#202020",
      },
    })
  }

  return (

    <div className="bg-zinc-700 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-400 hover:cursor-pointer">
      <div className="px-4 py-7">
        <div id="header">
          <h1><strong className="text-2xl text-yellow-400 font-bold font-semibold">{product.name}</strong></h1>
        </div>
      </div>
      <div className="p-3">
        <div className="mb-2">
          <p><strong className="text-red-400">Description:</strong> {product.description}</p>
        </div>
        <div className="flex justify-between">
          <p><strong className="text-red-400">Price:</strong> <span className="text-blue-200">${product.price}</span></p>
          <button className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-400 mb-2" onClick={(e) => { e.stopPropagation(); handlerUpdate(product._id, product.name); }}>
            Editar
          </button>
        </div>
        <div className="flex justify-between">
          <p><strong className="text-red-400">In stock:</strong> <span className="text-blue-200">{product.stock}</span></p>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-400" onClick={(e) => { e.stopPropagation(); handlerDelete(product._id, product.name); }}>
            Delete
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden h-screen">
        {product.image && <img src={product.image.url} className="absolute h-full w-full object-fit" alt='products'/>}
      </div>
    </div>

  );
}
