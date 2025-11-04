// src/components/common/Loading.jsx
import styled, { keyframes } from '@emotion/styled';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #b84182ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

const Loading = ({ message = '로딩 중...' }) => (
  <LoadingContainer>
    <Spinner />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
);

export default Loading;