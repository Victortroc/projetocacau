// src/hooks/useStatus.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

export interface User {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  userId: number;
  nameUser: string;
  amount: number;
  createdAt: string;
  updatedAt: string | null;
  status: string;
}

const useStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [statuss, setStatuss] = useState<Status[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [, setSearchParamsHook] = useSearchParams();


  // Função para buscar usuários
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/user');
      setUsers(response.data);
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao listar usuários");
        }
      
    }
  }, []);

  // Função para buscar saques
  const fetchStatuss = useCallback(async (page: number, limit: number, filter: string = "", order: string = "desc", period: string = "", statusBy: string = "") => {
    setLoading(true);
    try {
      const response = await api.get('/withdraw', {
        params: { page, limit, filter, order, period, statusBy }
      });

      console.log(response.data);

      const xTotalCount = response.headers['x-total-count'];

      if (response.data == false) {
        setTotalPages(0);
        setStatuss(response.data);
      } else {
        setTotalPages(Math.ceil(Number(xTotalCount) / limit));
        setStatuss(response.data);
      }
 
    } catch (error: any) {
        
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao obter saques");
        }
  
    } finally {
      setLoading(false);
    }
  }, []);

  const searchStatuss = (term: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(term);
    }, 300);
  };

  const createStatus = async (userId: number, amount: string) => {
    try {
      await api.post('/withdraw', { userId, amount });
      fetchStatuss(1, limit, ''); // Atualiza após a criação
      toast.success("Depósito criado com sucesso");
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao criar saque");
        }
    }
  };

  const deleteStatus = async (id: number) => {
    try {
      await api.delete(`/withdraw/${id}`);
    //   fetchStatuss(currentPage, limit, searchTerm);
      toast.success("Saque negado com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao negar saque");
        }
      
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/withdraw/${id}`, { status });
      toast.success("Status atualizado com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao atualizar status");
        }
      
      
    }
  };

  return {
    users,
    statuss,
    loading,
    searchStatuss,
    fetchStatuss,
    createStatus,
    deleteStatus,
    updateStatus,
    setPage: setCurrentPage,
    totalPages,
    setSearchParams,
    fetchUsers
  };
};

export default useStatus;

