import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { routes } from './routes'



const MainRoutes = () => {
    return (
        <Routes>

            {
                routes.map(({ path, isPrivate, Component }, index) => (

                    <Route key={index} path={path} element={
                        isPrivate ? <Component /> : <PrivateRoute><Component /> </PrivateRoute>}
                    />
                ))
            }
        </Routes>
    );
};

export default MainRoutes;


