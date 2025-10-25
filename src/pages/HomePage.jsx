/* src/pages/HomePage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaPoll, FaChartBar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import GradientIcon from '../components/GradientIcon';
import PageHeader from '../components/PageHeader';

const PageContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin: 3rem auto 0;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

function HomePage() {
    const { t } = useTranslation();

    return (
        <PageContainer>
        {}
        <PageHeader 
            icon="😂"
            title={t('home.title')} 
            subtitle={t('home.subtitle')}
        />
        
        <CardGrid>
            <Card to="/analyze">
            <div className="icon-container"><GradientIcon icon={FaPoll} id="poll-gradient" /></div>
            <h3>{t('home.card_analyze_title')}</h3>
            <p>{t('home.card_analyze_desc')}</p>
            </Card>
            <Card to="/visualization">
            <div className="icon-container"><GradientIcon icon={FaChartBar} id="chart-gradient" /></div>
            <h3>{t('home.card_viz_title')}</h3>
            <p>{t('home.card_viz_desc')}</p>
            </Card>
        </CardGrid>
        </PageContainer>
    );
}

export default HomePage;