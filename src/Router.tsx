import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import Contact from './pages/Contact';
import DonationPage from './pages/DonationPage';
import AuthPage from './pages/AuthPage';
import PaymentPage from './pages/PaymentPage';
import About from './pages/About';
import PartnersSection from './pages/Partners';
import GiftShopping from './pages/GiftShopping';
import {UserPage} from './pages/UserPage';
import { Cart } from './pages/Cart';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <ProjectsPage /> },
      {path: "/project/:id", element: <ProjectPage />},
      {path: "/contact", element: <Contact />},
      {path: "/donation", element: <DonationPage />},
      {path: "/auth", element: <AuthPage />},
      {path: "/payment", element: <PaymentPage />},
      {path: "/about", element: <About />},
      {path: "/partners", element: <PartnersSection />},
      {path: "/gift-shopping", element: <GiftShopping />},
      {path: "/user", element: <UserPage />},
      {path: "/cart", element: <Cart />},

    ],
  },
]);

export default router;