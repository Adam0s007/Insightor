import Profile from "../components/Profile/Profile";

import {useQuery} from '@tanstack/react-query'
import {fetchUser} from '../utils/http'

const ProfilePage = () => {
    const 
    queryObj = useQuery({
        queryKey: ['profile'],
        queryFn: (signal) => fetchUser(signal)
    })
    
    return (
        <Profile queryObj={queryObj} />
    );
}

export default ProfilePage;