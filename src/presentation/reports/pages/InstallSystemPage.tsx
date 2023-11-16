import { useQuery } from "@tanstack/react-query";
import { useHandleError } from "../../../hooks";
import { ReportService } from "../../../services";
import { Loader } from "../../components/Loader";
import { DataTable } from "../../components/DataTable";
import { Key } from "../../interfaces/interfaces";
import { Account } from "../../../interfaces";
import { Spinner } from "../../icons/icons";

const Keys: Array<Key<Account>> = [
    { key: 'Nombre', title: 'Name', select: true, style: { fontWeight: '400' } },
    { key: 'CodigoAbonado', title: 'Subscriber', style: { textAlign: 'center' }, select: true },
    { key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' }, select: true },
    { key: 'panel', 'key2': 'Modelo', style: { textAlign: 'center' } }
];

export const InstallSystemPage = () => {
    const { showError } = useHandleError();

    const { isLoading, isFetching, error, data, refetch } = useQuery({
        queryKey: ['istalledSystem'],
        queryFn: ReportService.installerSystems
    });

    if (isLoading) return <Loader text="Loading ..." />

    if (!isFetching && !isLoading && error) showError({ responseError: error });

    return (
        <article className="container-is">
            <header>
                <h1>Installed systems</h1>
                <button className="button-small" onClick={() => refetch()}>
                    {(isFetching) ? <Spinner classname="icon-spin" /> : 'Refresh'}
                </button>
            </header>
            <section className="content-data">
                <DataTable
                    starFilter="Nombre"
                    indices
                    title="Installed systems"
                    data={data?.accounts.filter(account => account.panel.Modelo) ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
                <DataTable
                    starFilter="Nombre"
                    indices
                    title="No registered system"
                    data={data?.accounts.filter(account => !account.panel.Modelo) ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
            </section>
        </article >
    )
};