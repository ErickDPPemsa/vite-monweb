import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthLayout, RootLayout } from "../presentation/layouts";

import LogInPage from "../presentation/auth/pages/LogInPage";
import NotFoundPage from "../presentation/pages/not-found.page";
import UsersPage from '../presentation/pages/UsersPage';
import HomePage from '../presentation/pages/HomePage';
import RegisterPage from '../presentation/auth/pages/RegisterPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement:
            <article className="content">
                <NotFoundPage />
            </article>,
        children: [
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path: 'users',
                element: <UsersPage />
            },
            {
                path: 'reports',
                element: <Outlet />,
                children: [
                    {
                        path: 'install-system',
                        element: <>install-system</>
                    },
                    {
                        path: 'system-request',
                        element: <>system-request</>
                    },
                    {
                        path: 'technical-on-site',
                        element: <>technical-on-site</>
                    },
                    {
                        path: 'attention',
                        element: <>attention</>
                    },
                ]
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LogInPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    }
]);