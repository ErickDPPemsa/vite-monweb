import { TypeUser } from ".";

export interface LoginResponse {
    id: string;
    fullName: string;
    userName: string;
    role: TypeUser;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    token: string;
}

export interface UsersRespose {
    id: string;
    fullName: string;
    userName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface ErrorResponse {
    message: Array<string> | string;
    error: string;
    statusCode: number;
}

export interface propsUserCreate {
    fullName: string;
    userName: string;
    password: string;
    isActive?: boolean;
    role?: string;
}

export interface ResponseInstallerSystem {
    accounts: Account[];
}

export interface Account {
    CodigoCte: string;
    CodigoAbonado: string;
    Nombre: string;
    Direccion: string;
    Status: Status;
    panel: Panel;
}

export enum Status {
    A = "A",
    I = "I",
}

export interface Panel {
    Modelo?: string;
    AccesoPorGPRS?: boolean;
    AccesoPorIP?: boolean;
    AccesoPorLinea?: boolean;
    SinEnlace?: boolean;
    CoordGPS: string;
}

export interface ResponseApplicationSystem {
    data: Event<AlarmApplicationSystem>[];
}

export interface Event<T> {
    CodigoCte: string;
    FechaOriginal: string;
    Hora: string;
    CodigoEvento: string;
    CodigoAlarma: T;
    DescripcionAlarm: string;
    CodigoZona: string;
    DescripcionZona: string;
    CodigoUsuario: string;
    NombreUsuario: string;
    DescripcionEvent: string;
    Particion: number;
    ClaveMonitorista: string;
    NomCalifEvento: string;
    FechaPrimeraToma: string;
    HoraPrimeraToma: string;
    FechaFinalizo: string;
    HoraFinalizo: string;
}

export enum AlarmApplicationSystem {
    Srs = "SRS",
    Sta = "STA",
}
