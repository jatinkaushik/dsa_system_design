import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 3rem;
    height: 0.25rem;
    background: linear-gradient(to right, var(--primary-color), var(--primary-light));
    border-radius: var(--radius-full);
  }
`;

const Welcome = styled.div`
  background: linear-gradient(120deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 90%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
  }
`;

const WelcomeTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.75rem;
  line-height: 1.6;
  max-width: 80%;
  opacity: 0.9;
`;

const WelcomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  color: var(--primary-color);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform var(--transition-fast);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.75rem;
`;

const Section = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }
`;

const SectionIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-sm);
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

const SectionTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 1.25rem;
`;

const SectionContent = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
`;

const SectionButton = styled(Link)`
  align-self: flex-start;
  background-color: var(--primary-color);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 1rem;
    height: 1rem;
    transition: transform var(--transition-fast);
  }
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    
    svg {
      transform: translateX(2px);
    }
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    padding: 0.625rem 0;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &:last-child {
      border-bottom: none;
    }
    
    .check {
      color: var(--success-color);
      flex-shrink: 0;
    }
  }
`;

const ReviewContainer = styled.div`
  background-color: rgba(99, 102, 241, 0.05);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-top: 1.25rem;
  border: 1px dashed var(--primary-light);
`;

const ReviewTitle = styled.h4`
  margin-bottom: 0.75rem;
  color: var(--primary-dark);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ReviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewButton = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: all var(--transition-fast);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  
  svg {
    width: 1rem;
    height: 1rem;
    transition: transform var(--transition-fast);
  }
  
  &:hover {
    background-color: rgba(99, 102, 241, 0.1);
    
    svg {
      transform: translateX(2px);
    }
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: var(--radius-full);
  background-color: var(--primary-light);
  color: white;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Dashboard: React.FC = () => {
  // Mock data for items due for review
  const reviewItems = [
    { id: '1', name: 'Quick Sort', type: 'algorithm' },
    { id: '2', name: 'URL Shortener', type: 'systemDesign' },
  ];
  
  return (
    <Container className="animate-fade-in">
      <Welcome>
        <WelcomeTitle>Welcome to DSA & System Design Visualizer</WelcomeTitle>
        <WelcomeText>
          An interactive learning platform to master data structures, algorithms,
          and system design through visual learning and spaced repetition.
        </WelcomeText>
        <WelcomeButton to="/daily-review">
          Start Daily Review
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </WelcomeButton>
      </Welcome>
      
      <Title>Explore</Title>
      
      <SectionsContainer>
        <Section className="animate-slide-up">
          <Badge>Popular</Badge>
          <SectionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </SectionIcon>
          <SectionTitle>Data Structures & Algorithms</SectionTitle>
          <SectionContent>
            <p>Interactive visualizations of algorithms with step-by-step animations.</p>
            <FeatureList>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Animation controls with variable speed
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Custom input data
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Time and space complexity analysis
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Code implementation
              </li>
            </FeatureList>
          </SectionContent>
          <SectionButton to="/algorithms/quicksort">
            View Quick Sort
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </SectionButton>
        </Section>
        
        <Section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SectionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
          </SectionIcon>
          <SectionTitle>System Design</SectionTitle>
          <SectionContent>
            <p>Visualize system architecture diagrams with interactive components.</p>
            <FeatureList>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Interactive architecture diagrams
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Component details and explanations
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Design considerations and tradeoffs
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Requirements analysis
              </li>
            </FeatureList>
          </SectionContent>
          <SectionButton to="/system-design/url-shortener">
            View URL Shortener
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </SectionButton>
        </Section>
        
        <Section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <SectionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </SectionIcon>
          <SectionTitle>Daily Review</SectionTitle>
          <SectionContent>
            <p>Use spaced repetition to strengthen your memory of key concepts.</p>
            <FeatureList>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Scheduled reviews based on confidence
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Focus on challenging concepts
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Track your progress over time
              </li>
              <li>
                <svg className="check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Optimized for long-term retention
              </li>
            </FeatureList>
            
            <ReviewContainer>
              <ReviewTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                Due for Review Today:
              </ReviewTitle>
              <ReviewList>
                {reviewItems.map(item => (
                  <ReviewItem key={item.id}>
                    <span>{item.name}</span>
                    <ReviewButton to={
                      item.type === 'algorithm' 
                        ? `/algorithms/${item.name.toLowerCase().replace(/\s+/g, '')}`
                        : `/system-design/${item.name.toLowerCase().replace(/\s+/g, '-')}`
                    }>
                      Review Now
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </ReviewButton>
                  </ReviewItem>
                ))}
              </ReviewList>
            </ReviewContainer>
          </SectionContent>
          <SectionButton to="/daily-review">
            Go to Daily Review
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </SectionButton>
        </Section>
      </SectionsContainer>
    </Container>
  );
};

export default Dashboard;