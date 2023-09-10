import "../App.css";
import HeaderNavigation from "../components/HeaderNavigation";
import { Outlet, useLocation,useLoaderData,useSubmit } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/blog-background.jpg";
import { getTokenDuration } from "../utils/auth";
const RootLayout = (props) => {
  const { pathname } = useLocation();
 
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const element = <div className="add_space"></div>
  const HeaderNavigationHandler = () => {
    if (
      pathname.startsWith("/articles") &&
      pathname !== "/articles"
    ) {
      return element;
    }
    if (
      pathname === "/auth/login" ||
      pathname === "/auth/register" 
    ) {
      return element;
    }
    return <HeaderNavigation />;
  };

  useEffect(()=>{
    if(!token){
      return;
    }
    if(token === 'EXPIRED'){
      submit(null,{action:'/logout' , method: 'post'})
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(()=>{
      submit(null,{action:'/logout' , method: 'post'})
    },tokenDuration)
  },[token,submit])

  return (
    <>
      <img src={backgroundImage} alt="background" className="bg-image" />
      {HeaderNavigationHandler()}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
