import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import DepositsList from './Deposits';
import OrdersList from './Orders';
import useDeposit from '../../hooks/Deposit';

const Dashboard: React.FC = () => {
  const { deposits, fetchDeposits, totalPages, loading } = useDeposit();

  useEffect(() => {
    fetchDeposits(1, 5, '');
  }, [fetchDeposits]);

  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart deposits={deposits} loading={loading} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <DepositsList deposits={deposits} loading={loading} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <OrdersList deposits={deposits} totalPages={totalPages} loading={loading} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
