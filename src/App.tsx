import AddEditProduct from './components/AddEditProduct';
import Login from './components/Login';
import ProductList from './components/ProductList';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  return (
      <Router>
      <Routes>
          <Route path="/" element={< ProductList />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/products" element={<ProductList />} />
          <Route path="/addProduct" element={<AddEditProduct />} />
          <Route path="/editProduct/:id" element={<AddEditProduct />} />
        </Routes>
      </Router>
  );
}

export default App;
