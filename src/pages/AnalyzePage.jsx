/* src/pages/AnalyzePage.jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import SurveyForm from '../components/SurveyForm';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StartContainer = styled.div`
  text-align: center;
  padding: 0.5rem 1rem;
`;

function AnalyzePage() {
  const { t } = useTranslation();

  const [isSurveyStarted, setIsSurveyStarted] = useState(false);

  const handleStartSurvey = () => {
    setIsSurveyStarted(true);
  };

  return (
    <PageContainer>
      <PageHeader
        icon="📋"
        title={t('AnalyzePage.title')} 
        subtitle={t('AnalyzePage.subtitle')}
        />
      {isSurveyStarted ? (
        <SurveyForm />
      ) : (
        <StartContainer>
          <StartButton onClick={handleStartSurvey}>
            {t('AnalyzePage.survaystart')}
          </StartButton>
        </StartContainer>
      )}
    </PageContainer>
  );
}

export default AnalyzePage;