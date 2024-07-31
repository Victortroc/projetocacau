export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    address?: string | null;
    phone?: number | string | null;
    cpf?: number | null;
    birthday?: string | null | Date;
    balance?: number | null;
    createdAt?: string | null | Date;
    updatedAt?: string | null | Date;
};

export interface IDeposit {
    id: number;
    userId: number;
    nameUser: string;
    amount: number;
    createdAt?: string | null | Date;
    updatedAt?: string | null | Date;
};

export interface IWithdraw {
    id: number;
    userId: number;
    nameUser: string;
    amount: number;
    createdAt?: string | null | Date;
    updatedAt?: string | null | Date;
    status: string;
};