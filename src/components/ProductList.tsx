import React, { useState, Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/ProductList.css"
import { AiTwotoneDelete } from "react-icons/ai";
import { EditPencil, Sort } from 'iconoir-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react'
import {  useSelector } from 'react-redux';
import { deleteProduct, getProduct, productSelectors, getProductById } from '../redux/slice/product';
import { useAppDispatch } from '../redux/hook/redux';
import { Product } from '../redux/slice/product/type';
import ProductModal from './ProductModal';
import { RootState } from '../redux/RootReducer';
import { FaRegEye } from "react-icons/fa";

const ProductList: React.FC = () => {
    const productsSelector = useSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false)
    const [dataToShow, setDataToShow] = useState(null as Product | null)
    const [isOpen, setIsOpen] = useState(false)
    const [dataToDeleteId, setDataToDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    

    const navigate = useNavigate();
    useEffect(() => {
        getAllProduct();
    }, [])
    
    const viewProduct = (productId: any) => {
        dispatch(getProductById(productId))
        .then((response: any) => {
            setDataToShow(response.data)
            setShowModal(true)
            navigate('/products')
       })
    }

    const closeModal = () => setShowModal(false)

    function closeModalDelete() {
        setIsOpen(false)
    }
    
    function openModalDelete(productId: any) {
        setDataToDeleteId(productId);
        setIsOpen(true)
    }

    const [productPerPage, setProductPerPage] = useState<number | string>(8); // Số sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const totalPages = Math.ceil(
      productsSelector.length / (+productPerPage || 1)
    );

    // Cập nhật indexOfLastProduct và indexOfFirstProduct
  const productPerPageNumber = +productPerPage || 1; // Chuyển đổi productPerPage thành số và mặc định là 1 nếu không hợp lệ
  const indexOfLastProduct = currentPage * productPerPageNumber;
  const indexOfFirstProduct = indexOfLastProduct - productPerPageNumber;
  const currentdata = productsSelector.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const removeProduct = (productId: any) => {
    getAllProduct()
    dispatch(deleteProduct(productId));
    toast("Xóa thành công");
  };
    // const sortEmployeesHandler = () => {
    //   const sortType = 'firstName'; 
    //   const sortOrder = 'asc'; 
    //   dispatch(sortEmployees({ sortType, sortOrder }));
    // };

    const getAllProduct = () => {  
        dispatch(getProduct()); 
    };

    return (
        <div className="space-y-10 mx-20 mt-10">
            <h1 className="text-center font-bold text-[30px]"> List Products </h1>
            <Link to="/addProduct" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5" > Add Product </Link>
            <input
                type="text"
                placeholder="Search employees"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mx-20"
            />
            <table className="table table-bordered table-striped">
                <thead>
                    <th> 
                        Product name 
                        <Sort className='cursor-pointer' 
                        />
                    </th>
                    <th> Description </th>
                    <th> Price </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        currentdata
                        .filter(
                            (product: Product) =>
                                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((product)  =>
                                <tr key={product.id}>
                                    <td> {product.name} </td>
                                    <td>{product.description}</td>
                                    <td>Rs. {product.price.toLocaleString()}</td>
                                    <td className='flex'>
                                        <Link to={`/editProduct/${product.id}`} ><EditPencil/></Link>
                                        <AiTwotoneDelete className='cursor-pointer' onClick={() => openModalDelete(product.id)}
                                            style={{ marginLeft: "30px" }}/>
                                        <FaRegEye className='cursor-pointer' onClick={() => viewProduct(product.id)}
                                            style={{ marginLeft: "30px" }}/>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
                {showModal && dataToShow !== null && (<ProductModal onClose={closeModal} data={dataToShow}/>)}
            </table>
            <div className="pagination text-center space-y-5">
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <div className="space-x-5">
                    <button
                    // onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
                    disabled={currentPage === 1}
                    className={`pagination-button`}
                    >
                    Previous
                    </button>

                    <button
                    // onClick={() =>
                    //     dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
                    // }
                    // disabled={indexOfLastItem >= employees.length}
                    className={`pagination-button`}
                    >
                    Next
                    </button>
                </div>
                
                <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        // onClick={() => dispatch(setCurrentPage(index + 1))}
                        className={`pagination-number ${
                        index + 1 === currentPage ? 'active' : ''
                        }`}
                    >
                        {index + 1}
                    </button>
                    ))}
                </div>
            </div>
            <ToastContainer/>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Cảnh báo
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        Bạn có muốn xóa không?
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 mt-4 gap-5">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                if (dataToDeleteId) {
                                                    removeProduct(dataToDeleteId);
                                                    closeModalDelete();
                                                }
                                            }}
                                        >
                                            Có
                                        </button>
                                        
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModalDelete}
                                        >
                                            Không
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
  );
};

export default ProductList;
