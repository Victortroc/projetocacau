// src/hooks/useDeposit.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import useAuth from "./useAuth";

export interface User {
  id: number;
  name: string;
}

export interface Deposit {
  id: number;
  userId: number;
  nameUser: string;
  amount: number;
  createdAt: string;
  updatedAt: string | null;
}

const useDeposit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [, setSearchParamsHook] = useSearchParams();
  const { setAmountCurrent } = useAuth();

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

  // Função para buscar depósitos
  const fetchDeposits = useCallback(async (page: number, limit: number, filter: string, order: string = "desc", period: string = "") => {
    setLoading(true);
    try {
      const response = await api.get('/deposit', {
        params: { page, limit, filter, order, period }
      });

      const xTotalCount = response.headers['x-total-count'];

      if (response.data == false) {
        setTotalPages(0);
        setDeposits(response.data);
      } else {
        setTotalPages(Math.ceil(Number(xTotalCount) / limit));
        setDeposits(response.data);
      }
      
    } catch (error: any) {
        
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao obter depósitos");
        }
  
    } finally {
      setLoading(false);
    }
  }, []);

  const searchDeposits = (term: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(term);
    }, 300);
  };

  const createDeposit = async (userId: number, amount: string) => {
    try {
      await api.post('/deposit', { userId, amount });
      toast.success("Depósito criado com sucesso");
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao criar depósito");
        }
    }
  };

  const deleteDeposit = async (id: number) => {
    try {
      await api.delete(`/deposit/${id}`);
      toast.success("Depósito excluído com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao excluir depósito");
        }
      
    }
  };

  const updateDeposit = async (id: number, amount: string) => {
    try {
      await api.put(`/deposit/${id}`, { amount });
      toast.success("Depósito atualizado com sucesso");
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error.default);
        } else {
            toast.error("Erro ao atualizar depósito");
        }
      
      
    }
  };

  return {
    users,
    deposits,
    loading,
    searchDeposits,
    fetchDeposits,
    createDeposit,
    deleteDeposit,
    updateDeposit,
    setPage: setCurrentPage,
    totalPages,
    setSearchParams,
    fetchUsers
  };
};

export default useDeposit;

