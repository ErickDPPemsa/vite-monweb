import React from 'react';
import logo from '../assets/pem-logo.png';
import avatar from '../assets/avatar.jpg';
import { Text } from './Text';
import { NavLink } from 'react-router-dom';
import { useNavs } from '../../hooks/useNavs';

interface PropsItem {
    title: string;
    path: string;
    icon?: React.JSX.Element;
}

const Item = ({ title, icon, path }: PropsItem) => {
    return (
        <NavLink style={{ textDecoration: 'none' }} to={path}>
            {({ isActive }) =>
                <li className={`container-item ${isActive ? 'container-item-active' : ''} `}>
                    {icon ?? null}
                    <Text children={title} />
                </li>
            }
        </NavLink>
    )
};

export const Nav = () => {
    const { AsideRef, Navs, user } = useNavs();
    return (
        <aside ref={AsideRef} className="container-nav">
            <nav className="nav small" >
                <img className='img-dark' src={logo} alt="sss" />
                <div className="header">
                    <img className='elevation' src={avatar} alt="user" />
                    <span>
                        <Text className='title' style={{ fontWeight: 600 }} children={user?.userName} />
                        <Text className='subtitle Label-medium' children={user?.fullName} />
                    </span>
                </div>
                <section className="menu">
                    <ul>
                        {Navs.map((props, idx) => <Item key={idx + 1} {...props} />)}
                    </ul>
                </section>
            </nav >
        </aside >
    )
}
