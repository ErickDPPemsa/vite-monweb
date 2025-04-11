import { Text } from "../components/Text";
import logo from '../assets/pem-logo.png';
import logoIso from '../assets/logo.png';
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { AuthStatus } from "../../interfaces";
import { Avatar } from "flowbite-react";

export const AuthLayout = () => {
  const authStatus = useAuthStore(state => state.status);
  if (authStatus === AuthStatus.authorized) {
    return <Navigate to='/' />;
  }

  return (
    <main className="flex h-screen">
      <aside className="w-96 flex flex-col shadow-lg dark:shadow-slate-700 p-[1rem] bg-slate-50 dark:bg-slate-900 justify-between">
        <Avatar img={logo} alt="logo" rounded className="self-start dark:grayscale dark:invert" />
        <Text className="font-semibold" variant="text-3xl">Hello, wellcome back...</Text>
        <img className="w-full dark:grayscale dark:invert drop-shadow-lg" src={logoIso} alt="logoIso" />
      </aside>
      <section className="flex-1 flex items-center justify-center">
        <Outlet />
      </section>
    </main >
  );
};