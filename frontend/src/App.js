import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import PostLayout from "./pages/PostsPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      children: [
        { index: true, element: <HomePage />, id: "home" },
        { path: "posts", element: <PostLayout />, id: "post" },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
