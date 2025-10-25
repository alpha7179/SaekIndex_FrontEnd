/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  padding: 1rem 2rem; /* 좌우 패딩 추가 */
  border-bottom: 1px solid #f0f0f0; /* 아래에 얇은 구분선 추가 */
  
  /* 2. flex를 이용해 로고, 메뉴, 언어 선택 영역을 좌우로 배치 */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333d4b; /* 토스의 메인 텍스트 색상과 유사하게 */
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem; /* 메뉴 사이 간격 */
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: #4e5968; /* 토스의 메뉴 텍스트 색상과 유사하게 */
  padding: 0.5rem;
  
  /* 3. 활성(active) 상태일 때 텍스트 색상을 다르게 표시 */
  &.active {
    color: #b84182ff; /* 토스의 포인트 색상 */
  }

  &:hover {
    color: #c777a3ff;
  }
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4e5968;
`;

const LangButton = styled.span`
  cursor: pointer;
  padding: 0.25rem;
  color: ${props => props.active ? '#333d4b' : '#b0b8c1'}; /* 활성/비활성 색상 구분 */
`;

const Separator = styled.div`
  width: 1px;
  height: 12px;
  background-color: #e5e8eb;
`;

const HeaderLogo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 2rem; /* 폰트 크기 살짝 키우기 (선택 사항) */

  background: linear-gradient(135deg, #b84182ff 0%, #F8EBE4 100%);
  -webkit-background-clip: text; /* 웹킷 기반 브라우저 호환성 */
  background-clip: text;
  color: transparent;
`;


function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <Logo to="/"><HeaderLogo>색인</HeaderLogo></Logo>

      <Nav>
        {}
        <NavLink to="/" className={isActive('/')}>
          {t('menu.home')}
        </NavLink>
        <NavLink to="/analyze" className={isActive('/analyze')}>
          {t('menu.analyze')}
        </NavLink>
        <NavLink to="/visualization" className={isActive('/visualization')}>
          {t('menu.visualization')}
        </NavLink>
      </Nav>

      <LangSwitcher>
        {}
        <LangButton active={i18n.language === 'ko'} onClick={() => changeLanguage('ko')}>
          KOR
        </LangButton>
        <Separator />
        <LangButton active={i18n.language === 'en'} onClick={() => changeLanguage('en')}>
          ENG
        </LangButton>
      </LangSwitcher>
    </HeaderContainer>
  );
}

export default Header;