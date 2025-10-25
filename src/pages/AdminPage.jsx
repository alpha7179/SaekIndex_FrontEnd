//src/pages/AdminPage.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import SurveyEditForm from '../components/SurveyEditForm';
import { Link } from 'react-router-dom';

const Container = styled.div` 
  padding: 2rem; 
  max-width: 1200px;
  margin: 0 auto;
`;
const Grid = styled.div` display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const Panel = styled.div` background: white; border-radius: 12px; padding: 1rem; `;
const Table = styled.table` width: 100%; border-collapse: collapse; font-size: 0.9rem; th, td { border-bottom: 1px solid #eee; padding: 0.75rem; text-align: left; vertical-align: top; } th { background: #fafafa; } tr:hover { background: #fafafa; } `;
const Actions = styled.div` display: flex; gap: 0.5rem; `;
const Button = styled.button` padding: 0.4rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer; &:hover { background: #f5f5f5; } &:disabled { cursor: not-allowed; opacity: 0.5; }`;
const Danger = styled(Button)` color: #ff4757; border-color: #ffb3ba; `;
const AnswerList = styled.ul` list-style: none; padding: 0; margin: 0; font-size: 0.85rem; li { margin-bottom: 0.25rem; } strong { margin-right: 0.5rem; }`;
const PaginationContainer = styled.div` display: flex; justify-content: center; align-items: center; margin-top: 1rem; gap: 0.5rem; `;
const PageButton = styled.button` padding: 0.5rem 0.8rem; border: 1px solid ${props => (props.isActive ? '#667eea' : '#ddd')}; background: ${props => (props.isActive ? '#667eea' : 'white')}; color: ${props => (props.isActive ? 'white' : '#333')}; border-radius: 6px; cursor: pointer; &:disabled { cursor: not-allowed; opacity: 0.5; } `;

const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
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

function AdminPage() {
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
      toast.info('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['surveys', currentPage] });
      if (surveys.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setSelected(null);
    },
  });


  const onDelete = async (row) => {
    if (!confirm(`[삭제] '${row.name}'님의 설문을 삭제할까요?`)) return;
    await deleteMutation.mutateAsync(row._id);
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <PageHeader
        icon="🗂️"
        title="설문 데이터 통합 관리"
        subtitle="사용자가 제출한 모든 설문 데이터를 관리합니다."
      />

      <TopActions>
        <StatsButton to="/admin/stats">통계 시각화 보기</StatsButton>
      </TopActions>

      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>제출일</th>
                <th>제출시간</th>
                <th>이름</th>
                <th>나이</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => {
                const submissionDate = new Date(s.createdAt);
                return (
                  <tr key={s._id}>
                    <td>{submissionDate.toLocaleDateString()}</td>
                    <td>{submissionDate.toLocaleTimeString()}</td>
                    <td>{s.name}</td>
                    <td>{s.age}세</td>
                    <td>
                      <Actions>
                        <Button onClick={() => setSelected(s)}>확인</Button>
                        <Danger onClick={() => onDelete(s)}>삭제</Danger>
                      </Actions>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          
          <PaginationContainer>
            <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              이전
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageButton key={page} onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                {page}
              </PageButton>
            ))}
            <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              다음
            </PageButton>
          </PaginationContainer>
        </Panel>

        <SurveyEditForm
          selectedSurvey={selected}
          onReset={() => setSelected(null)}
          isReadOnly={true}
        />
      </Grid>
    </Container>
  );
}

export default AdminPage;
