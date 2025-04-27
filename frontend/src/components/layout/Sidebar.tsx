import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLearningMode } from '../../App'; // Import hook from App
import { sidebarItems, groupItemsByTag, SidebarItem } from '../../config/sidebarData'; // Import from .ts file
import { SortIcon, LinkIcon } from '../../config/icons'; // Import icons

// Get the icon component based on iconType
const getIcon = (iconType?: string) => {
  switch (iconType) {
    case 'sort':
      return <SortIcon />;
    case 'link':
      return <LinkIcon />;
    default:
      return null;
  }
};

// Define a reusable component for rendering sidebar links
const SidebarLink: React.FC<{ item: SidebarItem; isActive: boolean }> = ({ item, isActive }) => (
  <Link
    to={item.path}
    className={`flex items-center py-2.5 pl-10 pr-6 text-text-primary no-underline transition-all duration-fast rounded-r-lg relative font-medium gap-3 hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/15 text-primary font-semibold" : ""}`}
  >
    {item.iconType && <span className="absolute left-4 top-1/2 -translate-y-1/2">{getIcon(item.iconType)}</span>}
    {item.name}
  </Link>
);

// Define a component for rendering tag groups
const TagGroup: React.FC<{ tag: string; items: SidebarItem[]; activePath: string }> = ({ tag, items, activePath }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open or based on preference/state

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-1.5 text-sm text-text-secondary hover:text-text-primary focus:outline-none"
      >
        <span className="font-medium uppercase tracking-wide">{tag}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform duration-fast ${isOpen ? 'rotate-90' : ''}`}>
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <ul className="list-none p-0 mt-1">
          {items.map(item => (
            <li key={item.path} className="mb-0.5">
              <SidebarLink item={item} isActive={activePath === item.path} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar: React.FC<{isOpen: boolean; closeSidebar: () => void}> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { learningMode, toggleLearningMode } = useLearningMode(); // Use hook from App

  useEffect(() => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  }, [location.pathname, closeSidebar]);

  // Filter and group items with explicit types
  const algorithmItems = sidebarItems.filter((item: SidebarItem) => item.type === 'algorithm');
  const systemDesignItems = sidebarItems.filter((item: SidebarItem) => item.type === 'system-design');

  const groupedAlgos = groupItemsByTag(algorithmItems);
  const groupedSysDesign = groupItemsByTag(systemDesignItems);

  // Type assertion for grouped maps to fix TypeScript errors
  type GroupedMap = Record<string, SidebarItem[]>;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-12 left-0 right-0 bottom-0 bg-black/50 z-80 tablet:block ${isOpen ? 'tablet:block' : 'hidden'}`}
        onClick={closeSidebar}
      />

      {/* Sidebar container */}
      <aside
        className={`w-[280px] bg-surface border-r border-border h-full transition-all duration-normal shadow-sm overflow-y-auto py-6 tablet:fixed tablet:top-12 tablet:h-[calc(100%-48px)] tablet:z-90 ${isOpen ? 'tablet:left-0 tablet:shadow-lg' : 'tablet:left-[-280px] tablet:shadow-none'}`}
      >
        {/* Learning Mode Toggle */}
        <div className="px-6 mb-6">
          <div
            className={`flex items-center justify-between ${learningMode ? 'bg-primary/10 border border-primary/30' : 'bg-black/[0.03] border border-transparent'} p-3 rounded-lg transition-all duration-fast cursor-pointer hover:bg-primary/15`}
            onClick={toggleLearningMode} // Ensure onClick is present
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              <div>
                <div className="font-medium text-sm">Learning Mode</div>
                <div className="text-xs text-text-secondary mt-1">Kid-friendly explanations</div>
              </div>
            </div>
            <div className={`relative w-9 h-5 rounded-full transition-all duration-fast`}>
              <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all duration-fast shadow-sm`}></div>
            </div>
          </div>
        </div>

        {/* Algorithms Section - Fix TypeScript type issues */}
        <div className="text-sm text-text-primary font-semibold uppercase tracking-wide px-6 mb-3">Algorithms</div>
        {Object.entries(groupedAlgos as GroupedMap).map(([tag, items]) => (
          <TagGroup key={tag} tag={tag} items={items} activePath={location.pathname} />
        ))}

        {/* System Design Section - Fix TypeScript type issues */}
        <div className="text-sm text-text-primary font-semibold uppercase tracking-wide px-6 mb-3 mt-6">System Design</div>
        {Object.entries(groupedSysDesign as GroupedMap).map(([tag, items]) => (
          <TagGroup key={tag} tag={tag} items={items} activePath={location.pathname} />
        ))}

        {/* Profile Section */}
        <div className="mt-auto px-6 py-4 flex items-center gap-3 border-t border-border mt-6">
          <div className="w-10 h-10 bg-primary bg-opacity-20 text-primary rounded-full flex items-center justify-center font-medium">U</div>
          <div>
            <div className="font-medium text-sm">User</div>
            <div className="text-xs text-text-secondary">Developer</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;