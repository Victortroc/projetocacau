// src/pages/Deposit/DepositForm.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Button, Typography, CircularProgress, Autocomplete } from '@mui/material';
import styled from 'styled-components';
import { User } from "../../hooks/Deposit";
import { SearchTermContext } from '../../context/SearchTermContext';
import useDeposit from '../../hooks/Deposit';


const DepositFormContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DepositFormFields = styled.div`
  margin-bottom: 20px;
`;

const DepositForm: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { createDeposit, fetchUsers, users } = useDeposit();

  useEffect(() => {
    fetchUsers();
  }, []);

  const context = useContext(SearchTermContext);

  if (!context) {
    throw new Error('SearchTermContext must be used within a SearchTermProvider');
  }
  const { sucessCreate, setSucessCreate } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && amount) {
      setLoading(true);
      await createDeposit(selectedUser.id, amount);
      setAmount('');
      setSelectedUser(null);
      setLoading(false);
      setSucessCreate(true);
      if (sucessCreate){ 
        setSucessCreate(false);
      };
    }
  };

  return (
    <DepositFormContainer>
      <Typography variant="h6">Criar Depósito</Typography>
      <form onSubmit={handleSubmit}>
        <DepositFormFields>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.name}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => <TextField {...params} label="Usuário" variant="outlined" fullWidth />}
          />
        </DepositFormFields>
        <DepositFormFields>
          <TextField
            label="Valor"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </DepositFormFields>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Criar Depósito'}
        </Button>
      </form>
    </DepositFormContainer>
  );
};

export default DepositForm;
