import React, { useContext, useEffect } from 'react';
import { TextField, Grid, IconButton, Button } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import useWithdraw from '../../hooks/Withdraw';
import { SearchWithdrawContext } from '../../context/SearchWithdrawContext';
import { WithdrawFilterContainer } from './Withdrawfilter.styles';


const WithdrawSearchForm: React.FC = () => {

  const context = useContext(SearchWithdrawContext);

  if (!context) {
    throw new Error('SearchWithdrawContext must be used within a SearchTermProvider');
  }
  const { setOrder, setPeriod, setSwitchOrder, setSwitchStatus, setStatusBy } = context;

  const handleSortAscending = () => {
    setOrder(true);
    setSwitchOrder(true);
  };

  const handleSortDescending = () => {
    setOrder(false);
    setSwitchOrder(false);
  };

  const handleStatusApproved = () => {
    setStatusBy("approved");
    setSwitchStatus(true);
  };

  const handleStatusPending = () => {
    setStatusBy("pending");
    setSwitchStatus(false);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const [year, month, day] = selectedDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    if (formattedDate === "undefined-undefined-") {
      setPeriod("");
    } else{
      setPeriod(formattedDate);
    }

  };


  return (
    <WithdrawFilterContainer>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <IconButton size="small" onClick={handleSortAscending}>
            <NorthIcon />
          </IconButton>
          <IconButton size="small" onClick={handleSortDescending}>
            <SouthIcon />
          </IconButton>
          <Button
            onClick={() => handleStatusApproved()}
            style={{ marginLeft: '8px', padding: '6px 8px', minWidth: 'auto', color: 'green' }}
          >
            Approved
          </Button>
          <Button
            onClick={() => handleStatusPending()}
            style={{ marginLeft: '8px', padding: '6px 8px', minWidth: 'auto' }}
          >
            Pending
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Data"
            type="date"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>
    </WithdrawFilterContainer>
  );
};

export default WithdrawSearchForm;
