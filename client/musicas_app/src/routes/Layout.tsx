import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import useCarrinho from "../hooks/useCarrinho";

function Layout() {
  const authStore = useAuthStore();
  const carrinho = useCarrinho();

  useEffect(() => {
    authStore.checkAndAuthenticate();
    console.log(authStore)
  }, []);

  
  useEffect(() => {
    if (!authStore.isAuthenticated) return;
    carrinho.atualizaCarrinho();
  }, [authStore.isAuthenticated])

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
}
export default Layout;
