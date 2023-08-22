import '../App.css';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../assets/images/blog-background.jpg'
const RootLayout = (props)=>{
    return (
        <main className="main-page">
          <img src={backgroundImage} alt="background" className="bg-image" />
          <Header />
          <Outlet />
        </main>
      );
}

export default RootLayout;