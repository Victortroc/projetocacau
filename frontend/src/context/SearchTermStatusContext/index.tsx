// src/context/SearchTermStatusContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


interface User {
    id: number;
    name: string;
}

interface SearchTermStatusContextProps {
    users: User[];
    searchTerm: string;
    searchTermPage: string;
    searchParams: URLSearchParams;
    sucessCreate: boolean;
    orderBy: boolean;
    periodBy: string;
    switchOrder: boolean;
    switchStatus: boolean;
    statusBy: string;
    setSearchTerm: (term: string) => void;
    setSearchParams: (term: any) => void;
    setSearchTermPage: (term: any) => void;
    setSucessCreate: (term: any) => void;
    setOrder: (term: any) => void;
    setPeriod: (term: any) => void;
    setSwitchOrder: (term: any) => void;
    setSwitchStatus: (term: any) => void;
    setStatusBy: (term: any) => void;
}

export const SearchTermStatusContext = createContext<SearchTermStatusContextProps | undefined>(undefined);

export const SearchTermStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermPage, setSearchTermPage] = useState('');
    const [sucessCreate, setSucessCreate] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [orderBy, setOrder] = useState(false);
    const [statusBy, setStatusBy] = useState('');
    const [periodBy, setPeriod] = useState('');
    const [switchOrder, setSwitchOrder] = useState(false);
    const [switchStatus, setSwitchStatus] = useState(false);

    return (
    <SearchTermStatusContext.Provider value={{ searchTerm, setSearchTerm, searchParams, setSearchParams, searchTermPage, setSearchTermPage, setSucessCreate, sucessCreate, users, orderBy, setOrder, setPeriod, periodBy, switchOrder, setSwitchOrder, switchStatus, setSwitchStatus, statusBy, setStatusBy}}>
        {children}
    </SearchTermStatusContext.Provider>
    );
};
