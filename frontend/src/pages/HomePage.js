import { ImFilesEmpty } from "react-icons/im";
import { useProducts } from "../context/productsContext";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export function HomePage() {
  const { products } = useProducts();

  const PrincipalRender = () => {

    if (products.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center">
          <ImFilesEmpty className="w-40 h-40 text-black" />
          <h1 className="text-2xl text-black">There aren't any products yet</h1>
        </div>
      );
    } else {
      return (
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      )
    }
  }

  return (
    <div className="text-white">
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-black font-bold"> Products ({products.length})</h1>
        <Link to="/new" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">Create a new product</Link>
      </header>
      {PrincipalRender()}
    </div>
  );
}
