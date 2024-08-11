import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';  

export const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      
      <ListItemButton onClick={() => navigate('/dashboard-client')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
      <ListItemText primary="Dashboard Client" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/withdraw')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Withdraw" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const navigate = useNavigate();
  
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Admin
      </ListSubheader>
      <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard Admin" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/deposit')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Deposit" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/status')}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Status" />
      </ListItemButton>
    </React.Fragment>
  );
};