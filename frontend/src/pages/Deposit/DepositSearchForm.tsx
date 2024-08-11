import React, { useContext, useEffect, useRef, useState } from 'react';
import { Autocomplete, TextField, Typography, Grid } from '@mui/material';
import { User } from '../../hooks/Deposit';
import { DepositFormContainer, DepositFormFields } from './DepositForm.styles';
import { SearchTermContext } from '../../context/SearchTermContext';
import { useSearchParams } from 'react-router-dom';


const DepositSearchForm: React.FC = () => {
  const context = useContext(SearchTermContext);

  if (!context) {
    throw new Error('SearchTermContext must be used within a SearchTermProvider');
  }

  const { setSearchTerm, setSearchParams, searchTermPage, users } = context;
  const [, setSearchParamsHook] = useSearchParams(); // Using the setter function from useSearchParams
  const autoCompleteRef = useRef<HTMLElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    // Clear search term and URL parameters on component mount
    setSearchTerm('');
    setSearchParamsHook({});
  }, []);


  return (
    <DepositFormContainer>
      <Typography variant="h6">Pesquisar Depósitos</Typography>
      <DepositFormFields container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={users}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.name || '';
            }}
            onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue || '');
                setInputValue(newInputValue || '');
                if (newInputValue) {
                    setSearchParamsHook({ page: searchTermPage.toString() || "1", filter: newInputValue });
                } else {
                    setSearchParamsHook({ page: "1", filter: "" });
                } 
            }}
            renderInput={(params) => (
              <TextField {...params} label="Nome do Usuário" variant="outlined" />
            )}
            value={inputValue}
            ref={autoCompleteRef}
          />
        </Grid>
      </DepositFormFields>
    </DepositFormContainer>
  );
};

export default DepositSearchForm;
