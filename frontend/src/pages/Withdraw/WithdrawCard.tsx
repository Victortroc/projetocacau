import React from 'react';
import styled from 'styled-components';
import { Withdraw } from '../../hooks/Withdraw';

interface WithdrawCardProps {
  withdraw: Withdraw;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25em;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.1em;
    margin-bottom: 8px;
  }
`;

const Actions = styled.div`
  button {
    margin-left: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875em;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      width: 100%;
      padding: 8px 0;
      margin-left: 0;
    }
  }
`;

const Info = styled.div`
  margin-bottom: 8px;

  @media (max-width: 600px) {
    margin-bottom: 12px;
  }
`;

const InfoItem = styled.div`
  font-size: 0.875em;
  color: #555;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const Status = styled.span<{ $status: string }>`
  color: ${props => (props.$status === 'pending' ? 'blue' : props.$status === 'approved' ? 'green' : 'black')};
`;

const WithdrawCard: React.FC<WithdrawCardProps> = ({ withdraw, onDelete }) => {
  return (
    <Card>
      <Header>
        <Title>Saque de {withdraw.nameUser}</Title>
        <Actions>
          {withdraw.status !== 'approved' && (
            <button className="delete-button" onClick={() => onDelete(withdraw.id)}>
              Cancelar
            </button>
          )}
        </Actions>
      </Header>
      <Info>
        <InfoItem><strong>Valor:</strong> {withdraw.amount.toFixed(2)}</InfoItem>
        <InfoItem><strong>Criado em:</strong> {new Date(withdraw.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}</InfoItem>
        <InfoItem><strong>Aprovado em:</strong> {withdraw.updatedAt ? new Date(withdraw.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3') : 'Em andamento'}</InfoItem>
        <InfoItem>
          <strong>Status:</strong> <Status $status={withdraw.status}>{withdraw.status}</Status>
        </InfoItem>
      </Info>
    </Card>
  );
};

export default WithdrawCard;
