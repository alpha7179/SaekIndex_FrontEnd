/* src/components/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;

  transition: background 0.3s;

  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.01);
  }
`;

function NotFound() {
  const { t, i18n } = useTranslation(); 
  return (
    <Container>
      <Icon />
      <Title>{t('NotFound.title')}</Title>
      <Message>{t('NotFound.message')}</Message>
      <HomeLink to="/">{t('NotFound.button')}</HomeLink>
    </Container>
  );
}

export default NotFound;