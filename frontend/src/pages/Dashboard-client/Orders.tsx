import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Title from './Title';
import useWithdraw, { Withdraw } from '../../hooks/Withdraw';

interface OrdersListProps {
  withdraws: Withdraw[];
  totalPages: number;
  loading: boolean;
}

export default function OrdersList({ withdraws, totalPages, loading }: OrdersListProps) {
  return (
    <React.Fragment>
      <Title>Recent Withdrawals</Title>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdraws.map((withdraw) => (
              <TableRow key={withdraw.id}>
                <TableCell>{new Date(withdraw.createdAt).toLocaleDateString().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}</TableCell>
                <TableCell>{withdraw.nameUser}</TableCell>
                <TableCell align="right">{withdraw.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Link color="primary" href="#">
        See more withdrawals ({totalPages} pages)
      </Link>
    </React.Fragment>
  );
}
