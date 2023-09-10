import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import ArticleLayout from "./pages/ArticlesPage";
import ContactLayout from "./pages/Contact";
import NewArticle from "./components/NewArticle/NewArticle";
import ArticleDetails from "./components/Articles/ArticleDetails/ArticleDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AuthenticationPage from "./pages/AuthenticationPage";
import { queryClient ,authAction} from "./utils/http.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthLoader } from "./utils/auth.js";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage />, id: "home" },
        {
          path: "articles",
          element: <ArticleLayout />,
          id: "articles",
        },
        {
          path: "articles/:articleId",
          element: <ArticleDetails />,
          id: "article-details",
        },
        { path: "contact", element: <ContactLayout />, id: "contact" },
        {
          path: "auth",
          element: <AuthenticationPage />,
          id: "auth",
          
          children: [
            { path: "login", element: <Login />, id: "login" },
            { path: "register", element: <Register />, id: "register" },
          ],
          action: authAction
        },

        { path: "new-article", element: <NewArticle />, id: "new-article" },
        ,
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
