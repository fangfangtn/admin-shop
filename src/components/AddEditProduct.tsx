import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewProduct,
  updateExistingProduct,
  getProductById,
  getProduct,
} from '../redux/slice/product';
import { RootState } from '../redux/RootReducer';
import { Product } from '../redux/slice/product/type';

const AddEditProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const selectedProduct = useSelector((state: RootState) => state.product.selectProduct);

  useEffect(() => {
    // Fetch product details if in update mode
    if (id) {
      // Fetch the product based on the provided ID
      dispatch(getProductById(Number(id)) as any);
    }
  }, [dispatch, id]);

  // Set form fields based on the selected product (if in update mode)
  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name);
      setProductDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  const saveOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const product: Partial<Product> = { name: productName, description: productDescription };
  
    if (id) {
      // Update existing product
      await dispatch(updateExistingProduct({ id: Number(id), data: product }) as any);
      // Fetch the updated product details after the update
      await dispatch(getProductById(Number(id)) as any);
      navigate('/products');
    } else {
      // Add new product
      const addedProduct = await dispatch(addNewProduct(product) as any);
      // Fetch the details of the newly added product
      await dispatch(getProductById(addedProduct.id) as any);
      navigate('/products');
    }
  };
  

  return (
    <div className="max-w-xs grid mx-auto w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h1 className="text-center font-bold">{id ? 'Update Product' : 'Add Product'}</h1>
          <div>
            <form>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">Product Name:</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">Product Description:</label>
                <textarea
                  placeholder="Enter product description"
                  name="productDescription"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5 mx-5"
                  type="button"
                  onClick={(e) => saveOrUpdateProduct(e)}
                >
                  Submit
                </button>
                <Link
                  to="/products"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5"
                  type="button"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;
