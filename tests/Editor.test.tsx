// src/__tests__/Editor.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Editor } from '../src/components/Editor';

describe('Editor Component', () => {
  it('renders with initial content', () => {
    const initialContent = '<p>Test content</p>';
    render(<Editor initialContent={initialContent} />);
    
    const editorElement = screen.getByRole('textbox');
    expect(editorElement.innerHTML).toBe(initialContent);
  });

  it('shows placeholder when empty', () => {
    const placeholder = 'Start writing...';
    render(<Editor data-placeholder={placeholder} />);
    
    const editorElement = screen.getByRole('textbox');
    expect(editorElement).toHaveAttribute('data-placeholder', placeholder);
  });

  it('calls onChange when content changes', () => {
    const onChange = jest.fn();
    render(<Editor onChange={onChange} />);
    
    const editorElement = screen.getByRole('textbox');
    fireEvent.input(editorElement, {
      target: { innerHTML: '<p>New content</p>' }
    });
    
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      html: '<p>New content</p>',
      plainText: 'New content'
    }));
  });

  it('sanitizes HTML content', () => {
    const dangerousContent = '<p>Safe</p><script>alert("unsafe")</script>';
    render(<Editor initialContent={dangerousContent} />);
    
    const editorElement = screen.getByRole('textbox');
    expect(editorElement.innerHTML).toBe('<p>Safe</p>');
  });
});

// src/__tests__/Toolbar.test.tsx
describe('Toolbar Component', () => {
  it('renders toolbar buttons', () => {
    const items = [
      { id: 'bold', label: 'Bold', command: 'bold' },
      { id: 'italic', label: 'Italic', command: 'italic' }
    ];
    
    render(<Editor toolbar={{ items }} />);
    
    expect(screen.getByTitle('Bold')).toBeInTheDocument();
    expect(screen.getByTitle('Italic')).toBeInTheDocument();
  });

  it('executes commands on button click', () => {
    document.execCommand = jest.fn();
    
    render(<Editor />);
    
    fireEvent.click(screen.getByTitle('Bold'));
    expect(document.execCommand).toHaveBeenCalledWith('bold', false, undefined);
  });
});