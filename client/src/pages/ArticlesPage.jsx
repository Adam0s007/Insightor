import Articles from '../components/Articles/Articles';

import { Outlet } from 'react-router-dom';
const ArticleLayout = (props)=>{
    return(
        <>
        <Outlet /> 
        
        </>
    )
}

export default ArticleLayout;