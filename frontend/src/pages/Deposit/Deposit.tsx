import React, { useState, useEffect, useContext } from 'react';
import useDeposit from '../../hooks/Deposit';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import DepositCard from './DepositCard';
import PageButton from './PageButton';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { SearchTermContext } from '../../context/SearchTermContext';

const Deposit: React.FC<void> = () => {
    const {
        deposits,
        loading,
        fetchDeposits,
        deleteDeposit,
        updateDeposit,
        totalPages
    } = useDeposit();

    const context = useContext(SearchTermContext);
    const [, setSearchParamsHook] = useSearchParams();

    if (!context) {
        throw new Error('SearchTermContext must be used within a SearchTermProvider');
    }
    const { searchTerm, sucessCreate, setSearchTerm, periodBy, orderBy, switchOrder } = context;

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [periodBy, sucessCreate, searchTerm]);

    useEffect(() => {
        const order = orderBy ? "asc" : "desc";
        fetchDeposits(currentPage, limit, searchTerm, order, periodBy);
    }, [switchOrder, currentPage, periodBy, searchTerm, sucessCreate]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchParamsHook({ page: page.toString(), filter: searchTerm });
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

    if (currentPage === 3) {
      pages.push(currentPage + 1);
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      if (currentPage === 4) {
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

  const handleUpdateDeposit = async (id: number, newAmount: string) => {
    await updateDeposit(id, newAmount);
    fetchDeposits(currentPage, limit, searchTerm);
  };

  const handleDeleteDeposit = async (id: number) => {
    await deleteDeposit(id);
    fetchDeposits(currentPage, limit, searchTerm);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Grid>
        {deposits.map((deposit) => (
          <Grid item xs={12} sm={6} md={4} key={deposit.id}>
            <DepositCard
              deposit={deposit}
              onEdit={handleUpdateDeposit}
              onDelete={handleDeleteDeposit}
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

export default Deposit;

