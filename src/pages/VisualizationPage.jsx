/* src/pages/VisualizationPage.jsx */
import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const PageContainer = styled.div`
  text-align: center;
  padding: 3rem;
`;

function VisualizationPage() {

    const { t } = useTranslation();
    return (
        <PageContainer>
        <PageHeader
            icon="📊"
            title={t('VisualizationPage.title')} 
            subtitle={t('VisualizationPage.subtitle')}
        />
        </PageContainer>
    );
}

export default VisualizationPage;