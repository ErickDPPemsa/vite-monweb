import { useCallback, useState } from 'react';
import Input from './Input';
import { Search } from '../icons/icons';
import { Key } from '../interfaces/interfaces';

interface PropsTable<T> {
    nameTable: string;
    data: Array<T>;
    keyId: keyof T;
    keys: Array<Key<T>>;
}

interface ButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element
}

export const Table = <T extends Object>({ data, keys, nameTable, keyId }: PropsTable<T>) => {
    const [isSearch, setIsSearch] = useState(false);
    const [filter, setFilter] = useState<Array<T>>();

    const BtnAction = useCallback(
        ({ icon, ...props }: ButtonIconProps) => {
            return (
                <button {...props}>
                    {icon}
                </button>
            )
        },
        [],
    );

    return (
        <section>
            <header>
                <div>
                    {
                        isSearch ? <p>{nameTable}</p> : <Input />
                    }
                </div>
                <div>
                    <BtnAction onClick={() => setIsSearch(true)} icon={<Search />} />
                </div>
            </header>
            <section>
                <table>
                    <thead>
                        <tr>
                            {keys.map(({ key }) => <th>{Array.isArray(key) ? 'array' : String(key)}</th>)}
                        </tr>
                    </thead>
                </table>
                <table>
                    {
                        (filter ?? data).map((element, idx) =>
                            <tr key={`${idx} ${element[keyId]}`}>
                                {
                                    keys.map(({ key }, id) =>
                                        <td key={`${idx} ${element[keyId]}-${id}`}>
                                            {Array.isArray(key) ? 'array...' : String(element[key])}
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    }
                </table>
            </section>
            <footer>

            </footer>
        </section >
    )
}
