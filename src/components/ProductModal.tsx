import { useSelector } from 'react-redux'
import '../styles/ProductModal.css'
import { Product } from '../redux/slice/product/type'
import { RootState } from '../redux/RootReducer';

type Props = {
    onClose: () => void,
    data: Product
}

const ProductModal = (props: Props) => {
  const {onClose, data} = props
  const product = useSelector((state: RootState) => state.product.selectProduct);

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          <h3 className='font-bold my-5 text-[20px]'>Product Data</h3>
          <div>
          {product && (
            <>
            <div> 
              <label>Name: {product.name}</label>
            </div>
            <div>
              <label>Description: {product.description}</label>
            </div>
            <div>
              <label>Price: {product.price}</label>
            </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal