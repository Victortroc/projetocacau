// src/hooks/useWithdraw.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

export interface User {
  id: number;
  name: string;
}

export interface Withdraw {
  id: number;
  userId: number;
  nameUser: string;
  amount: number;
  createdAt: string;
  updatedAt: string | null;
  status: string;
}

const useWithdraw = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
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
  const fetchWithdraws = useCallback(async (page: number, limit: number, filter: string = "", order: string = "desc", period: string = "", statusBy: string = "") => {
    setLoading(true);
    try {
      const response = await api.get('/withdraw', {
        params: { page, limit, filter, order, period, statusBy }
      });

      console.log(response.data);

      const xTotalCount = response.headers['x-total-count'];

      if (response.data == false) {
        setTotalPages(0);
        setWithdraws(response.data);
      } else {
        setTotalPages(Math.ceil(Number(xTotalCount) / limit));
        setWithdraws(response.data);
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

  const searchWithdraws = (term: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(term);
    }, 300);
  };

  const createWithdraw = async (userId: number, amount: string) => {
    try {
      await api.post('/withdraw', { userId, amount });
      fetchWithdraws(1, limit, ''); // Atualiza após a criação
      toast.success("Saque criado com sucesso");
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao criar saque");
        }
    }
  };

  const deleteWithdraw = async (id: number) => {
    try {
      await api.delete(`/withdraw/${id}`);
    //   fetchWithdraws(currentPage, limit, searchTerm);
      toast.success("Saque excluído com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao excluir saque");
        }
      
    }
  };

  const updateWithdraw = async (id: number, amount: string) => {
    try {
      await api.put(`/withdraw/${id}`, { amount });
      toast.success("Saque atualizado com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao atualizar saque");
        }
      
      
    }
  };


  return {
    users,
    withdraws,
    loading,
    searchWithdraws,
    fetchWithdraws,
    createWithdraw,
    deleteWithdraw,
    updateWithdraw,
    setPage: setCurrentPage,
    totalPages,
    setSearchParams
  };
};

export default useWithdraw;

