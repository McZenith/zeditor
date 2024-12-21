// src/components/Toolbar/index.tsx
import React, { forwardRef } from 'react';
import { ToolbarProps, ToolbarGroup as IToolbarGroup } from '../../types';
import {
  Bold, Italic, Underline, Heading1, Heading2,
  AlignLeft, AlignCenter, AlignRight, Link2,
  List, ListOrdered, Quote, Image, Table
} from 'lucide-react';

 export const DEFAULT_GROUPS: IToolbarGroup[] = [
  {
    id: 'text',
    label: 'Text',
    items: [
      { id: 'bold', label: 'Bold', icon: Bold, command: 'bold' },
      { id: 'italic', label: 'Italic', icon: Italic, command: 'italic' },
      { id: 'underline', label: 'Underline', icon: Underline, command: 'underline' }
    ]
  },
  {
    id: 'heading',
    label: 'Heading',
    items: [
      { id: 'h1', label: 'Heading 1', icon: Heading1, command: 'formatBlock', value: 'h1' },
      { id: 'h2', label: 'Heading 2', icon: Heading2, command: 'formatBlock', value: 'h2' }
    ]
  },
  {
    id: 'alignment',
    label: 'Alignment',
    items: [
      { id: 'alignLeft', label: 'Align Left', icon: AlignLeft, command: 'justifyLeft' },
      { id: 'alignCenter', label: 'Center', icon: AlignCenter, command: 'justifyCenter' },
      { id: 'alignRight', label: 'Align Right', icon: AlignRight, command: 'justifyRight' }
    ]
  },
  {
    id: 'lists',
    label: 'Lists',
    items: [
      { id: 'bullet', label: 'Bullet List', icon: List, command: 'insertUnorderedList' },
      { id: 'ordered', label: 'Numbered List', icon: ListOrdered, command: 'insertOrderedList' },
      { id: 'quote', label: 'Quote', icon: Quote, command: 'formatBlock', value: 'blockquote' }
    ]
  },
  {
    id: 'insert',
    label: 'Insert',
    items: [
      { id: 'link', label: 'Link', icon: Link2, command: 'createLink' },
      { id: 'image', label: 'Image', icon: Image, command: 'insertImage' },
      { id: 'table', label: 'Table', icon: Table, command: 'insertTable' }
    ]
  }
];

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({
  position = 'top',
  style = 'full',
  show = true,
  groups = DEFAULT_GROUPS,
  activeCommands = new Set(),
  onCommand,
  customItems = [],
  className = ''
}, ref) => {
  if (!show) return null;

  const handleCommand = (command: string, value?: string) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) onCommand(command, url);
      return;
    }

    if (command === 'insertImage') {
      const url = prompt('Enter image URL:');
      if (url) onCommand(command, url);
      return;
    }

    onCommand(command, value);
  };

  const baseStyles = `
    flex flex-wrap items-center gap-2 bg-white border border-gray-200
    ${position === 'floating' ? 'rounded-lg shadow-lg p-2' : 'p-2 border-t-0 border-x-0'}
    ${style === 'compact' ? 'space-x-1' : 'space-x-2'}
    ${className}
  `;

  return (
    <div 
      ref={ref}
      className={baseStyles}
      role="toolbar"
      aria-label="Text editor toolbar"
    >
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex items-center gap-1"
          role="group"
          aria-label={group.label}
        >
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`
                  p-1.5 rounded-md transition-colors
                  ${activeCommands.has(item.command)
                    ? 'bg-gray-200 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'}
                `}
                onClick={() => handleCommand(item.command, item.value)}
                title={item.label}
                aria-pressed={activeCommands.has(item.command)}
              >
                {Icon && <Icon size={16} />}
              </button>
            );
          })}
          {group.id !== groups[groups.length - 1].id && (
            <div className="w-px h-6 bg-gray-200 mx-1" />
          )}
        </div>
      ))}

      {customItems.length > 0 && (
        <>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <div className="flex items-center gap-1">
            {customItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700"
                  onClick={item.onClick}
                  title={item.label}
                >
                  {Icon && <Icon size={16} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';