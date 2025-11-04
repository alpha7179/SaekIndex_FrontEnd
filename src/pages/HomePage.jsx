/* src/pages/HomePage.jsx */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaPoll, FaChartBar } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import GradientIcon from '../components/GradientIcon';
import PageHeader from '../components/PageHeader';
import { PageContainer, CardGrid } from '../components/common/Layout';



const Card = styled(Link)`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 25px;
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
    const { t } = useLanguage();

    return (
        <PageContainer>
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