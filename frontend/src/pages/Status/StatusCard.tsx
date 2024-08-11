import React, { useState } from 'react';
import styled from 'styled-components';
import { Status } from '../../hooks/Status';

interface StatusCardProps {
  status: Status;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRevert: (id: number, amount: number) => void;
}

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 100%;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25em;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.15em;
    margin-bottom: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875em;

    @media (max-width: 600px) {
      padding: 8px 12px;
      font-size: 0.85em;
      width: 100%;
    }
  }

  .edit-button {
    background-color: #4CAF50;
    color: white;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  .revert-button {
    background-color: #ff9800;
    color: white;
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
    font-size: 0.85em;
    min-width: 75px;
  }

  strong {
    display: inline-block;
    min-width: 10px;
  }
`;

const StatusName = styled.span<{ $status: string }>`
  color: ${props => (props.$status === 'pending' ? 'blue' : props.$status === 'approved' ? 'green' : 'black')};
`;

const StatusCard: React.FC<StatusCardProps> = ({ status, onEdit, onDelete, onRevert }) => {
  const [isApproved, setIsApproved] = useState(false);

  const handleSave = () => {
    onEdit(status.id);
    setIsApproved(false);
  };

  const handleApproveClick = () => {
    setIsApproved(true);
  };

  const handleCancelClick = () => {
    setIsApproved(false);
  };

  return (
    <Card>
      <Header>
        <Title>Saque de {status.nameUser}</Title>
        <Actions>
          {status.status === 'pending' ? (
            isApproved ? (
              <>
                <button className="edit-button" onClick={handleSave}>Confirmar</button>
                <button className="delete-button" onClick={handleCancelClick}>Cancelar</button>
              </>
            ) : (
              <>
                <button className="edit-button" onClick={handleApproveClick}>Aprovar</button>
                <button className="delete-button" onClick={() => onDelete(status.id)}>Excluir</button>
              </>
            )
          ) : (
            <button className="revert-button" onClick={() => onRevert(status.id, status.amount)}>Reverter</button>
          )}
        </Actions>
      </Header>
      <Info>
        <InfoItem><strong>Valor:</strong> {status.amount.toFixed(2)}</InfoItem>
        <InfoItem><strong>Criado em:</strong> {new Date(status.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}</InfoItem>
        <InfoItem><strong>Atualizado em:</strong> {status.updatedAt ? new Date(status.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3') : 'Nunca'}</InfoItem>
        <InfoItem>
          <strong>Status:</strong> <StatusName $status={status.status}>{status.status}</StatusName>
        </InfoItem>
      </Info>
    </Card>
  );
};

export default StatusCard;
