// src/components/common/Table.jsx
import styled from '@emotion/styled';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  
  th, td {
    border-bottom: 1px solid #eee;
    padding: 0.75rem;
    text-align: center;
    vertical-align: middle;
  }
  
  th {
    background: #fafafa;
    font-weight: 600;
  }
  
  tr:hover {
    background: #fafafa;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => (props.isActive ? 'transparent' : '#ddd')};
  background: ${props => (props.isActive ? 'linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%)' : 'white')};
  color: ${props => (props.isActive ? 'white' : '#333')};
  border-radius: 50%;
  cursor: pointer;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: ${props => (props.isActive ? 'linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%)' : '#f5f5f5')};
    transform: ${props => (props.isActive ? 'scale(1.05)' : 'scale(1.02)')};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;