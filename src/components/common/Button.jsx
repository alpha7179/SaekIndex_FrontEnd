// src/components/common/Button.jsx
import styled from '@emotion/styled';

const BaseButton = styled.button`
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &:hover:not(:disabled) {
    transform: scale(1.02);
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  padding: ${props => props.size === 'large' ? '1rem 2.5rem' : '0.5rem 1rem'};
  font-size: ${props => props.size === 'large' ? '1.2rem' : '0.85rem'};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  
  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
`;

export const DangerButton = styled(BaseButton)`
  background: white;
  color: #ff4757;
  border: 1px solid #ffb3ba;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  
  &:hover:not(:disabled) {
    background: #fff5f5;
    border-color: #ff4757;
  }
`;

export const StatusBadge = styled.span`
  background: ${props => props.isActive ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 32px;
`;