// components/layout/ResizableLayout.js
import React, { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

const ResizableLayout = ({ 
  children, 
  direction = 'horizontal', 
  defaultSizes = [50, 50],
  onLayoutChange,
}) => {
  const [sizes, setSizes] = useState(defaultSizes);
  
  const handleResize = (newSizes) => {
    setSizes(newSizes);
    if (onLayoutChange) {
      onLayoutChange(newSizes);
    }
  };
  
  // Support for 2 panels (PDF view and Notes)
  const [firstChild, secondChild] = React.Children.toArray(children);
  
  return (
    <PanelGroup 
      direction={direction} 
      onLayout={handleResize}
    >
      <Panel defaultSize={sizes[0]} minSize={20}>
        {firstChild}
      </Panel>
      
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-blue-700 cursor-col-resize" />
      
      <Panel defaultSize={sizes[1]} minSize={20}>
        {secondChild}
      </Panel>
    </PanelGroup>
  );
};

// Define the LayoutToggle component
const LayoutToggle = ({ layout, onLayoutChange }) => {
  return (
    <button 
      onClick={() => onLayoutChange(layout === 'horizontal' ? 'vertical' : 'horizontal')}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
      aria-label={layout === 'horizontal' ? "Switch to vertical layout" : "Switch to horizontal layout"}
    >
      {layout === 'horizontal' ? '↕️' : '↔️'}
    </button>
  );
};

export default ResizableLayout;
export { LayoutToggle };
