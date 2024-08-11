import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import useWithdraw, { Withdraw } from '../../hooks/Withdraw';

interface WithdrawsProps {
  withdraws: Withdraw[];
  loading: boolean;
}

const Withdraws: React.FC<WithdrawsProps> = ({ withdraws, loading }) => {
  return (
    <React.Fragment>
      <Title>Recent Withdraws</Title>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {withdraws.length > 0 ? (
            <>
              <Typography component="p" variant="h4">
                {withdraws[0].amount}$
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date(withdraws[0].createdAt).toLocaleDateString().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}
              </Typography>
              <div>
                <Link color="primary" href="#">
                  View balance
                </Link>
              </div>
            </>
          ) : (
            <Typography>No recent withdraws.</Typography>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Withdraws;
