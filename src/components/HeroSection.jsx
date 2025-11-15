/* src/components/HeroSection.jsx */
/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Logo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif;
  font-weight: normal;
  font-size: 1rem;
  background: linear-gradient(135deg, #b84182ff 0%, #F8EBE4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const HeroSectionWrapper = styled.section`
  position: relative;
  min-height: ${props => props.minHeight || '100vh'};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 4rem 1rem;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/image/26a6d929376217172ff4eda74b241447.jpg') center/cover;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(184, 65, 130, 0.48) 0%, rgba(248, 235, 228, 0.85) 100%);
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10vh;
  
  @media (min-width: 768px) {
    padding: 10vh 2rem 0;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  font-size: 0.9rem;
  
  span {
    font-weight: 600;
    color: #2d3748;
  }
  
  @media (max-width: 640px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'YClover', cursive;
  font-size: clamp(2.5rem, 10vw, 5rem);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  line-height: 1.8;
  margin-bottom: 3rem;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 700px;
  
  br {
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #b84182;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 8px 24px rgba(184, 65, 130, 0.4);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(184, 65, 130, 0.5);
  }
  
  @media (max-width: 640px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
`;

const PrimaryButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #b84182;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 8px 24px rgba(184, 65, 130, 0.4);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(184, 65, 130, 0.5);
  }
  
  @media (max-width: 640px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: #b84182;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 640px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
`;

function HeroSection({ 
  badge, 
  title, 
  subtitle, 
  primaryButton, 
  secondaryButton,
  minHeight = '100vh',
  onPrimaryClick,
  children
}) {
  const handlePrimaryClick = (e) => {
    if (onPrimaryClick) {
      e.preventDefault();
      onPrimaryClick();
    }
  };

  return (
    <HeroSectionWrapper minHeight={minHeight}>
      <HeroContent>
        {badge && (
          <Badge>
            <span><Logo>색인</Logo> {badge}</span>
          </Badge>
        )}
        
        <HeroTitle dangerouslySetInnerHTML={{ __html: title }} />
        
        {subtitle && (
          <HeroSubtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}

        {(primaryButton || secondaryButton) && (
          <ButtonGroup>
            {primaryButton && (
              onPrimaryClick ? (
                <PrimaryButton onClick={handlePrimaryClick}>
                  <span>{primaryButton.text}</span>
                  {primaryButton.icon}
                </PrimaryButton>
              ) : (
                <PrimaryButtonLink to={primaryButton.to}>
                  <span>{primaryButton.text}</span>
                  {primaryButton.icon}
                </PrimaryButtonLink>
              )
            )}
            {secondaryButton && (
              <SecondaryButton onClick={secondaryButton.onClick}>
                {secondaryButton.text}
              </SecondaryButton>
            )}
          </ButtonGroup>
        )}
        
        {children}
      </HeroContent>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
