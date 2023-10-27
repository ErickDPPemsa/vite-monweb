import { Text } from "../components/Text";
import logo from '../assets/pem-logo.png';
import logoIso from '../assets/logo.png';
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";

export const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);
  if (authStatus === AuthStatus.authorized) {
    return <Navigate to='/' />;
  }

  return (
    <main className="log-in-container">
      <aside className="banner elevation-2">
        <img className="banner-logo img-dark" src={logo} alt="logo" />
        <section className="banner-content">
          <Text variant="Headline-large">Hello, wellcome back...</Text>
          <img className="banner-content_img img-dark" src={logoIso} alt="logoIso" />
        </section>
      </aside>
      <section style={{ gap: '3rem' }} className="form-container">
        <Outlet />
      </section>
    </main>
  );
};