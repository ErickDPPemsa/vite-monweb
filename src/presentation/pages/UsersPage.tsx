import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { TypeUser, UsersRespose } from "../../interfaces";
import { useAuthStore } from "../../stores";
import { AddUser, CheveronLeft, Delete, Home, Search } from "../icons/icons";
import { UserService } from "../../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../components/Input";
import { Text } from "../components/Text";
import { Loader } from "../components/Loader";
import { useHandleError } from "../../hooks";
import { CreateUserModalContent, Portal } from "../components/modals";
import { toast } from "sonner";
import { SimpleSelect } from "../components/SimpleSelect";

interface PropsSelect<T> {
    label: string;
    value: T;
}
const Rows: Array<PropsSelect<number>> = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '100', value: 100 },
];

export const UsersPage = () => {
    const user = useAuthStore(state => state.user);
    const { showError } = useHandleError();
    const [filter, setFilter] = useState<Array<UsersRespose>>();
    const [limit, setLimit] = useState<PropsSelect<number>>(Rows[0]);
    const [offSet, setOffSet] = useState(0);

    const dialog = useRef<HTMLDialogElement>(null);
    const createUserRef = useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['users', limit.value, offSet],
        queryFn: () => UserService.users(limit.value, offSet),
        refetchOnWindowFocus: true,
    });

    const DeleteMutation = useMutation({
        mutationKey: ['DeleteUser'],
        mutationFn: UserService.delete,
    });

    const deleteUser = (id: string) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const oldData = queryClient.getQueryData<Array<UsersRespose>>(['users', limit, offSet]);
        queryClient.setQueryData(['users', limit, offSet], () => oldData?.filter(user => user.id !== id));
        DeleteMutation.mutate(id, {
            onSuccess: () => {
                toast.success('Usuario eliminado');
                queryClient.invalidateQueries({ queryKey: ['users', limit.value, offSet] });
            },
            onError: error => {
                showError({ responseError: error })
                queryClient.setQueryData(['users', limit.value, offSet], () => oldData);
            }
        });
    }

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (user?.role === TypeUser.user)
        ? <Navigate to="/home" />
        :
        <article className="container-user">
            <header>
                <h1>Users</h1>
                <button className="button-small" onClick={() => dialog.current?.show()} >
                    <AddUser />
                    Add user
                </button>
                <Portal className="blur-2" refElement={dialog} onClosed={(close) => close && createUserRef.current?.classList.toggle('scale-down-center')} >
                    <CreateUserModalContent dialog={dialog} reference={createUserRef} onSuccess={(exit) => { exit && refetch() }} />
                </Portal>
            </header>
            <section className="container-table">
                <div className="search">
                    <Input
                        leading={<Search />}
                        labelText="Search user"
                        name="filter"
                        onChange={({ target: { value } }) => {
                            if (value.length > 0)
                                setFilter(data?.filter(user => user.fullName.toLowerCase().includes(value)))
                            else {
                                setOffSet(0)
                                setFilter(undefined)
                            }
                        }}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
                <div className='data'>
                    {isLoading && <Loader text="Loading" />}
                    <table>
                        <tbody>
                            {
                                (filter ?? data)?.map(({ id, fullName, userName, role, isActive }) => (
                                    <tr key={id}>
                                        <td data-label='Full name'>{fullName}</td>
                                        <td data-label='User'>{userName}</td>
                                        <td data-label='Role'>{role}</td>
                                        <td data-label='Status'>{JSON.stringify(isActive)}</td>
                                        <td data-label='Actions'>
                                            {
                                                <span className="actions">
                                                    <button disabled={id === user?.id} className="btn-icon btn-icon-small"><Home /></button>
                                                    <button disabled={id === user?.id} className="btn-icon btn-icon-delete btn-icon-small" onClick={deleteUser(id)}><Delete /></button>
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <span>
                        <Text>Rows per page:</Text>
                        <SimpleSelect selected={limit.label} options={Rows} onSelect={setLimit} />
                        {/* <select disabled={(isFetching || isLoading) ? true : false} className="elevation-1 Title-medium" name="rows" onChange={({ target: { value } }) => setLimit(+value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select> */}
                    </span>
                    <Text>{`${offSet}–${offSet + limit.value} of 24`}</Text>
                    <span>
                        <button
                            disabled={(isFetching || isLoading) ? true : false}
                            className="btn-icon"
                            onClick={() => (offSet !== 0) && setOffSet((offSet - limit.value < 0) ? 0 : offSet - limit.value)}
                        >
                            <CheveronLeft />
                        </button>
                        <button
                            disabled={(isFetching || isLoading) ? true : false}
                            className="btn-icon rotate"
                            onClick={() => (data?.length === limit.value) && setOffSet(offSet + limit.value)}
                        >
                            <CheveronLeft classname="icon-button-rotate" />
                        </button>
                    </span>
                </div>
            </section>
        </article >
};
