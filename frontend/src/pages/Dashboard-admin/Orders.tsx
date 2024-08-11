import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import useDeposit, { Deposit } from '../../hooks/Deposit';
import { Typography } from '@mui/material';

interface OrdersListProps {
  deposits: Deposit[];
  totalPages: number;
  loading: boolean;
}

export default function OrdersList({ deposits, totalPages, loading }: OrdersListProps) {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
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
            {deposits.map((deposit) => (
              <TableRow key={deposit.id}>
                <TableCell>{new Date(deposit.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{deposit.nameUser}</TableCell>
                <TableCell align="right">{deposit.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Link color="primary" href="#">
        See more orders ({totalPages} pages)
      </Link>
    </React.Fragment>
  );
}
