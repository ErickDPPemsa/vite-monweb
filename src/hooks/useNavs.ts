import { useEffect, useRef } from "react";
import { Clock1, Home, InOut, Panel, Ticket, Users } from '../presentation/icons/icons';
import { useAuthStore } from "../stores";
import { TypeUser } from '../interfaces/enums/auth-user-role';

export function useNavs() {
    const user = useAuthStore(state => state.user);
    const AsideRef = useRef<HTMLElement>(null);

    useEffect(() => {
        AsideRef.current?.addEventListener('click', () => {
            AsideRef.current?.classList.remove('handle-show');
        })
    }, [AsideRef.current]);

    const Navs: Array<{
        path: string;
        title: string;
        icon: JSX.Element;
        validate: boolean;
    }> = [
            { validate: true, icon: Home(), title: 'Home', path: '/home' },
            { validate: (user?.role === TypeUser.admin), icon: Users(), title: 'Users', path: '/users' },
            { validate: true, icon: Panel(), title: 'Installed systems', path: '/reports/install-system' },
            { validate: true, icon: Ticket(), title: 'Srs - Sta', path: '/reports/system-request' },
            { validate: true, icon: InOut(), title: 'Tess - Tesse', path: '/reports/technical-on-site' },
            { validate: true, icon: Clock1(), title: 'Attention', path: '/reports/attention' },
        ];

    return { AsideRef, Navs, user }

}