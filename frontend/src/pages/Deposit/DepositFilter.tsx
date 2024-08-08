import React, { useContext, useEffect } from 'react';
import { TextField, Grid, IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { DepositFilterContainer } from './DepositFilter.styles';
import useDeposit from '../../hooks/Deposit';
import { SearchTermContext } from '../../context/SearchTermContext';

const DepositFilter: React.FC = () => {

  const context = useContext(SearchTermContext);

  if (!context) {
    throw new Error('SearchTermContext must be used within a SearchTermProvider');
  }
  const { setOrder, setPeriod, setSwitchOrder } = context;

  const handleSortAscending = () => {
    setOrder(true);
    setSwitchOrder(true);
  };

  const handleSortDescending = () => {
    setOrder(false);
    setSwitchOrder(false);
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
    <DepositFilterContainer>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <IconButton size="small" onClick={handleSortAscending}>
            <NorthIcon />
          </IconButton>
          <IconButton size="small" onClick={handleSortDescending}>
            <SouthIcon />
          </IconButton>
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
    </DepositFilterContainer>
  );
};

export default DepositFilter;
