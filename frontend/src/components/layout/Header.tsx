import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 0.4rem 2rem; /* Reduced padding further */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 48px; /* Fixed height for header */
`;

const Logo = styled.div`
  font-size: 1.3rem; /* Reduced font size */
  font-weight: 700;
  letter-spacing: -0.5px;
  
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Reduced gap */
    
    svg {
      font-size: 1.4rem; /* Reduced icon size */
      width: 20px; /* Fixed width */
      height: 20px; /* Fixed height */
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.3rem 0.8rem; /* Reduced padding */
  border-radius: var(--radius-full);
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1px; /* Adjusted position */
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px; /* Reduced thickness */
      background-color: white;
      border-radius: var(--radius-full);
    }
  }
`;

const SearchBox = styled.div`
  position: relative;
  margin-right: 1rem;
  
  input {
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: var(--radius-full);
    padding: 0.3rem 1rem 0.3rem 2.5rem; /* Reduced padding */
    color: white;
    width: 180px; /* Slightly reduced width */
    height: 28px; /* Fixed height */
    transition: all var(--transition-normal);
    font-size: 0.9rem; /* Smaller font */
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    &:focus {
      background-color: rgba(255, 255, 255, 0.25);
      width: 220px; /* Slightly reduced expanded width */
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
    width: 0.8rem; /* Even smaller icon */
    height: 0.8rem; /* Even smaller icon */
  }
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          DSA & System Design
        </Link>
      </Logo>
      
      <ActionSection>
        <SearchBox>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search..." />
        </SearchBox>
        
        <Nav>
          <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
            Dashboard
          </NavLink>
          <NavLink to="/daily-review" className={location.pathname === "/daily-review" ? "active" : ""}>
            Daily Review
          </NavLink>
        </Nav>
      </ActionSection>
    </HeaderContainer>
  );
};

export default Header;