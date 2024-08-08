// src/pages/Status/Status.tsx
import React, { useState, useEffect, useContext } from 'react';
import useStatus from '../../hooks/Status';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import StatusCard from './StatusCard';
import PageButton from './PageButton';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { SearchTermStatusContext } from '../../context/SearchTermStatusContext';


const Status: React.FC<void> = () => {
  const {
    statuss,
    loading,
    fetchStatuss,
    deleteStatus,
    updateStatus,
    totalPages
  } = useStatus();

  const context = useContext(SearchTermStatusContext);
  const [, setSearchParamsHook] = useSearchParams();

  if (!context) {
    throw new Error('SearchTermStatusContext must be used within a SearchTermProvider');
  }
  const { searchTerm, sucessCreate, setSearchTerm, periodBy, orderBy, switchOrder, switchStatus, statusBy } = context;

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [periodBy, searchTerm]);


  useEffect(() => {
    const order = orderBy ? "asc" : "desc";
    fetchStatuss(currentPage, limit, searchTerm, order, periodBy, statusBy);
  }, [searchTerm, statusBy, switchOrder, switchStatus, currentPage, periodBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParamsHook({ page: page.toString(), filter: searchTerm });
    if (orderBy) {
        fetchStatuss(page, limit, searchTerm, "asc", periodBy, statusBy);
      } else {
        fetchStatuss(page, limit, searchTerm, "desc", periodBy, statusBy);
      }
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


  const handleUpdateStatus = async (id: number) => {
    await updateStatus(id, "approved");
    fetchStatuss(currentPage, limit, searchTerm);
  };

  const handleDeleteStatus = async (id: number) => {
    await deleteStatus(id);
    fetchStatuss(currentPage, limit, searchTerm);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      
        <Grid>
            {statuss.map((status) => (
            <Grid item xs={12} sm={6} md={4} key={status.id}>
                <StatusCard
                status={status}
                onEdit={handleUpdateStatus}
                onDelete={handleDeleteStatus}
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

export default Status;
