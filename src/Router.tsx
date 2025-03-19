import { createBrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    ),
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <ProjectsPage /> },
      {path: "/project/:id", element: <ProjectPage />},
    ],
  },
]);

export default router;