import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import Footer from "../components/Footer";

export const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}