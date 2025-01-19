import { createBrowserRouter } from "react-router-dom";

import { Children } from "react";
import Movies from '../pages/Movies/Movies';
import Layout from '../components/Layout/Layout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'
import SingleProduct from "../components/SingleProduct/SingleProduct";
import Favourites from "../pages/Favourites/Favourites";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path:'/favourites',
                element: <Favourites/>
            },
            {
                path: '/movies',
                element: <Movies />,
            },
            {

                path: '/movies/:id',
                element: <SingleProduct />

            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])