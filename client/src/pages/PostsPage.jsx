import Articles from '../components/Posts/Articles';
import Search from '../components/Posts/Search';
import { Outlet } from 'react-router-dom';
const PostLayout = (props)=>{
    return(
        <>
        <Search />
        {/* <Outlet /> -> gdy children z path: "posts" to :postId to zadziala tutaj! inaczej nie bedzie widoczne */}
        <Articles/>
        </>
    )
}

export default PostLayout;