// src/layouts/WithdrawLayout.tsx
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import WithdrawForm from '../../pages/Withdraw/WithdrawForm'; 
import WithdrawSearchForm from '../../pages/Withdraw/WithdrawSearchForm';
import { User } from "../../hooks/Withdraw";


interface WithdrawLayoutProps {
  children: React.ReactNode;
}

const WithdrawLayout: React.FC<WithdrawLayoutProps> = ({ children }) => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} overflow="hidden" height="160vh"  >
      <Box mb={2} width="100%">
        <WithdrawForm />
      </Box>
      <Box mb={2} width="100%">
        <WithdrawSearchForm />
      </Box>
      <Box
        width="100%" 
      >
        {React.cloneElement(children as React.ReactElement<any>)}
      </Box>
    </Box>
  );
};

export default WithdrawLayout;
