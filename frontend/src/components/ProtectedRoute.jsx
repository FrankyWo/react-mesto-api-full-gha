import { Navigate } from "react-router-dom";

const ProtectedRouteElement = (props) => {
    return props.isLoggedIn ? <props.component {...props} /> : <Navigate to="/signin" replace />;
};

export default ProtectedRouteElement;
