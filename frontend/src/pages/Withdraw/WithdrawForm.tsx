// src/pages/Withdraw/WithdrawForm.tsx
import React, { useState, useContext } from 'react';
import { Grid, TextField, Button, Typography, CircularProgress, Autocomplete } from '@mui/material';
import styled from 'styled-components';
import { User } from "../../hooks/Withdraw";
import { SearchWithdrawContext } from '../../context/SearchWithdrawContext';
import useWithdraw from '../../hooks/Withdraw';
import { AuthContext } from '../../context/Auth/AuthContext';



const WithdrawFormContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const WithdrawFormFields = styled.div`
  margin-bottom: 20px;
`;

const WithdrawForm: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { createWithdraw } = useWithdraw();

  const context = useContext(SearchWithdrawContext);
  const contextAuth = useContext(AuthContext);

  if (!context) {
    throw new Error('SearchWithdrawContext must be used within a SearchTermProvider');
  }

  if (!contextAuth) {
    throw new Error('AuthContext must be used within a AuthProvider');
  }
  const { sucessCreate, setSucessCreate } = context;
  const { user } = contextAuth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      setLoading(true);
      await createWithdraw(user.id, amount);
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
    <WithdrawFormContainer>
      <Typography variant="h6">Criar Saque</Typography>
      <form onSubmit={handleSubmit}>
        <WithdrawFormFields>
          <TextField
            label="Valor"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </WithdrawFormFields>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Criar Saque'}
        </Button>
      </form>
    </WithdrawFormContainer>
  );
};

export default WithdrawForm;
