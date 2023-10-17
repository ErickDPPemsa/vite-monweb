import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Nav } from "../components/Nav";
import { TopBar } from "../components/TopBar";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";

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
        <article className="content">
            <Nav />
            <section className="main">
                <TopBar />
                <Outlet />
            </section>
        </article>
    )
}