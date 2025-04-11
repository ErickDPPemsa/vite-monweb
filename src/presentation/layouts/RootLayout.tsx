import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";
import { NavBar } from "../components/NavBar";

export const RootLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const { pathname } = useLocation();
    if (authStatus !== AuthStatus.authorized) {
        return <Navigate replace to='/auth/login' />
    }

    if (pathname === '/') {
        return <Navigate to={'home'} />
    }

    return (
        <>
            <NavBar />
            <main className="p-4 flex flex-1 flex-col text-slate-800 dark:text-slate-200 container m-auto">
                <Outlet />
            </main>
        </>
    )
}