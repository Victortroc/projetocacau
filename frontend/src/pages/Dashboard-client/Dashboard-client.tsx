import React, { useEffect } from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Withdraws from './Withdraws';
import useWithdraw from '../../hooks/Withdraw';
import OrdersList from './Orders';

const DashboardClient: React.FC = () => {
  const { withdraws, fetchWithdraws, loading, totalPages, currentPage } = useWithdraw();

  useEffect(() => {
    fetchWithdraws(currentPage, 5); // Busca inicial de saques
  }, [fetchWithdraws, currentPage]);

  return (
    <>
      <Grid container spacing={3}>
        {/* Gráfico de Saques */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart data={withdraws} />
          </Paper>
        </Grid>
        {/* Saques Recentes */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Withdraws withdraws={withdraws} loading={loading} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <OrdersList withdraws={withdraws} totalPages={totalPages} loading={loading} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardClient;
