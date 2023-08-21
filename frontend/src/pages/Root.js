import '../App.css';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = (props)=>{
    return (
        <main>
          <Header />
          <Outlet />
        </main>
      );
}

export default RootLayout;