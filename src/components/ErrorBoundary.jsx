// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #dc3545;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>앗! 문제가 발생했습니다</ErrorTitle>
          <ErrorMessage>
            예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            다시 시도
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;