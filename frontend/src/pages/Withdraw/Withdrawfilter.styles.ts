import styled from 'styled-components';

export const WithdrawFilterContainer = styled.div`
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  height: 50px;

  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 12px;
    align-items: stretch;
  }
`;
