import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { TypeUser, UsersRespose } from "../../interfaces";
import { useAuthStore } from "../../stores";
import { AddUser, CheveronLeft, Delete, Home, Search } from "../icons/icons";
import { UserService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import Input from "../components/Input";
import { Text } from "../components/Text";
import { Loader } from "../components/Loader";
import { useHandleError } from "../../hooks";
import { CreateUserModalContent, Portal } from "../components/modals";

export const UsersPage = () => {
    const user = useAuthStore(state => state.user);
    const { showError } = useHandleError();
    const [filter, setFilter] = useState<Array<UsersRespose>>();
    const [limit, setLimit] = useState(5);
    const [offSet, setOffSet] = useState(0);

    const dialog = useRef<HTMLDialogElement>(null);
    const createUserRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['users', limit, offSet],
        queryFn: () => UserService.users(limit, offSet),
        refetchOnWindowFocus: true,
    });

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
                    <CreateUserModalContent dialog={dialog} reference={createUserRef} />
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
                <table className="titles">
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
                    {isLoading && <Loader text="Loading... " />}
                    <table>
                        <tbody>
                            {
                                (filter ?? data)?.map((user) => (
                                    <tr key={user.id}>
                                        <td data-label='Full name'>{user.fullName}</td>
                                        <td data-label='User'>{user.userName}</td>
                                        <td data-label='Role'>{user.role}</td>
                                        <td data-label='Status'>{JSON.stringify(user.isActive)}</td>
                                        <td data-label='Actions'>
                                            <span className="actions">
                                                <span className="btn-icon btn-icon-small"><Home /></span>
                                                <span className="btn-icon btn-icon-delete btn-icon-small"><Delete /></span>
                                            </span>
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
                        <select disabled={(isFetching || isLoading) ? true : false} className="elevation-1 Title-medium" name="rows" onChange={({ target: { value } }) => setLimit(+value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </span>
                    <Text>{`${offSet}–${offSet + limit} of 24`}</Text>
                    <span>
                        <button
                            disabled={(isFetching || isLoading) ? true : false}
                            className="btn-icon"
                            onClick={() => (offSet !== 0) && setOffSet((offSet - limit < 0) ? 0 : offSet - limit)}
                        >
                            <CheveronLeft />
                        </button>
                        <button
                            disabled={(isFetching || isLoading) ? true : false}
                            className="btn-icon rotate"
                            onClick={() => (data?.length === limit) && setOffSet(offSet + limit)}
                        >
                            <CheveronLeft classname="icon-button-rotate" />
                        </button>
                    </span>
                </div>
            </section>
        </article >
};
