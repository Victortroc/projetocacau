import React, { useState } from 'react';
import styled from 'styled-components';
import { Deposit } from '../../hooks/Deposit';

interface DepositCardProps {
  deposit: Deposit;
  onEdit: (id: number, newAmount: string) => void;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;

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

const DepositCard: React.FC<DepositCardProps> = ({ deposit, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(deposit.amount.toFixed(2));

  const handleSave = () => {
    onEdit(deposit.id, amount);
    setIsEditing(false);
  };

  return (
    <Card>
      <Header>
        <Title>Depósito de {deposit.nameUser}</Title>
        <Actions>
          {isEditing ? (
            <>
              <button className="edit-button" onClick={handleSave}>Salvar</button>
              <button className="delete-button" onClick={() => setIsEditing(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Editar</button>
              <button className="delete-button" onClick={() => onDelete(deposit.id)}>Excluir</button>
            </>
          )}
        </Actions>
      </Header>
      <Info>
        {isEditing ? (
          <InfoItem>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%' }}
            />
          </InfoItem>
        ) : (
          <>
            <InfoItem><strong>Valor:</strong> {deposit.amount.toFixed(2)}</InfoItem>
          </>
        )}
        <InfoItem><strong>Criado em:</strong> {new Date(deposit.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')}</InfoItem>
        <InfoItem><strong>Atualizado em:</strong> {deposit.updatedAt ? new Date(deposit.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3') : 'Nunca'}</InfoItem>
      </Info>
    </Card>
  );
};

export default DepositCard;
