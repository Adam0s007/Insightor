import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import PostLayout from "./pages/PostsPage";
import ContactLayout from "./pages/Contact";
import NewArticle from "./components/NewArticle/NewArticle";
import PostDetails from "./components/Posts/PostDetails";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      children: [
        { index: true, element: <HomePage />, id: "home" },
        {
          path: "posts",
          element: <PostLayout />,
          id: "posts",
        
        },
        { path: "posts/:postId", element: <PostDetails />, id: "post-details"},
        { path: "contact", element: <ContactLayout />, id: "contact" },
        { path: "new-article", element: <NewArticle />, id: "new-article" },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
