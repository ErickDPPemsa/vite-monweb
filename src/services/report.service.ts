import { monwebApi } from "../api/monweb.api";
import { ResponseApplicationSystem, ResponseInstallerSystem } from "../interfaces";

export class ReportService {

    static installerSystems = async (): Promise<ResponseInstallerSystem> => {
        const { data } = await monwebApi.get<ResponseInstallerSystem>(`/report/sistemas-instalados`);
        return data;
    }

    static applicationSystem = async ({ start, end }: { start: string, end: string }): Promise<ResponseApplicationSystem> => {
        const { data } = await monwebApi.get<ResponseApplicationSystem>(`/report/solicitud-sistema`, { params: { start, end } });
        return data;
    }
}