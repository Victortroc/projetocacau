// src/layouts/StatusLayout.tsx
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import StatusSearchForm from '../../pages/Status/StatusSearchForm';
import StatusFilter from '../../pages/Status/StatusFilter';
import { User } from "../../hooks/Status";


interface StatusLayoutProps {
  children: React.ReactNode;
}

const StatusLayout: React.FC<StatusLayoutProps> = ({ children }) => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} overflow="hidden" height="160vh"  >
      <Box mb={2} width="100%">
        <StatusSearchForm />
      </Box>
      <Box mb={2} width="100%">
        <StatusFilter />
      </Box>
      <Box
        width="100%" 
      >
        {React.cloneElement(children as React.ReactElement<any>)}
      </Box>
    </Box>
  );
};

export default StatusLayout;
