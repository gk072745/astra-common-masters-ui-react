import { useLocation, Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const auth = localStorage.getItem('auth');
    const correctPassword = import.meta.env.VITE_AUTH;
    // console.log(auth, correctPassword, location)

    if (!auth || auth !== correctPassword) {
        return <Navigate to="/login" state={{ prevRoute: location.pathname || "/" }} />
    }

    return children;
};
