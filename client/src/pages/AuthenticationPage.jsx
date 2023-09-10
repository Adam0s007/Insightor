import {Outlet} from 'react-router-dom'
const AuthenticationPage = () => {
    const onSubmitHandler = (data) =>{
        console.log(data)
    }
    
    return (
        <Outlet onSubmit={onSubmitHandler} />        
    );
}

export default AuthenticationPage;


