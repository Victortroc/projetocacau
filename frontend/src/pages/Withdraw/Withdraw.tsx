// src/pages/Withdraw/Withdraw.tsx
import React, { useState, useEffect, useContext } from 'react';
import useWithdraw from '../../hooks/Withdraw';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import WithdrawCard from './WithdrawCard';
import PageButton from './PageButton';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { SearchWithdrawContext } from '../../context/SearchWithdrawContext';


const Withdraw: React.FC<void> = () => {
  const {
    withdraws,
    loading,
    fetchWithdraws,
    deleteWithdraw,
    totalPages,

  } = useWithdraw();

  const context = useContext(SearchWithdrawContext);
  const [, setSearchParamsHook] = useSearchParams();

  if (!context) {
    throw new Error('SearchWithdrawContext must be used within a SearchTermProvider');
  }
  const { searchTerm, orderBy, sucessCreate, setSearchTerm, switchOrder, switchStatus, statusBy, periodBy } = context;

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [periodBy, statusBy, sucessCreate, switchStatus]);

  useEffect(() => {
    const order = orderBy ? "asc" : "desc";
    fetchWithdraws(currentPage, limit, searchTerm, order, periodBy, statusBy);
  }, [statusBy, switchOrder, switchStatus, currentPage, periodBy, sucessCreate]);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParamsHook({ page: page.toString(), period: periodBy });
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    pages.push(1, 2, 3);

    if (currentPage > 4 && currentPage !== 5) {
      pages.push('...');
    }

    if (currentPage == 3) {
        pages.push(currentPage + 1);
      }

    if (currentPage > 3 && currentPage < totalPages - 2) {
        if (currentPage == 4){
            pages.push(currentPage, currentPage + 1);
        } else {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        }
      
    }

    if (currentPage >= totalPages - 2) {
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };  


  const handleDeleteWithdraw = async (id: number) => {
    await deleteWithdraw(id);
    fetchWithdraws(currentPage, limit, searchTerm);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      
        <Grid>
            {withdraws.map((withdraw) => (
            <Grid item xs={12} sm={6} md={4} key={withdraw.id}>
                <WithdrawCard
                withdraw={withdraw}
                onDelete={handleDeleteWithdraw}
            />
          </Grid>

        ))}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <Typography key={index} variant="body2" style={{ margin: '0 10px' }}>
              ...
            </Typography>
          ) : (
            <PageButton
              key={index}
              page={page as number}
              isActive={currentPage === page}
              onClick={() => handlePageChange(page as number)}
            />
          )
        )}
      </Box>
    </div>
  );
};

export default Withdraw;
