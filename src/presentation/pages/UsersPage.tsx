import { Navigate } from "react-router-dom";
import { TypeUser } from "../../interfaces";
import { useAuthStore } from "../../stores";

const UsersPage = () => {
    const user = useAuthStore(state => state.user);
    return (user?.role === TypeUser.user)
        ?
        <Navigate to="/home" />
        :
        <div>
            User-Page
        </div>

}

export default UsersPage;

