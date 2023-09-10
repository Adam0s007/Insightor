import { isExpired, decodeToken } from "react-jwt";
import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);

    if (!decoded || !decoded.exp) {
        return 0;
    }

    const expirationDate = new Date(decoded.exp * 1000); // JWT exp is in seconds, so convert to milliseconds
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if(!token)return null;
    if (isExpired(token)) {
        return 'EXPIRED';
    }
   
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    
    const token = getAuthToken();
    if (!token || token === 'EXPIRED') {
        return redirect('/auth/login');
    }
    return null;
}
