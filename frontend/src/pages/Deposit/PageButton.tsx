import React from 'react';
import { Button } from '@mui/material';

interface PageButtonProps {
  page: number;
  onClick: (page: number) => void;
  isActive: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({ page, onClick, isActive }) => {
  return (
    <Button
      variant={isActive ? 'contained' : 'outlined'}
      sx={{
        backgroundColor: isActive ? 'green' : '#007aff',
        color: 'white',
        margin: '2px',
        border: 'none',
        '&:hover': {
          backgroundColor: isActive ? 'darkgreen' : '#0350a3',
          border: 'none'
        }
      }}
      onClick={() => onClick(page)}
    >
      {page}
    </Button>
  );
};

export default PageButton;
