// src/components/SurveyResponseDisplay.jsx
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';
import { toast } from 'react-toastify';
import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

const Container = styled.div`
  background: white;
  border-radius: 25px;
  padding: 1.5rem 2rem;
`;

const Title = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.2rem;
`;

const ResponseSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-radius: 25px;
`;

const QuestionTitle = styled.div`
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const AnswerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const AnswerText = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #dc3545;
`;

const ScoreDisplay = styled.div`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const BasicInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const StatusBadge = styled.span`
  background: ${props => props.isViewed ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  min-width: 100px;
  height: 36px;
`;

const ToggleButton = styled.button`
  background: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  height: 36px;
  
  &:hover {
    background: #5a6268;
    transform: scale(1.02);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ViewedStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyResponseDisplay({ selectedSurvey }) {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  
  // 로컬 상태로 현재 isViewed 값 추적 (연속 클릭 문제 해결)
  const [localIsViewed, setLocalIsViewed] = useState(selectedSurvey?.isViewed || false);
  
  // selectedSurvey가 변경될 때마다 로컬 상태 동기화
  useEffect(() => {
    if (selectedSurvey) {
      setLocalIsViewed(selectedSurvey.isViewed);
    }
  }, [selectedSurvey?.isViewed, selectedSurvey?._id]);

  const toggleViewedMutation = useMutation({
    mutationFn: ({ id, currentIsViewed }) => surveyAPI.toggleIsViewed(id, currentIsViewed),
    onMutate: async ({ id, currentIsViewed }) => {
      // Optimistic Update: 즉시 UI 업데이트
      await queryClient.cancelQueries({ queryKey: ['surveys'] });
      
      const previousData = queryClient.getQueriesData({ queryKey: ['surveys'] });
      
      // 모든 surveys 쿼리 데이터 업데이트
      queryClient.setQueriesData({ queryKey: ['surveys'] }, (old) => {
        if (!old?.data?.surveys) return old;
        
        return {
          ...old,
          data: {
            ...old.data,
            surveys: old.data.surveys.map(survey => 
              survey._id === id 
                ? { ...survey, isViewed: !currentIsViewed }
                : survey
            )
          }
        };
      });
      
      return { previousData };
    },
    onSuccess: () => {
      toast.success(t('surveyResponse.viewed_status_changed'));
    },
    onError: (error, variables, context) => {
      // 실패 시 로컬 상태도 롤백
      setLocalIsViewed(variables.currentIsViewed);
      
      // 실패 시 이전 데이터로 롤백
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(t('surveyResponse.viewed_status_change_failed'));
      console.error('Toggle viewed error:', error);
    },
    onSettled: () => {
      // 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    }
  });

  const handleToggleViewed = () => {
    if (selectedSurvey?._id && !toggleViewedMutation.isPending) {
      // 로컬 상태를 즉시 업데이트 (연속 클릭 문제 해결)
      const newIsViewed = !localIsViewed;
      setLocalIsViewed(newIsViewed);
      
      toggleViewedMutation.mutate({ 
        id: selectedSurvey._id, 
        currentIsViewed: localIsViewed 
      });
    }
  };
  
  if (!selectedSurvey) {
    return (
      <Container>
        <Title>{t('surveyResponse.title')}</Title>
        <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          {t('surveyResponse.select_survey')}
        </div>
      </Container>
    );
  }

  const surveyData = surveys[i18n.language] || surveys.ko;
  const submissionDate = new Date(selectedSurvey.createdAt);

  // 질문 필드만 필터링
  const questionFields = surveyData.filter(field => field.name.startsWith('question'));

  return (
    <Container>
      <Title>{t('surveyResponse.user_response', { userId: selectedSurvey.userId, name: selectedSurvey.name })}</Title>
      
      <BasicInfo>
        <InfoItem>
          <InfoLabel>{t('surveyResponse.user_id')}</InfoLabel>
          <InfoValue>#{selectedSurvey.userId}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('surveyResponse.name')}</InfoLabel>
          <InfoValue>{selectedSurvey.name}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('surveyResponse.age')}</InfoLabel>
          <InfoValue>{t('surveyResponse.age_value', { age: selectedSurvey.age })}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('surveyResponse.submit_datetime')}</InfoLabel>
          <InfoValue>
            {submissionDate.toLocaleDateString()} {submissionDate.toLocaleTimeString()}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>{t('surveyResponse.is_viewed')}</InfoLabel>
          <InfoValue>
            <ViewedStatusContainer>
              <StatusBadge isViewed={localIsViewed}>
                {localIsViewed ? t('surveyResponse.viewed_complete') : t('surveyResponse.viewed_incomplete')}
              </StatusBadge>
              <ToggleButton 
                onClick={handleToggleViewed}
                disabled={toggleViewedMutation.isPending}
              >
                {toggleViewedMutation.isPending 
                  ? t('surveyResponse.changing')
                  : localIsViewed 
                    ? t('surveyResponse.change_to_incomplete')
                    : t('surveyResponse.change_to_complete')
                }
              </ToggleButton>
            </ViewedStatusContainer>
          </InfoValue>
        </InfoItem>
      </BasicInfo>

      {questionFields.map((field) => {
        const responseValue = selectedSurvey[field.name];
        const selectedOption = field.options?.find(option => option.value == responseValue);
        
        return (
          <ResponseSection key={field.name}>
            <QuestionTitle>{field.label}</QuestionTitle>
            <AnswerDisplay>
              <AnswerText>
                {selectedOption ? selectedOption.label : `값: ${responseValue}`}
              </AnswerText>
              <ScoreDisplay>
                {responseValue}/5점
              </ScoreDisplay>
            </AnswerDisplay>
          </ResponseSection>
        );
      })}
    </Container>
  );
}

export default SurveyResponseDisplay;