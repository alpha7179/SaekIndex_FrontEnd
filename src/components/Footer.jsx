/* src/components/Footer.jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #f9fafb; /* 매우 옅은 회색 배경 */
  color: #6b7280; /* 기본 텍스트 색상 */
  font-size: 0.875rem;
  padding: 3rem 2rem;
  border-top: 1px solid #f0f0f0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 화면이 작아지면 줄바꿈 */
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e8eb;
`;

const Column = styled.div`
  flex: 1;
  min-width: 150px; /* 컬럼의 최소 너비 */
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333d4b;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LinkItem = styled.li`
  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoSection = styled.div`
  padding-top: 2rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const FooterLogo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 1.5rem; /* 폰트 크기 살짝 키우기 (선택 사항) */
`;

function Footer() {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    
    return (
        <FooterContainer>
        <FooterContent>
            <ColumnsWrapper>
            <Column>
                <ColumnTitle>{t('footer.menuname')}</ColumnTitle>
                <LinkList>
                <LinkItem><a href="/">{t('menu.home')}</a></LinkItem>
                <LinkItem><a href="/analyze">{t('menu.analyze')}</a></LinkItem>
                <LinkItem><a href="/visualization">{t('menu.visualization')}</a></LinkItem>
                </LinkList>
            </Column>
            </ColumnsWrapper>

            <InfoSection>
            <strong><FooterLogo>색인</FooterLogo> {t('footer.projectname')}</strong> <br />
            © 2025 SaekIn Proj. All Rights Reserved.
            </InfoSection>
        </FooterContent>
        </FooterContainer>
    );
}

export default Footer;