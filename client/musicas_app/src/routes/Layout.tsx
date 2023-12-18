import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

function Layout() {
  const checkAndAuthenticate = useAuthStore((state) => state.checkAndAuthenticate);

  useEffect(() => {
    console.log("Checking Authentication")
    checkAndAuthenticate();
  }, []);

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
