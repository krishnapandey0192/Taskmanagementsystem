import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <NavBar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
