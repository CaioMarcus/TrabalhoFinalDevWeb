import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import Layout from "./Layout";

function PrivateRoutes(){
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated){
        return <Navigate to="/login"/>
    }

    return <Layout/>
}
export default PrivateRoutes;