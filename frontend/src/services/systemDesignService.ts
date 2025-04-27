import { SystemDesignTemplate } from '../types';

// Mock data for URL Shortener system design
const urlShortenerTemplate: SystemDesignTemplate = {
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
};

// Get system design template by ID
export const getSystemDesignTemplate = (templateId: string): SystemDesignTemplate => {
  if (templateId.toLowerCase() === 'url-shortener') {
    return urlShortenerTemplate;
  }
  
  throw new Error(`System design template not found: ${templateId}`);
};

// Get all available system design templates
export const getSystemDesignTemplates = (): SystemDesignTemplate[] => {
  return [
    urlShortenerTemplate
    // Add more templates here as they become available
  ];
};