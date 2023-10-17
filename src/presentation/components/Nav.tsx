
import React, { useCallback, useEffect, useRef } from 'react';
import logo from '../assets/pem-logo.png';
import avatar from '../assets/avatar.jpg';
import { TypeScale } from '../interfaces/types';
import { Text } from './Text';
import { Clock1, Home, InOut, Panel, Ticket, Users } from '../icons/icons';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth/auth.store';
import { TypeUser } from '../../interfaces';

interface PropsItem {
    title: string;
    isActive?: boolean;
    icon?: React.JSX.Element;
}

export const Nav = () => {
    const AsideRef = useRef<HTMLElement>(null);
    const user = useAuthStore(state => state.user);

    const Item = useCallback(
        ({ title, icon, isActive = false }: PropsItem) => {
            return (
                <li className={`container-item ${isActive ? 'container-item-active' : ''} `}>
                    {icon ?? null}
                    <Text variant={TypeScale.label_large} children={title} />
                </li>
            )
        },
        [],
    );
    useEffect(() => {
        AsideRef.current?.addEventListener('click', () => {
            AsideRef.current?.classList.remove('handle-show');
        })
    }, [AsideRef.current]);

    return (
        <aside ref={AsideRef} className="container-nav">
            <nav className="nav small" >
                <img className='img-dark' src={logo} alt="sss" />
                <div className="header">
                    <img className='elevation' src={avatar} alt="user" />
                    <span>
                        <Text className='title' style={{ fontWeight: 600 }} variant={TypeScale.body_large} children={user?.userName} />
                        <Text className='subtitle' variant={TypeScale.body_small} children={user?.fullName} />
                    </span>
                </div>
                <section className="menu">
                    <ul>
                        <NavLink style={{ textDecoration: 'none' }} to="/home">
                            {({ isActive }) => (<Item isActive={isActive} icon={Home()} title='Home' />)}
                        </NavLink>
                        {
                            (user?.role === TypeUser.admin) &&
                            <NavLink style={{ textDecoration: 'none' }} to="/users">
                                {({ isActive }) => (<Item isActive={isActive} icon={Users()} title='Users' />)}
                            </NavLink>
                        }
                        <NavLink style={{ textDecoration: 'none' }} to="/reports/install-system">
                            {({ isActive }) => (<Item isActive={isActive} icon={Panel()} title='Siatemas instalados' />)}
                        </NavLink>
                        <NavLink style={{ textDecoration: 'none' }} to="/reports/system-request">
                            {({ isActive }) => (<Item isActive={isActive} icon={Ticket()} title='Srs - Sta' />)}
                        </NavLink>
                        <NavLink style={{ textDecoration: 'none' }} to="/reports/technical-on-site">
                            {({ isActive }) => (<Item isActive={isActive} icon={InOut()} title='Tess - Tesse' />)}
                        </NavLink>
                        <NavLink style={{ textDecoration: 'none' }} to="/reports/attention">
                            {({ isActive }) => (<Item isActive={isActive} icon={Clock1()} title='Atención' />)}
                        </NavLink>
                    </ul>
                </section>
            </nav >
        </aside >
    )
}
