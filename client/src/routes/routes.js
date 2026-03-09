import Home from "../pages/HomePage.jsx";
import Gallery from "../pages/GalleryPage.jsx";
import Catalog from "../pages/CatalogPage.jsx";
import Contacts from "../pages/ContactsPage.jsx";
import Basket from "../pages/BasketPage.jsx";
import Register from "../pages/RegisterPage.jsx";
import Login from "../pages/LoginPage.jsx";
import CardPage from "../pages/CardPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import AdminRequestsPage from "../pages/AdminRequestsPage.jsx";
import RedactProduct from "../pages/RedactProduct.jsx";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/catalog/:id", element: <CardPage /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/basket", element: <Basket /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];

export const authRoutes = [{ path: "/profile", element: <ProfilePage /> }];

export const adminsRoutes = [
  { path: "/admin-panel", element: <AdminPage /> },
  { path: "/admin-panel/requests", element: <AdminRequestsPage /> },
  { path: "/catalog/:id/edit", element: <RedactProduct /> },
];
