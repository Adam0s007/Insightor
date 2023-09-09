import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import ArticleLayout from "./pages/ArticlesPage";
import ContactLayout from "./pages/Contact";
import NewArticle from "./components/NewArticle/NewArticle";
import ArticleDetails from "./components/Articles/ArticleDetails/ArticleDetails";
import Auth from "./pages/Auth";

import {queryClient} from './utils/http.js';
import { QueryClientProvider } from "@tanstack/react-query";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      children: [
        { index: true, element: <HomePage />, id: "home" },
        {
          path: "articles",
          element: <ArticleLayout />,
          id: "articles",
        },
        { path: "articles/:articleId", element: <ArticleDetails />, id: "article-details" },
        { path: "contact", element: <ContactLayout />, id: "contact" },
        { path: "login", element: <Auth />, id: "login" },
        { path: "new-article", element: <NewArticle />, id: "new-article" },
      ],
    },
  ]);

  return (
    <QueryClientProvider 
    
    client={queryClient}
    >
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
