import '../App.css';
import HeaderNavigation from '../components/HeaderNavigation';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import backgroundImage from '../assets/images/blog-background.jpg'
const RootLayout = (props)=>{
    return (
        <>
          <img src={backgroundImage} alt="background" className="bg-image" />
          <HeaderNavigation />
          <Outlet />
          <Footer />
          </>  
        
      );
}

export default RootLayout;