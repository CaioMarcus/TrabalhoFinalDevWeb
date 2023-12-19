import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import PricingPage from '../pages/PlanosPage';
import CarrinhoPage from '../pages/CarrinhoPage';
import PrivateRoutes from './PrivateRoutes';
import MusicasPage from '../pages/MusicasPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "planos", element: <PricingPage/>},
            { path: "carrinho", element: <CarrinhoPage/>}
        ] 
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            {path: "musicas", element: <MusicasPage /> }
        ]
    }
]);
export default router;