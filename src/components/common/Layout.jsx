// src/components/common/Layout.jsx
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '2fr 1fr'};
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.div`
  background: white;
  border-radius: 25px;
  padding: ${props => props.padding || '1rem 1.5rem'};
  box-shadow: ${props => props.shadow ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin: 3rem auto 0;
`;