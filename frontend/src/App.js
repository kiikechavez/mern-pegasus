import { HomePage, NotFound, ProductsPage} from "./pages";
import { Routes, Route } from "react-router-dom";
import { ProductProvideer } from "./context/productsContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="bg-neutral-300 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <ProductProvideer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </ProductProvideer>
      </div>
    </div>
  );
}

export default App;
