// Define the structure for a sidebar item
export interface SidebarItem {
  name: string;
  path: string;
  type: 'algorithm' | 'system-design';
  tags: string[];
  iconType?: 'sort' | 'link'; // Use string identifiers instead of direct React components
}

// Define the list of sidebar items
export const sidebarItems: SidebarItem[] = [
  {
    name: 'Quick Sort',
    path: '/algorithms/quicksort',
    type: 'algorithm',
    tags: ['Sorting', 'Divide and Conquer'],
    iconType: 'sort',
  },
  // Add more algorithms here as needed
  {
    name: 'URL Shortener',
    path: '/system-design/url-shortener',
    type: 'system-design',
    tags: ['Web Services', 'Scalability'],
    iconType: 'link',
  },
  // Add more system design topics here as needed
];

// Helper function to group items by tags within a type
export const groupItemsByTag = (items: SidebarItem[]): Record<string, SidebarItem[]> => {
  const grouped: Record<string, SidebarItem[]> = {};
  items.forEach(item => {
    item.tags.forEach(tag => {
      if (!grouped[tag]) {
        grouped[tag] = [];
      }
      // Avoid adding duplicates if an item has multiple common tags
      if (!grouped[tag].some(existing => existing.path === item.path)) {
        grouped[tag].push(item);
      }
    });
  });
  return grouped;
};