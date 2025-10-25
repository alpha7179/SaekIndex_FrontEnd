// src/pages/StatsPage.jsx
import React from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  TimeScale,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { surveyAPI } from '../services/api';
import HeatmapChart from '../components/HeatmapChart';
import 'chartjs-adapter-moment';
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  TimeScale
);

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  max-width: 900px;
  margin: 0 auto 1.5rem auto;
  padding: 0 0rem;
`;
const StatsButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background: #5a67d8;
  }
`;

const StatsPage = () => {
  const { t } = useTranslation();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['surveyStats'],
    queryFn: surveyAPI.getSurveyStats,
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <p>통계 데이터를 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p>데이터를 불러오는 데 실패했습니다: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.totalSurveys) {
    return <p>표시할 데이터가 없습니다. 설문조사 데이터를 추가해주세요.</p>;
  }

  const stats = data.data;
  
  const dailyCounts = stats.dailyCount || [];
  const hourlyCounts = stats.hourlyCount || [];
  const ageDistributions = stats.ageDistribution || [];
  const q1Distributions = stats.question1Distribution || {};
  const q2Distributions = stats.question2Distribution || {};
  const q3Distributions = stats.question3Distribution || {};
  
  const heatmapData = stats.heatmapData || [];

  const dailyChartData = {
    labels: dailyCounts.map(item => item.date),
    datasets: [{
      label: t('statsPage.daily_count_title'),
      data: dailyCounts.map(item => item.count),
      borderColor: '#b84182ff',
      backgroundColor: '#b84182ff',
    }]
  };

  const hourlyChartData = {
    labels: hourlyCounts.map(item => `${item.hour}시`),
    datasets: [{
      label: t('statsPage.hourly_count_title'),
      data: hourlyCounts.map(item => item.count),
      borderColor: '#ddc9bfff',
      backgroundColor: '#ddc9bfff',
      tension: 0.4,
      fill: false,
    }]
  };

  const ageChartData = {
    labels: ageDistributions.map(item => item.range),
    datasets: [
      {
        label: t('statsPage.age_distribution_title'),
        data: ageDistributions.map(item => item.count),
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const q1ChartData = {
    labels: Object.keys(q1Distributions).sort(),
    datasets: [{
      label: t('statsPage.q1_title'),
      data: Object.values(q1Distributions),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const q2ChartData = {
    labels: Object.keys(q2Distributions).sort(),
    datasets: [{
      label: t('statsPage.q2_title'),
      data: Object.values(q2Distributions),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const q3ChartData = {
    labels: Object.keys(q3Distributions).sort(),
    datasets: [{
      label: t('statsPage.q3_title'),
      data: Object.values(q3Distributions),
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon="📊"
        title={t('statsPage.title')}
        subtitle={t('statsPage.subtitle')}
      />
      <TopActions>
        <StatsButton to="/admin">관리자 페이지로 돌아가기</StatsButton>
      </TopActions>
      <Container>
        <ChartTitle>{t('statsPage.total_surveys', { count: stats.totalSurveys })}</ChartTitle>
        <ChartTitle>{t('statsPage.daily-hourly_heading')}</ChartTitle>
        {heatmapData.length > 0 ? (
          <HeatmapChart data={heatmapData} />
        ) : (
          <p>{t('statsPage.nodata')}</p>
        )}
        <Grid>
          <div>
            <ChartTitle>{t('statsPage.daily_count_heading')}</ChartTitle>
            {dailyCounts.length > 0 ? (
              <Line data={dailyChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.hourly_count_heading')}</ChartTitle>
            {hourlyCounts.length > 0 ? (
              <Line data={hourlyChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
        </Grid>
        <hr />
        <ChartTitle>{t('statsPage.age_distribution_heading')}</ChartTitle>
        {ageDistributions.length > 0 ? (
          <Bar data={ageChartData} />
        ) : (
          <p>{t('statsPage.nodata')}</p>
        )}
        <hr />
        <Grid>
          <div>
            <ChartTitle>{t('statsPage.q1_heading')}</ChartTitle>
            {Object.keys(q1Distributions).length > 0 ? (
              <Bar data={q1ChartData} options={options} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q2_heading')}</ChartTitle>
            {Object.keys(q2Distributions).length > 0 ? (
              <Bar data={q2ChartData} options={options} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q3_heading')}</ChartTitle>
            {Object.keys(q3Distributions).length > 0 ? (
              <Bar data={q3ChartData} options={options} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default StatsPage;