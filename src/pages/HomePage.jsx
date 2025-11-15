/* src/pages/HomePage.jsx */
/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSmile, FaSadTear, FaSurprise, FaMeh, FaAngry,
  FaComments, FaChartLine, FaPalette, FaArrowRight,
  FaHeart, FaLightbulb, FaBrain, FaImage
} from 'react-icons/fa';

const Logo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 1.5rem;

  background: linear-gradient(135deg, #b84182ff 0%, #F8EBE4 100%);
  -webkit-background-clip: text; /* 웹킷 기반 브라우저 호환성 */
  background-clip: text;
  color: transparent;
`;

// Styled Components
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  
  @media (min-width: 768px) {
    padding: 0 2rem;
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
  
  svg {
    font-size: 1.25rem;
    color: #b84182;
  }
  
  span {
    font-weight: 600;
    color: #2d3748;
  }
  
  @media (max-width: 640px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
    
    svg {
      font-size: 1.1rem;
    }
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

const PrimaryButton = styled(Link)`
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

const VisualizationButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dd6ba9ff;
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

const FloatingEmotions = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.25;
  animation: float 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  svg {
    font-size: 2.5rem;
    color: white;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const Section = styled.section`
  padding: 4rem 1.5rem;
  background: ${props => props.bg || 'white'};
  width: 100%;
  min-height: ${props => props.fullHeight ? '100vh' : 'auto'};
  display: ${props => props.fullHeight ? 'flex' : 'block'};
  flex-direction: ${props => props.fullHeight ? 'column' : 'row'};
  justify-content: ${props => props.fullHeight ? 'center' : 'flex-start'};
  
  @media (min-width: 768px) {
    padding: 6rem 3rem;
  }
  
  @media (min-width: 1024px) {
    padding: 8rem 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  text-align: center;
  color: #718096;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #fce7f3 0%, #fef5ff 100%);
  padding: 2rem;
  border-radius: 24px;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(184, 65, 130, 0.15);
  }
  
  .icon-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    background: #b84182;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s;
    
    svg {
      font-size: 1.75rem;
      color: white;
    }
  }
  
  &:hover .icon-wrapper {
    transform: scale(1.1);
  }
  
  h3 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #2d3748;
  }
  
  p {
    color: #718096;
    line-height: 1.6;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }
  
  @media (min-width: 768px) {
    padding: 2.5rem;
    
    .icon-wrapper {
      width: 4rem;
      height: 4rem;
      
      svg {
        font-size: 2rem;
      }
    }
  }
`;

const EmotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }
`;

const EmotionCard = styled.div`
  background: ${props => props.color};
  border-radius: 20px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: ${props => props.active ? 'scale(1.05)' : 'scale(1)'};
  box-shadow: ${props => props.active ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    
    .icon-circle {
      transform: scale(1.2);
      
      svg {
        transform: scale(1.1);
      }
    }
  }
  
  .icon-circle {
    width: 3.5rem;
    height: 3.5rem;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
    transition: transform 0.3s ease;
    
    svg {
      font-size: 2rem;
      color: white;
      transition: transform 0.3s ease;
    }
  }
  
  h4 {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(0.75rem, 2vw, 0.9rem);
    display: none;
  }
  
  @media (min-width: 480px) {
    padding: 2rem 1.25rem;
    border-radius: 24px;
    
    .icon-circle {
      width: 4rem;
      height: 4rem;
      margin-bottom: 1rem;
      
      svg {
        font-size: 2.5rem;
      }
    }
    
    p {
      display: block;
    }
  }
  
  @media (min-width: 768px) {
    padding: 2.5rem 1.5rem;
    
    .icon-circle {
      width: 5rem;
      height: 5rem;
      
      svg {
        font-size: 3rem;
      }
    }
  }
`;

const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FlowCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 1023px) {
    flex-direction: column;
    
    .arrow-icon {
      transform: rotate(90deg);
    }
  }
`;

const FlowCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
  flex: 1;
  width: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    
    .step-number {
      transform: scale(1.15);
      color: #f9a8d4;
    }
  }
  
  .step-number {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 800;
    color: #fce7f3;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }
  
  h3 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.75rem;
  }
  
  p {
    color: #718096;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }
  
  @media (min-width: 768px) {
    padding: 2.5rem;
    border-radius: 24px;
  }
`;

const FlowArrow = styled.div`
  color: #b84182;
  font-size: 2rem;
  flex-shrink: 0;
  
  @media (max-width: 1023px) {
    display: none;
  }
  
  @media (min-width: 1024px) {
    &.last-arrow {
      display: none;
    }
  }
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    .icon-wrapper {
      transform: scale(1.15) rotate(5deg);
      
      svg {
        transform: scale(1.1);
      }
    }
  }
  
  .icon-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    background: ${props => props.iconBg};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
    
    svg {
      font-size: 1.75rem;
      color: ${props => props.iconColor};
      transition: transform 0.3s ease;
    }
  }
  
  h3 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.75rem;
  }
  
  p {
    color: #718096;
    line-height: 1.6;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }
  
  @media (min-width: 768px) {
    .icon-wrapper {
      width: 4rem;
      height: 4rem;
      
      svg {
        font-size: 2rem;
      }
    }
  }
`;

function HomePage() {
  const [activeEmotion, setActiveEmotion] = useState(null);

  const { t } = useTranslation();

  const emotions = [
    { name: t('home.emotion_happy'), icon: FaSmile, color: '#fbbf24', description: t('home.emotion_happy_desc') },
    { name: t('home.emotion_sad'), icon: FaSadTear, color: '#60a5fa', description: t('home.emotion_sad_desc') },
    { name: t('home.emotion_surprise'), icon: FaSurprise, color: '#a78bfa', description: t('home.emotion_surprise_desc') },
    { name: t('home.emotion_calm'), icon: FaMeh, color: '#34d399', description: t('home.emotion_calm_desc') },
    { name: t('home.emotion_angry'), icon: FaAngry, color: '#f87171', description: t('home.emotion_angry_desc') }
  ];

  const features = [
    { icon: FaComments, title: t('home.feature_survey_title'), description: t('home.feature_survey_desc') },
    { icon: FaChartLine, title: t('home.feature_analysis_title'), description: t('home.feature_analysis_desc') },
    { icon: FaPalette, title: t('home.feature_art_title'), description: t('home.feature_art_desc') }
  ];

  const userFlow = [
    { step: '01', title: t('home.flow_step1_title'), description: t('home.flow_step1_desc') },
    { step: '02', title: t('home.flow_step2_title'), description: t('home.flow_step2_desc') },
    { step: '03', title: t('home.flow_step3_title'), description: t('home.flow_step3_desc') },
    { step: '04', title: t('home.flow_step4_title'), description: t('home.flow_step4_desc') }
  ];

  const benefits = [
    { icon: FaHeart, iconBg: '#fce7f3', iconColor: '#ec4899', title: t('home.benefit1_title'), description: t('home.benefit1_desc') },
    { icon: FaLightbulb, iconBg: '#fef3c7', iconColor: '#f59e0b', title: t('home.benefit2_title'), description: t('home.benefit2_desc') },
    { icon: FaBrain, iconBg: '#dbeafe', iconColor: '#3b82f6', title: t('home.benefit3_title'), description: t('home.benefit3_desc') },
    { icon: FaImage, iconBg: '#d1fae5', iconColor: '#10b981', title: t('home.benefit4_title'), description: t('home.benefit4_desc') }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-wrapper">
      {/* Hero Section */}
      <HeroSection>
        <FloatingEmotions>
          {emotions.map((emotion, index) => (
            <FloatingIcon
              key={index}
              color={emotion.color}
              delay={index * 0.5}
              style={{
                top: `${20 + index * 15}%`,
                right: `${10 + index * 8}%`
              }}
            >
              <emotion.icon />
            </FloatingIcon>
          ))}
        </FloatingEmotions>

        <HeroContent>
          <Badge>
            <span><Logo>{t('home.badge')}</Logo></span>
          </Badge>
          
          <HeroTitle dangerouslySetInnerHTML={{ __html: t('home.hero_title') }} />
          
          <HeroSubtitle dangerouslySetInnerHTML={{ __html: t('home.hero_subtitle') }} />

          <ButtonGroup>
            <PrimaryButton to="/analyze">
              <span>{t('home.btn_start_analysis')}</span>
              <FaArrowRight />
            </PrimaryButton>
            <VisualizationButton to="/visualization">
              <span>{t('home.btn_view_visualization')}</span>
              <FaArrowRight />
            </VisualizationButton>
            <SecondaryButton onClick={() => scrollToSection('about')}>
              {t('home.btn_learn_more')}
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      {/* About Section */}
      <Section id="about" fullHeight>
        <div>
          <SectionTitle>{t('home.section_about_title')}</SectionTitle>
          <SectionSubtitle>
            <Logo>색인</Logo>{t('home.section_about_subtitle')}
          </SectionSubtitle>

          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <div className="icon-wrapper">
                  <feature.icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <div style={{ marginTop: '5rem' }}>
            <SectionTitle style={{ marginBottom: '3rem' }}>{t('home.section_emotions_title')}</SectionTitle>
            <EmotionGrid>
              {emotions.map((emotion, index) => (
                <EmotionCard
                  key={index}
                  color={emotion.color}
                  active={activeEmotion === index}
                  onMouseEnter={() => setActiveEmotion(index)}
                  onMouseLeave={() => setActiveEmotion(null)}
                >
                  <div className="icon-circle">
                    <emotion.icon />
                  </div>
                  <h4>{emotion.name}</h4>
                  <p>{emotion.description}</p>
                </EmotionCard>
              ))}
            </EmotionGrid>
          </div>
        </div>
      </Section>

      {/* User Flow Section */}
      <Section bg="linear-gradient(135deg, #fce7f3 0%, #fef5ff 100%)">
        <SectionTitle>{t('home.section_flow_title')}</SectionTitle>
        <SectionSubtitle>{t('home.section_flow_subtitle')}</SectionSubtitle>

        <FlowGrid>
          {userFlow.map((flow, index) => (
            <FlowCard key={index}>
              <div className="step-number">{flow.step}</div>
              <h3>{flow.title}</h3>
              <p>{flow.description}</p>
            </FlowCard>
          ))}
        </FlowGrid>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle>{t('home.section_benefits_title')}</SectionTitle>
        <SectionSubtitle><Logo>색인</Logo>{t('home.section_benefits_subtitle')}</SectionSubtitle>

        <BenefitGrid>
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              iconBg={benefit.iconBg}
              iconColor={benefit.iconColor}
            >
              <div className="icon-wrapper">
                <benefit.icon />
              </div>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </BenefitItem>
          ))}
        </BenefitGrid>
      </Section>
    </div>
  );
}

export default HomePage;