// src/layouts/DepositLayout.tsx
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import DepositForm from '../../pages/Deposit/DepositForm'; 
import DepositSearchForm from '../../pages/Deposit/DepositSearchForm';
import DepositFilter from '../../pages/Deposit/DepositFilter';
import { User } from "../../hooks/Deposit";


interface DepositLayoutProps {
  children: React.ReactNode;
}

const DepositLayout: React.FC<DepositLayoutProps> = ({ children }) => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} overflow="auto" height="160vh" 
    sx={{
      scrollbarWidth: 'none',  // Esconde a barra de rolagem no Firefox
      '&::-webkit-scrollbar': {
        display: 'none',  // Esconde a barra de rolagem no Chrome, Safari e Edge
      },
    }}
    >
      <Box mb={2} width="100%">
        <DepositForm />
      </Box>
      <Box mb={2} width="100%">
        <DepositSearchForm />
      </Box>
      <Box mb={2} width="100%">
        <DepositFilter />
      </Box>
      <Box
        width="100%" 
      >
        {React.cloneElement(children as React.ReactElement<any>)}
      </Box>
    </Box>
  );
};

export default DepositLayout;
