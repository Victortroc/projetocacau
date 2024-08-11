import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import useDeposit, { Deposit } from '../../hooks/Deposit';

interface DepositsListProps {
  deposits: Deposit[];
  loading: boolean;
}

export default function DepositsList({ deposits, loading }: DepositsListProps) {
  const recentDeposit = deposits[0];

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : recentDeposit ? (
        <>
          <Typography component="p" variant="h4">
            ${recentDeposit.amount}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on {new Date(recentDeposit.createdAt).toLocaleDateString().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}
          </Typography>
        </>
      ) : (
        <Typography>No deposits available</Typography>
      )}
    </React.Fragment>
  );
}
