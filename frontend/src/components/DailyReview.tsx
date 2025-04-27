import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewItem } from '../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const ReviewIntro = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const IntroText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReviewItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-top: 4px solid var(--primary-color);
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const CardType = styled.div`
  display: inline-block;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const CardDetails = styled.div`
  margin-bottom: 1rem;
  flex: 1;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  span:first-child {
    color: #666;
  }

  span:last-child {
    font-weight: 500;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ViewButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a5a84;
  }
`;

const ConfidenceContainer = styled.div`
  margin-top: 1rem;
`;

const ConfidenceLabel = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const ConfidenceButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

interface ConfidenceButtonProps {
  level: number;
  selected: boolean;
}

const ConfidenceButton = styled.button<ConfidenceButtonProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background-color: ${props => props.selected ? 'var(--primary-color)' : 'white'};
  color: ${props => props.selected ? 'white' : 'var(--text-color)'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary-color)' : '#f0f0f0'};
  }
`;

const NoReviewsMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  color: #666;
`;

const EmptyStateEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const DailyReview: React.FC = () => {
  // Mock review data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: '1',
      type: 'algorithm',
      name: 'Quick Sort',
      lastReviewed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      dueDate: new Date(),
      confidenceLevel: 3
    },
    {
      id: '2',
      type: 'systemDesign',
      name: 'URL Shortener',
      lastReviewed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      dueDate: new Date(),
      confidenceLevel: 2
    }
  ]);
  
  const [confidence, setConfidence] = useState<Record<string, number>>({
    '1': 3,
    '2': 2
  });
  
  const handleConfidenceChange = (itemId: string, level: number) => {
    setConfidence(prev => ({
      ...prev,
      [itemId]: level
    }));
    
    // In a real app, this would update the backend and reschedule the review
    // based on the spaced repetition algorithm
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getNextReviewDate = (confidenceLevel: number) => {
    const today = new Date();
    let daysToAdd = 1;
    
    // Simple spaced repetition algorithm
    // Higher confidence = longer intervals
    switch (confidenceLevel) {
      case 1:
        daysToAdd = 1; // Review tomorrow
        break;
      case 2:
        daysToAdd = 3; // Review in 3 days
        break;
      case 3:
        daysToAdd = 7; // Review in 1 week
        break;
      case 4:
        daysToAdd = 14; // Review in 2 weeks
        break;
      case 5:
        daysToAdd = 30; // Review in 1 month
        break;
      default:
        daysToAdd = 1;
    }
    
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return formatDate(nextDate);
  };
  
  return (
    <Container>
      <Title>Daily Review</Title>
      
      <ReviewIntro>
        <h2>Spaced Repetition System</h2>
        <IntroText>
          Review concepts based on your confidence level. Items you find challenging
          will appear more frequently, while those you know well will be scheduled
          for review at longer intervals. This optimized learning approach ensures 
          long-term retention of key concepts.
        </IntroText>
        
        <h3>How to use:</h3>
        <IntroText>
          1. Review each concept by clicking "View"
          <br />
          2. Rate your confidence from 1 (not confident) to 5 (very confident)
          <br />
          3. Come back daily to review concepts according to your personalized schedule
        </IntroText>
      </ReviewIntro>
      
      {reviewItems.length > 0 ? (
        <>
          <h2>Due for Review</h2>
          <ReviewItems>
            {reviewItems.map(item => (
              <ReviewCard key={item.id}>
                <CardTitle>{item.name}</CardTitle>
                <CardType>{item.type === 'algorithm' ? 'Algorithm' : 'System Design'}</CardType>
                
                <CardDetails>
                  <DetailItem>
                    <span>Last Reviewed:</span>
                    <span>{formatDate(item.lastReviewed)}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>Due Date:</span>
                    <span>{formatDate(item.dueDate)}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>Next Review:</span>
                    <span>{getNextReviewDate(confidence[item.id])}</span>
                  </DetailItem>
                </CardDetails>
                
                <ConfidenceContainer>
                  <ConfidenceLabel>Rate your confidence:</ConfidenceLabel>
                  <ConfidenceButtons>
                    {[1, 2, 3, 4, 5].map(level => (
                      <ConfidenceButton
                        key={level}
                        level={level}
                        selected={confidence[item.id] === level}
                        onClick={() => handleConfidenceChange(item.id, level)}
                      >
                        {level}
                      </ConfidenceButton>
                    ))}
                  </ConfidenceButtons>
                </ConfidenceContainer>
                
                <CardActions>
                  <ViewButton
                    to={
                      item.type === 'algorithm'
                        ? `/algorithms/${item.name.toLowerCase().replace(/\s+/g, '')}`
                        : `/system-design/${item.name.toLowerCase().replace(/\s+/g, '-')}`
                    }
                  >
                    View
                  </ViewButton>
                </CardActions>
              </ReviewCard>
            ))}
          </ReviewItems>
        </>
      ) : (
        <NoReviewsMessage>
          <EmptyStateEmoji>🎉</EmptyStateEmoji>
          <h3>All caught up!</h3>
          <p>You have no items due for review today. Check back tomorrow.</p>
        </NoReviewsMessage>
      )}
    </Container>
  );
};

export default DailyReview;