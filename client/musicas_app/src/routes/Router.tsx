import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import PricingPage from '../pages/PlanosPage';
import CarrinhoPage from '../pages/CarrinhoPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "pricing", element: <PricingPage/>},
            { path: "carrinho", element: <CarrinhoPage/>}
        ]
    },
]);
export default router;