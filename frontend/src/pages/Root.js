import '../App.css';
import HeaderNavigation from '../components/HeaderNavigation';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../assets/images/blog-background.jpg'
const RootLayout = (props)=>{
    return (
        <main className="main-page">
          <img src={backgroundImage} alt="background" className="bg-image" />
          <HeaderNavigation />
          <Outlet />
        </main>
      );
}

export default RootLayout;