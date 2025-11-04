//src/pages/AdminPage.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import SurveyResponseDisplay from '../components/SurveyResponseDisplay';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Container = styled.div` 
  padding: 2rem; 
  max-width: 1200px;
  margin: 0 auto;
`;
const Grid = styled.div` display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const Panel = styled.div` background: white; border-radius: 25px; padding: 1rem 1.5rem; `;
const Table = styled.table` 
  width: 100%; 
  border-collapse: collapse; 
  font-size: 0.9rem; 
  
  th, td { 
    border-bottom: 1px solid #eee; 
    padding: 0.75rem; 
    text-align: center; 
    vertical-align: middle; 
  } 
  
  th { 
    background: #fafafa; 
    vertical-align: middle;
  } 
  
  tr:hover { 
    background: #fafafa; 
  } 
`;
const Actions = styled.div` 
  display: flex; 
  gap: 0.5rem; 
  justify-content: center;
  align-items: center;
`;
const Button = styled.button` 
  padding: 0.5rem 1rem; 
  border: 1px solid #ddd; 
  border-radius: 25px; 
  background: white; 
  cursor: pointer; 
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 60px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover { 
    background: #f5f5f5; 
    transform: scale(1.02);
  } 
  
  &:disabled { 
    cursor: not-allowed; 
    opacity: 0.5; 
  }
`;
const Danger = styled(Button)` 
  color: #ff4757; 
  border-color: #ffb3ba; 
  
  &:hover {
    background: #fff5f5;
    border-color: #ff4757;
    transform: scale(1.02);
  }
`;

const PaginationContainer = styled.div` display: flex; justify-content: center; align-items: center; margin-top: 1rem; gap: 0.5rem; `;
const PageButton = styled.button` 
  width: 40px; 
  height: 40px; 
  border: 1px solid ${props => (props.isActive ? 'transparent' : '#ddd')}; 
  background: ${props => (props.isActive ? 'linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%)' : 'white')}; 
  color: ${props => (props.isActive ? 'white' : '#333')}; 
  border-radius: 50%; 
  cursor: pointer; 
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) { 
    background: ${props => (props.isActive ? 'linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%)' : '#f5f5f5')}; 
    transform: ${props => (props.isActive ? 'scale(1.05)' : 'scale(1.02)')};
  } 
  
  &:disabled { 
    cursor: not-allowed; 
    opacity: 0.5; 
  } 
`;

const TopActions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
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

const ViewedStatusBadge = styled.span`
  background: ${props => props.isViewed ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 32px;
`;

function AdminPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['surveys', currentPage],
    queryFn: () => surveyAPI.getSurveys(currentPage),
    keepPreviousData: true,
  });

  const surveys = data?.data?.surveys || [];
  const totalPages = data?.data?.totalPages || 1;

  const deleteMutation = useMutation({
    mutationFn: (id) => surveyAPI.deleteSurvey(id),
    onSuccess: () => {
      toast.info(t('adminPage.delete_success'));
      queryClient.invalidateQueries({ queryKey: ['surveys', currentPage] });
      if (surveys.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setSelected(null);
    },
  });


  const onDelete = async (row) => {
    if (!confirm(t('adminPage.delete_confirm', { name: row.name }))) return;
    await deleteMutation.mutateAsync(row._id);
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <div>{t('adminPage.loading')}</div>;
  if (error) return <div>{t('adminPage.error', { message: error.message })}</div>;

  return (
    <Container>
      <PageHeader
        icon="🗂️"
        title={t('adminPage.title')}
        subtitle={t('adminPage.subtitle')}
      />

      <TopActions>
        <StatsButton to="/admin/stats">{t('adminPage.view_stats')}</StatsButton>
      </TopActions>

      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>{t('adminPage.user_id')}</th>
                <th>{t('adminPage.name')}</th>
                <th>{t('adminPage.submit_datetime')}</th>
                <th>{t('adminPage.is_viewed')}</th>
                <th>{t('adminPage.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => {
                const submissionDate = new Date(s.createdAt);
                
                return (
                  <tr key={s._id}>
                    <td>#{s.userId}</td>
                    <td>{s.name}</td>
                    <td>
                      {submissionDate.toLocaleDateString()}<br />
                      <small style={{ color: '#666', fontSize: '0.8rem' }}>
                        {submissionDate.toLocaleTimeString()}
                      </small>
                    </td>
                    <td>
                      <ViewedStatusBadge isViewed={s.isViewed}>
                        {s.isViewed ? t('adminPage.viewed') : t('adminPage.not_viewed')}
                      </ViewedStatusBadge>
                    </td>
                    <td>
                      <Actions>
                        <Button onClick={() => setSelected(s)}>{t('adminPage.view')}</Button>
                        <Danger onClick={() => onDelete(s)}>{t('adminPage.delete')}</Danger>
                      </Actions>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          
          <PaginationContainer>
            <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              ◀
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageButton key={page} onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                {page}
              </PageButton>
            ))}
            <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              ▶
            </PageButton>
          </PaginationContainer>
        </Panel>

        <SurveyResponseDisplay selectedSurvey={selected} />
      </Grid>
    </Container>
  );
}

export default AdminPage;
