import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 280px;
  background-color: var(--surface-color);
  border-right: 1px solid var(--border-color);
  height: 100%;
  transition: width var(--transition-normal);
  box-shadow: var(--shadow-sm);
  overflow-y: auto;
  padding: 1.5rem 0;
`;

const SectionTitle = styled.h3`
  padding: 0 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.25rem;
  
  a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: var(--text-primary);
    text-decoration: none;
    transition: all var(--transition-fast);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    position: relative;
    font-weight: 500;
    gap: 0.75rem;
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
      opacity: 0.7;
      transition: opacity var(--transition-fast);
    }
    
    .coming-soon {
      margin-left: auto;
      font-size: 0.7rem;
      color: var(--text-secondary);
      background-color: var(--border-color);
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-full);
    }
    
    &:hover {
      background-color: rgba(99, 102, 241, 0.08);
      color: var(--primary-color);
      
      svg {
        opacity: 1;
      }
    }
    
    &.active {
      background-color: rgba(99, 102, 241, 0.12);
      color: var(--primary-color);
      font-weight: 600;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background: linear-gradient(to bottom, var(--primary-color), var(--primary-dark));
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
      
      svg {
        opacity: 1;
        color: var(--primary-color);
      }
    }
    
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--border-color);
  margin: 1.5rem 1.5rem;
  opacity: 0.6;
`;

const ProfileSection = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: var(--shadow-sm);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  .name {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.875rem;
  }
  
  .role {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <SidebarContainer>
      <SectionTitle>Algorithms</SectionTitle>
      <NavList>
        <NavItem>
          <Link 
            to="/algorithms/quicksort" 
            className={location.pathname === "/algorithms/quicksort" ? "active" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 16v-8h-8"></path>
              <path d="M19 9l-3-3-3 3"></path>
              <path d="M8 8l-3 3 3 3"></path>
            </svg>
            Quick Sort
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="#" 
            onClick={(e) => e.preventDefault()}
            className="disabled"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7l4-4 4 4"></path>
              <path d="M8 17l4 4 4-4"></path>
              <path d="M6 12h12"></path>
            </svg>
            Merge Sort
            <span className="coming-soon">Soon</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="#" 
            onClick={(e) => e.preventDefault()}
            className="disabled"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Binary Search Tree
            <span className="coming-soon">Soon</span>
          </Link>
        </NavItem>
      </NavList>
      
      <SectionTitle>System Design</SectionTitle>
      <NavList>
        <NavItem>
          <Link 
            to="/system-design/url-shortener" 
            className={location.pathname === "/system-design/url-shortener" ? "active" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            URL Shortener
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="#" 
            onClick={(e) => e.preventDefault()}
            className="disabled"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Social Media Feed
            <span className="coming-soon">Soon</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="#" 
            onClick={(e) => e.preventDefault()}
            className="disabled"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            E-commerce Platform
            <span className="coming-soon">Soon</span>
          </Link>
        </NavItem>
      </NavList>
      
      <Divider />
      
      <SectionTitle>Resources</SectionTitle>
      <NavList>
        <NavItem>
          <Link to="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Documentation
          </Link>
        </NavItem>
        <NavItem>
          <Link to="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Reference Guide
          </Link>
        </NavItem>
      </NavList>
      
      <Divider />
      
      <ProfileSection>
        <Avatar>U</Avatar>
        <UserInfo>
          <span className="name">User</span>
          <span className="role">Developer</span>
        </UserInfo>
      </ProfileSection>
    </SidebarContainer>
  );
};

export default Sidebar;