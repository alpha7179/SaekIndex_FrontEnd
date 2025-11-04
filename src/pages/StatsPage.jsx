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
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
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
  TimeScale,
  ArcElement
);

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  background: white;
  border-radius: 25px;
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
  justify-content: center;
  margin-bottom: 1.5rem;

  max-width: 900px;
  margin: 0 auto 1.5rem auto;
  padding: 0 0rem;
`;
const StatsButton = styled(Link)`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: scale(1.05);
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
    return <p>{t('statsPage.loading')}</p>;
  }

  if (error) {
    return <p>{t('statsPage.error', { message: error.message })}</p>;
  }

  if (!data || !data.data || !data.data.totalSurveys) {
    return <p>{t('statsPage.no_data')}</p>;
  }

  const stats = data.data;
  
  const dailyCounts = stats.dailyCount || [];
  const hourlyCounts = stats.hourlyCount || [];
  const ageDistributions = stats.ageDistribution || [];
  const questionDistributions = stats.questionDistributions || {};
  const q1Distributions = questionDistributions.question1Distribution || {};
  const q2Distributions = questionDistributions.question2Distribution || {};
  const q3Distributions = questionDistributions.question3Distribution || {};
  const q4Distributions = questionDistributions.question4Distribution || {};
  const q5Distributions = questionDistributions.question5Distribution || {};
  const q6Distributions = questionDistributions.question6Distribution || {};
  const q7Distributions = questionDistributions.question7Distribution || {};
  const q8Distributions = questionDistributions.question8Distribution || {};
  
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

  // Helper function to format chart data for pie charts
  const formatPieChartData = (distribution, questionKey) => {
    const responseOrder = [1, 2, 3, 4, 5];
    const labels = responseOrder.filter(key => distribution[key] > 0);
    const data = labels.map(key => distribution[key]);
    
    const colors = [
      'rgba(255, 99, 132, 0.8)',   // never - red
      'rgba(255, 159, 64, 0.8)',   // rarely - orange  
      'rgba(255, 205, 86, 0.8)',   // sometimes - yellow
      'rgba(75, 192, 192, 0.8)',   // often - teal
      'rgba(54, 162, 235, 0.8)',   // always - blue
    ];
    
    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)', 
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
    ];

    return {
      labels: labels.map(label => {
        const labelMap = {
          1: t('statsPage.never'),
          2: t('statsPage.rarely'), 
          3: t('statsPage.sometimes'),
          4: t('statsPage.often'),
          5: t('statsPage.always')
        };
        return labelMap[label];
      }),
      datasets: [{
        label: t(`statsPage.${questionKey}_title`),
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: borderColors.slice(0, labels.length),
        borderWidth: 1,
      }]
    };
  };

  const q1ChartData = formatPieChartData(q1Distributions, 'q1');
  const q2ChartData = formatPieChartData(q2Distributions, 'q2');
  const q3ChartData = formatPieChartData(q3Distributions, 'q3');
  const q4ChartData = formatPieChartData(q4Distributions, 'q4');
  const q5ChartData = formatPieChartData(q5Distributions, 'q5');
  const q6ChartData = formatPieChartData(q6Distributions, 'q6');
  const q7ChartData = formatPieChartData(q7Distributions, 'q7');
  const q8ChartData = formatPieChartData(q8Distributions, 'q8');

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
        <StatsButton to="/admin">{t('statsPage.back_to_admin')}</StatsButton>
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
        <ChartTitle>{t('statsPage.psychological_questions_title')}</ChartTitle>
        <Grid>
          <div>
            <ChartTitle>{t('statsPage.q1_heading')}</ChartTitle>
            {Object.keys(q1Distributions).length > 0 ? (
              <Pie data={q1ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q2_heading')}</ChartTitle>
            {Object.keys(q2Distributions).length > 0 ? (
              <Pie data={q2ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q3_heading')}</ChartTitle>
            {Object.keys(q3Distributions).length > 0 ? (
              <Pie data={q3ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q4_heading')}</ChartTitle>
            {Object.keys(q4Distributions).length > 0 ? (
              <Pie data={q4ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q5_heading')}</ChartTitle>
            {Object.keys(q5Distributions).length > 0 ? (
              <Pie data={q5ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q6_heading')}</ChartTitle>
            {Object.keys(q6Distributions).length > 0 ? (
              <Pie data={q6ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q7_heading')}</ChartTitle>
            {Object.keys(q7Distributions).length > 0 ? (
              <Pie data={q7ChartData} />
            ) : (
              <p>{t('statsPage.nodata')}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t('statsPage.q8_heading')}</ChartTitle>
            {Object.keys(q8Distributions).length > 0 ? (
              <Pie data={q8ChartData} />
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