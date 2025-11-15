/* src/pages/VisualizationPage.jsx */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';
import HeroSection from '../components/HeroSection';
import { toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';

const PageContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  
  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const VisualizationContainer = styled.div`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 25px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  
  th, td {
    border-bottom: 1px solid #eee;
    padding: 0.75rem;
    text-align: center;
    vertical-align: middle;
    color: #333;
  }
  
  th {
    background: #fafafa;
    vertical-align: middle;
    font-weight: 600;
    color: #555;
  }
  
  tr:hover {
    background: #fafafa;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
`;

const SelectButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
    color: white;
    border-color: transparent;
    transform: scale(1.02);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const VisualizationTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.3rem;
`;

const SelectedSurveyContainer = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 25px;
  margin-top: 2rem;
  border: 2px solid #e9ecef;
  text-align: center;
`;

const SurveyDetailTitle = styled.h4`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  width: 60px;
  height: 60px;
  border: 2px solid #dc3545;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  color: #dc3545;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    border-color: #999;
    color: #333;
    transform: scale(1.05);
  }
`;

const ViewEmotionButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
  height: 60px;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const RedirectMessage = styled.div`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  padding: 5rem 3rem;
  border-radius: 25px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(184, 65, 130, 0.3);
  animation: fadeIn 0.5s ease-in;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
    font-size: 1.3rem;
    min-height: 250px;
  }
`;

const CountdownText = styled.div`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: white;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    font-size: 1.1rem;
  }
`;



function VisualizationPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isVisualizationStarted, setIsVisualizationStarted] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [showRedirectMessage, setShowRedirectMessage] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const { data, isLoading, error } = useQuery({
        queryKey: ['surveys'],
        queryFn: () => surveyAPI.getSurveys(1),
        enabled: isVisualizationStarted, // 시각화가 시작된 후에만 데이터 로드
    });

    const updateIsActiveQueueMutation = useMutation({
        mutationFn: (id) => surveyAPI.updateIsActiveQueue(id, true),
        onSuccess: () => {
            console.log('Active queue status updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update active queue status:', error);
            toast.error(t('VisualizationPage.activation_failed'));
        }
    });

    const updateIsViewedMutation = useMutation({
        mutationFn: (id) => surveyAPI.updateIsViewed(id, true),
        onMutate: async (id) => {
            // Optimistic Update: 즉시 UI에서 해당 설문 제거
            await queryClient.cancelQueries({ queryKey: ['surveys'] });
            
            const previousData = queryClient.getQueryData(['surveys']);
            
            // 캐시에서 해당 설문의 isViewed를 true로 업데이트
            queryClient.setQueryData(['surveys'], (old) => {
                if (!old?.data?.surveys) return old;
                
                return {
                    ...old,
                    data: {
                        ...old.data,
                        surveys: old.data.surveys.map(survey => 
                            survey._id === id 
                                ? { ...survey, isViewed: true }
                                : survey
                        )
                    }
                };
            });
            
            return { previousData };
        },
        onSuccess: () => {
            console.log('Viewing status updated successfully');
        },
        onError: (error, id, context) => {
            console.log('Failed to update viewing status:', error);
            // 실패 시 이전 데이터로 롤백
            if (context?.previousData) {
                queryClient.setQueryData(['surveys'], context.previousData);
            }
            toast.error(t('VisualizationPage.analysis_failed'));
        },
        onSettled: () => {
            // 최종적으로 서버 데이터와 동기화
            queryClient.invalidateQueries({ queryKey: ['surveys'] });
        }
    });

    const handleStartVisualization = () => {
        setIsVisualizationStarted(true);
    };

    const handleSelectSurvey = (survey) => {
        setSelectedSurvey(survey);
    };

    const handleViewEmotion = async () => {
        if (selectedSurvey) {
            try {
                // 1. isActiveQueue를 true로 업데이트 (나의 감정 보기 활성화)
                await updateIsActiveQueueMutation.mutateAsync(selectedSurvey._id);
                console.log('✅ isActiveQueue 활성화 완료:', selectedSurvey._id);
                
                // 2. 시각화 완료 후 isViewed를 true로 업데이트 (대기열에서 제거)
                updateIsViewedMutation.mutate(selectedSurvey._id);
                
                // 3. 선택된 설문 초기화
                setSelectedSurvey(null);
                
                // 4. 리다이렉트 메시지 표시
                setShowRedirectMessage(true);
                setCountdown(5);
                
                // 5. 성공 메시지 표시
                toast.success(t('VisualizationPage.analysis_completed'));
            } catch (error) {
                console.error('❌ 감정 보기 처리 실패:', error);
                toast.error(t('VisualizationPage.analysis_failed'));
            }
        }
    };

    // 카운트다운 및 리다이렉트 처리
    useEffect(() => {
        if (showRedirectMessage && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (showRedirectMessage && countdown === 0) {
            navigate('/');
        }
    }, [showRedirectMessage, countdown, navigate]);



    const maskName = (name) => {
        if (!name || name.length <= 2) return name;
        const visiblePart = name.substring(0, 2);
        const maskedPart = '*'.repeat(name.length - 2);
        return visiblePart + maskedPart;
    };

    // isViewed가 false인 설문만 필터링 (감정 분석 대기열)
    const surveys = (data?.data?.surveys || []).filter(survey => !survey.isViewed);

    return (
        <div className="visualization-page-wrapper">
            <HeroSection
                title={t('VisualizationPage.hero_title')}
                subtitle={!isVisualizationStarted ? t('VisualizationPage.hero_subtitle') : null}
                primaryButton={!isVisualizationStarted ? {
                    text: t('VisualizationPage.start_button'),
                    icon: <FaArrowRight />
                } : null}
                onPrimaryClick={handleStartVisualization}
                minHeight="100vh"
            >
                {showRedirectMessage ? (
                    <PageContainer>
                        <RedirectMessage>
                            <div style={{ color: 'white', fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem' }}>
                                {t('VisualizationPage.redirect_message')}
                            </div>
                            <CountdownText>
                                {t('VisualizationPage.redirect_countdown', { seconds: countdown })}
                            </CountdownText>
                        </RedirectMessage>
                    </PageContainer>
                ) : isVisualizationStarted ? (
                    <PageContainer>
                        <VisualizationContainer>
                    <VisualizationTitle>{t('VisualizationPage.queue_title')}</VisualizationTitle>
                    
                    {isLoading && <LoadingMessage>{t('VisualizationPage.loading')}</LoadingMessage>}
                    {error && <LoadingMessage>{t('VisualizationPage.error')}</LoadingMessage>}
                    
                    {!isLoading && !error && surveys.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>{t('VisualizationPage.user_id')}</th>
                                    <th>{t('VisualizationPage.name')}</th>
                                    <th>{t('VisualizationPage.submit_datetime')}</th>
                                    <th>{t('VisualizationPage.select')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys.map((s) => {
                                    const submissionDate = new Date(s.createdAt);
                                    
                                    return (
                                        <tr key={s._id}>
                                            <td>#{s.userId}</td>
                                            <td>{maskName(s.name)}</td>
                                            <td>
                                                {submissionDate.toLocaleDateString()}<br />
                                                <small style={{ color: '#666', fontSize: '0.8rem' }}>
                                                    {submissionDate.toLocaleTimeString()}
                                                </small>
                                            </td>
                                            <td>
                                                <SelectButton onClick={() => handleSelectSurvey(s)}>
                                                    {t('VisualizationPage.select_button')}
                                                </SelectButton>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                    
                    {!isLoading && !error && surveys.length === 0 && (
                        <LoadingMessage>
                            {t('VisualizationPage.queue_empty')}
                        </LoadingMessage>
                    )}

                    {selectedSurvey && (
                        <SelectedSurveyContainer>
                            <SurveyDetailTitle>
                                {t('VisualizationPage.user_emotion_check_title', { name: maskName(selectedSurvey.name) })}
                            </SurveyDetailTitle>

                            <ButtonContainer>
                                <ViewEmotionButton onClick={handleViewEmotion}>
                                    {t('VisualizationPage.view_my_emotion_button')}
                                </ViewEmotionButton>
                                <CloseButton onClick={() => setSelectedSurvey(null)}>
                                    ×
                                </CloseButton>
                            </ButtonContainer>
                        </SelectedSurveyContainer>
                    )}
                        </VisualizationContainer>
                    </PageContainer>
                ) : null}
            </HeroSection>
        </div>
    );
}

export default VisualizationPage;