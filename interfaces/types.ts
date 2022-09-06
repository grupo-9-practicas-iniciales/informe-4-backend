

export interface ApiAuthResponse {
    user: UserType
    ok: boolean;
    errorMsg: string | null;
}

export interface ApiAuthRequest {
    email: string;
    password: string;
}

export interface UserType {
    names: string;
    lastnames: string;
    email: string;
    idStudent: string;
    idUser: Number;
    password: string;
    recoveryToken: string;
}

