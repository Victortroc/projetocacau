import React, { useState } from 'react';
import styled from 'styled-components';
import { Status } from '../../hooks/Status';

interface StatusCardProps {
  status: Status;
  onEdit: (id: number) => void;
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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25em;
  color: #333;
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

  .edit-button {
    background-color: #4CAF50;
    color: white;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }
`;

const Info = styled.div`
  margin-bottom: 8px;
`;

const InfoItem = styled.div`
  font-size: 0.875em;
  color: #555;
`;

const StatusName = styled.span<{ $status: string }>`
  color: ${props => (props.$status === 'pending' ? 'blue' : props.$status === 'approved' ? 'green' : 'black')};
`;

const StatusCard: React.FC<StatusCardProps> = ({ status, onEdit, onDelete }) => {
  const [isApproved, setIsApproved] = useState(false);
  const [statusUp, setStatusUp] = useState(status.status);

  const handleSave = () => {
    onEdit(status.id);
    setIsApproved(false);
  };

  return (
    <Card>
      <Header>
        <Title>Saque de {status.nameUser}</Title>
        <Actions>
          {status.status !== 'approved' && (
            <>
              {isApproved ? (
                <>
                  <button className="edit-button" onClick={handleSave}>Confirmar</button>
                  <button className="delete-button" onClick={() => setIsApproved(false)}>Cancelar</button>
                </>
              ) : (
                <button className="edit-button" onClick={() => setIsApproved(true)}>Aprovar</button>
              )}
            </>
          )}
          {!isApproved && (
            <button className="delete-button" onClick={() => onDelete(status.id)}>Excluir</button>
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



