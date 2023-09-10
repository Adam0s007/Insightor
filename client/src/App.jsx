import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import ArticleLayout from "./pages/ArticlesPage";
import ContactLayout from "./pages/Contact";
import NewArticlePage from "./pages/NewArticlePage";
import ArticleDetails from "./components/Articles/ArticleDetails/ArticleDetails";
import Articles from "./components/Articles/Articles";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AuthenticationPage from "./pages/AuthenticationPage";
import AuthErrorPage from "./pages/AuthErrorPage";
import ErrorPage from "./pages/ErrorPage";
import EditArticlePage from "./pages/EditArticlePage";
import { queryClient, authAction } from "./utils/http.js";
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
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage />, id: "home" },
        {
          path: "articles",
          element: <ArticleLayout />,
          id: "articles",
          children: [
            { index: true, element: <Articles />, id: "all-articles" },
            {
              path: "new",
              element: <NewArticlePage />,
              id: "new-article",
              loader: checkAuthLoader,
            },
            {
              path: ":articleId",
              children: [
                {
                  index:true,
                  element: <ArticleDetails />,
                  id: "article-details",
                }
                ,{
                  path: "edit",
                  element: <EditArticlePage />,
                  id: "edit-article",
                  //loader: checkAuthLoader,
                },
              ],
            },
          ],
        },

        { path: "contact", element: <ContactLayout />, id: "contact" },
        {
          path: "auth",
          element: <AuthenticationPage />,
          errorElement: <AuthErrorPage />,
          id: "auth",
          children: [
            {
              index: true,
              element: <Navigate to="/auth/login" />,
            },

            {
              path: "login",
              element: <Login />,
              id: "login",
            },
            {
              path: "register",
              element: <Register />,
              id: "register",
            },
          ],
          action: authAction,
        },
        {
          path: "logout",
          action: logoutAction,
          loader: checkAuthLoader,
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
