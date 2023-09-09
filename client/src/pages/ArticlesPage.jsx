import Articles from '../components/Articles/Articles';

import { Outlet } from 'react-router-dom';
const ArticleLayout = (props)=>{
    return(
        <>
        {/* <Outlet /> -> gdy children z path: "articles" to :postId to zadziala tutaj! inaczej nie bedzie widoczne */}
        <Articles/>
        </>
    )
}

export default ArticleLayout;