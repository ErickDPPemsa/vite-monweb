import { useQuery } from "@tanstack/react-query";
import { useHandleError } from "../../../hooks";
import { ReportService } from "../../../services";
import { Loader } from "../../components/Loader";
import { DataTable } from "../../components/DataTable";
import { Key } from "../../interfaces/interfaces";
import { Account } from "../../../interfaces";
import { Spinner } from "../../icons/icons";

const Keys: Array<Key<Account>> = [
    { wildcard: '--', key: 'Nombre', title: 'Name', style: { fontWeight: '400' } },
    { wildcard: '--', key: 'CodigoAbonado', title: 'Subscriber', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'panel', 'key2': 'Modelo', style: { textAlign: 'center' } }
];

export const InstallSystemPage = () => {
    const { showError } = useHandleError();

    const { isLoading, isFetching, error, data, refetch } = useQuery({
        queryKey: ['istalledSystem'],
        queryFn: ReportService.installerSystems
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error });

    return (
        <article className="container-is">
            <header>
                <h1>Installed systems</h1>
                <button className="button-small" onClick={() => refetch()}>
                    {(isFetching) ? <Spinner classname="icon-spin" /> : 'Refresh'}
                </button>
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="content-data">
                        <DataTable
                            indices
                            title="Installed systems"
                            data={data?.accounts.filter(account => account.panel.Modelo) ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                        <DataTable
                            indices
                            title="No registered system"
                            data={data?.accounts.filter(account => !account.panel.Modelo) ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                    </section>
            }
        </article >
    )
};