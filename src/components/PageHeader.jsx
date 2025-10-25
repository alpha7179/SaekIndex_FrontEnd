/* src/components/PageHeader.jsx */
import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

function PageHeader({ icon, title, subtitle }) {
  return (
    <HeaderContainer>
      <Title>
        {icon && <span>{icon}</span>}
        {title}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeaderContainer>
  );
}

export default PageHeader;