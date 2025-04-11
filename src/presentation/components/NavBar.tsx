import avatar from '../assets/avatar.jpg';
import logo from '../assets/pem-logo.png';
import { Moon, Sun } from '../icons/icons';
import { useTopMenu } from '../../hooks/useTopMenu';
import { useThemeStore } from '../../stores';
import { ThemeMode } from '../../interfaces';
import { useCallback } from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useNavs } from '../../hooks/useNavs';
import { NavLink } from 'react-router-dom';
interface PropsItem {
    title: string;
    path: string;
    icon?: React.JSX.Element;
}

export const NavBar = () => {
    const { user, LogOut } = useTopMenu();
    const updateMode = useThemeStore(store => store.updateMode);
    const mode = useThemeStore(store => store.mode);
    const { Navs } = useNavs();


    const Item = ({ title, icon, path }: PropsItem) => {
        return (
            <NavLink style={{ textDecoration: 'none' }} to={path} onClick={() => document.querySelector("#menu-sidebar")?.classList.toggle("-translate-x-full")}>
                {({ isActive }) =>
                    <span className={`flex gap-2 px-2 py-1 items-center rounded-lg transition duration-75 text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 dark:text-slate-400 ${isActive && 'font-semibold bg-slate-300 text-slate-800 dark:bg-slate-200 dark:text-slate-800'}`}>
                        {icon ?? null}
                        <p className={`${isActive && 'text-slate-800 dark:text-slate-800'}`}>{title}</p>
                    </span>
                }
            </NavLink>
        )
    };

    const ToggleTheme = useCallback(
        () =>
            <span className='flex'>
                {
                    mode === ThemeMode.light
                        ?
                        <button className='text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-lg' onClick={() => updateMode(ThemeMode.dark)}>
                            <Moon />
                        </button>
                        :
                        <button className='text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-lg' onClick={() => updateMode(ThemeMode.light)}>
                            <Sun />
                        </button>
                }
            </span>
        ,
        [mode, updateMode],
    )

    return (
        <Navbar fluid rounded className='bg-slate-50 dark:bg-slate-900'>
            <Navbar.Brand href="#">
                <img src={logo} className="mr-3 h-6 sm:h-9 dark:grayscale dark:invert" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pemsa Monitoreo </span>
            </Navbar.Brand>
            <div className="flex md:order-2 gap-5 items-center">
                <ToggleTheme />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="user photo" img={avatar} rounded />
                    }
                >
                    <Dropdown.Header className='min-w-[200px]'>
                        <span className="block text-sm">{user?.fullName}</span>
                        <span className="block truncate text-sm font-medium">{user?.role}</span>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={LogOut}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {Navs.map(({ validate, ...props }, idx) => validate && <Item key={idx + 1} {...props} />)}
            </Navbar.Collapse>
        </Navbar>
    )
}
