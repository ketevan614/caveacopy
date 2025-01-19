import { Outlet } from 'react-router-dom';
import Header from './Header/Header'
import Footer from './Footer/Footer';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
const Layout = () => {
    const location = useLocation();
    const noHeaderRoutes = ["/login", "/register"];
    const showHeader = !noHeaderRoutes.includes(location.pathname);
    const [inputValue, setInputValue] = useState(''); 

    const handleInputChange = (value) => {
        setInputValue(value); 
    };
    return (
    <>  
        {showHeader && <Header/>}
        <Outlet />
        {/*{showHeader && <Footer/>}*/}
    </>);
};
export default Layout;