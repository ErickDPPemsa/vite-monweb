import { Text } from "../components/Text";
import logo from '../assets/pem-logo.png';
import logoIso from '../assets/logo.png';
import { TypeScale } from "../interfaces/types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";

export const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);
  if (authStatus === AuthStatus.authorized) {
    return <Navigate to='/' />;
  }

  return (
    <article className="full-flex log-in-container">
      <aside className="banner elevation-2">
        <img className="banner-logo img-dark" src={logo} alt="logo" />
        <section className="banner-content">
          <Text variant={TypeScale.headline_medium} className="text-color">Hola, bienvenido de nuevo</Text>
          <img className="banner-content_img img-dark" src={logoIso} alt="logoIso" />
        </section>
      </aside>
      <section style={{ gap: '3rem' }} className="form-container">
        <Outlet />
      </section>
    </article>
  );
};