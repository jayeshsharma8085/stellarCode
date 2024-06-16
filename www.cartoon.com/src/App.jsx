import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "./globals/Topbar";
import Sidebar from "./globals/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./index.css";
import UserLoginRegister from './pages/loginregister';
import Home from './pages/home';
import ProductDetail from "./pages/productDetail";
import PaymentsPage from './pages/paymentsPage';
import HomeCarousel from './pages/crousal/HomeCarousel';
import { useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import {initializeApp} from 'firebase/app';
import firebaseConfig from './firebase';
import CheckoutPage from "./pages/Checkout";
import AddDeliveryAddressForm from './pages/AddAddress';
import InvoiceGenerator from './pages/invoicePage';

function App() {
  const location = useLocation();
  const app = initializeApp(firebaseConfig);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loader,setLoader] = useState(false);
  
  const visibleRoutes = ['/addProduct','/home','/cart','/'];
  const isRouteVisible = (route) => visibleRoutes.includes(route);
  
  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CssBaseline />
        <div className="app">
          <main className="content">
          <div className="topbarContainer">{isRouteVisible(location.pathname) && <Topbar />}</div>
          {loader && <Loader />}
            <Routes>
                <Route index element={<Home setLoader={setLoader}/>} />
                <Route path='/auth' element={<UserLoginRegister setLoader={setLoader}/>} />
                <Route path='/product/:productId' element={<ProductDetail setLoader={setLoader}/>} />
                <Route path='/cart' element={<Cart setLoader={setLoader}/>} />
                <Route path='/payment' element={<PaymentsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/address" element={<AddDeliveryAddressForm />} />
                <Route path="/invoice" element={<InvoiceGenerator />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;