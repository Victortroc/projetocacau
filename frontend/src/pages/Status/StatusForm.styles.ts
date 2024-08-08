// src/components/StatusForm.styles.ts
import styled from 'styled-components';
import { Grid } from '@mui/material';

export const StatusFormContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const StatusFormFields = styled(Grid)`
  margin-top: 10px;

  & .MuiTextField-root {
    width: 100%;
  }

  & .MuiButton-root {
    width: 100%;
  }
`;