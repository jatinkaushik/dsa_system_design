import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SystemDesignTemplate } from '../../types';
import SystemDesignCanvas from './SystemDesignCanvas.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const DesignInfo = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RequirementsList = styled.ul`
  margin-bottom: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

const TradeoffsSection = styled.div`
  margin-top: 1.5rem;
`;

const TradeoffItem = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const TradeoffTitle = styled.h4`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const URLShortenerDesign: React.FC = () => {
  const [template, setTemplate] = useState<SystemDesignTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'http://localhost:8000/api';
  
  useEffect(() => {
    fetchSystemDesign();
  }, []);
  
  const fetchSystemDesign = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/system-design/templates/url-shortener`);
      setTemplate(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching system design template:', error);
      setLoading(false);
      
      // If API call fails, use a default template
      setTemplate({
        id: 'url-shortener',
        name: 'URL Shortener',
        description: 'A system design for a URL shortening service like bit.ly or tinyurl',
        category: 'Web Service',
        components: [
          {
            id: 'client',
            type: 'client',
            name: 'Client',
            description: 'Web browser or mobile app that sends requests to shorten URLs or access shortened URLs',
            position: { x: 100, y: 200 }
          },
          {
            id: 'lb',
            type: 'loadBalancer',
            name: 'Load Balancer',
            description: 'Distributes incoming traffic across multiple web servers',
            position: { x: 300, y: 200 }
          },
          {
            id: 'api_server',
            type: 'server',
            name: 'API Server',
            description: 'Handles requests to create short URLs and redirect to original URLs',
            position: { x: 500, y: 200 }
          },
          {
            id: 'cache',
            type: 'cache',
            name: 'Cache',
            description: 'In-memory store for frequently accessed URLs to reduce database load',
            position: { x: 700, y: 100 }
          },
          {
            id: 'db',
            type: 'database',
            name: 'Database',
            description: 'Stores the mapping between short URLs and original URLs',
            position: { x: 700, y: 300 }
          },
          {
            id: 'analytics',
            type: 'service',
            name: 'Analytics Service',
            description: 'Tracks URL access patterns and generates usage statistics',
            position: { x: 900, y: 200 }
          }
        ],
        connections: [
          {
            id: 'conn1',
            source_id: 'client',
            target_id: 'lb',
            label: 'HTTP/HTTPS',
            type: 'request'
          },
          {
            id: 'conn2',
            source_id: 'lb',
            target_id: 'api_server',
            label: 'HTTP',
            type: 'request'
          },
          {
            id: 'conn3',
            source_id: 'api_server',
            target_id: 'cache',
            label: 'GET/SET',
            type: 'dataFlow'
          },
          {
            id: 'conn4',
            source_id: 'api_server',
            target_id: 'db',
            label: 'CRUD',
            type: 'dataFlow'
          },
          {
            id: 'conn5',
            source_id: 'api_server',
            target_id: 'analytics',
            label: 'Events',
            type: 'dataFlow'
          }
        ]
      });
    }
  };
  
  return (
    <Container>
      <Title>URL Shortener System Design</Title>
      
      {loading ? (
        <LoadingMessage>Loading system design...</LoadingMessage>
      ) : template ? (
        <>
          <DesignInfo>
            <h2>Overview</h2>
            <Description>
              A URL shortener is a service that converts long URLs into shorter, more manageable links.
              When a user clicks on a shortened URL, they are redirected to the original destination.
              This service helps create cleaner links for sharing and provides analytics on link usage.
            </Description>
            
            <h3>Functional Requirements</h3>
            <RequirementsList>
              <li><strong>URL Shortening:</strong> Convert a long URL into a shorter, unique URL</li>
              <li><strong>Redirection:</strong> Redirect users to the original URL when they access the shortened link</li>
              <li><strong>Custom URLs:</strong> Allow users to create custom short URLs if available</li>
              <li><strong>Analytics:</strong> Track usage statistics like clicks, referrers, and geographic data</li>
              <li><strong>API Access:</strong> Provide programmatic access to the service</li>
            </RequirementsList>
            
            <h3>Non-Functional Requirements</h3>
            <RequirementsList>
              <li><strong>High Availability:</strong> The service should be available 24/7 with minimal downtime</li>
              <li><strong>Low Latency:</strong> Redirects should happen quickly (&lt; 100ms)</li>
              <li><strong>Scalability:</strong> Should handle billions of URLs and redirects</li>
              <li><strong>Security:</strong> Prevent abuse and malicious URL shortening</li>
            </RequirementsList>
            
            <TradeoffsSection>
              <h3>Design Considerations & Tradeoffs</h3>
              
              <TradeoffItem>
                <TradeoffTitle>URL Encoding Strategy</TradeoffTitle>
                <p>
                  We can either use a hash function or a counter-based approach to generate short URLs.
                  Hash functions (like MD5 or SHA256) provide quick generation but can lead to collisions,
                  while counters with base62 encoding (a-z, A-Z, 0-9) ensure uniqueness but require synchronization.
                </p>
              </TradeoffItem>
              
              <TradeoffItem>
                <TradeoffTitle>Cache Strategy</TradeoffTitle>
                <p>
                  Implementing a cache is crucial for performance. Popular URLs should be cached to
                  reduce database load. We must decide on cache size, eviction policy (e.g., LRU),
                  and consistency strategy with the database.
                </p>
              </TradeoffItem>
              
              <TradeoffItem>
                <TradeoffTitle>Database Choice</TradeoffTitle>
                <p>
                  A NoSQL database like DynamoDB or Cassandra might be preferable for high write throughput
                  and horizontal scalability, but a relational database like PostgreSQL offers stronger
                  consistency guarantees and simpler querying for analytics.
                </p>
              </TradeoffItem>
            </TradeoffsSection>
          </DesignInfo>
          
          <h2>Architecture Diagram</h2>
          <SystemDesignCanvas components={template.components} connections={template.connections} />
        </>
      ) : (
        <div>Failed to load system design. Please try again later.</div>
      )}
    </Container>
  );
};

export default URLShortenerDesign;