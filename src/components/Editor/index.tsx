// src/components/Editor/index.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import { EditorProps } from '../../types';
import { useEditorState } from '../../hooks/useEditorState';
import { useEditorCommands } from '../../hooks/useEditorCommands';
import { useToolbar } from '../../hooks/useToolbar';
import { DEFAULT_GROUPS, Toolbar } from '../Toolbar';
import { sanitizeHtml } from '../../utils/sanitize';
import './styles.css';

export const Editor: React.FC<EditorProps> = ({
  initialContent = '',
  onChange,
  onSelectionChange,
  onFocus,
  onBlur,
  toolbar = {},
  options = {},
  theme = {},
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const toolbarRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const {
    content,
    selection,
    updateContent,
    updateSelection
  } = useEditorState(initialContent);

  const {
    executeCommand,
    sanitizeHtml: sanitize
  } = useEditorCommands(editorRef, selection);

  const {
    toolbarPos,
    showToolbar,
    setShowToolbar,
    updateToolbarPosition
  } = useToolbar(toolbarRef, toolbar.position || 'top');

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && initialContent) {
      const sanitizedContent = options.sanitize !== false 
        ? sanitizeHtml(initialContent)
        : initialContent;
      editorRef.current.innerHTML = sanitizedContent;
      updateContent(sanitizedContent);
    }
  }, [initialContent, options.sanitize]);

  // Handle content changes
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;

    const html = editorRef.current.innerHTML;
    const sanitizedHtml = options.sanitize !== false 
      ? sanitizeHtml(html)
      : html;
    
    updateContent(sanitizedHtml);
    onChange?.({
      html: sanitizedHtml,
      plainText: editorRef.current.innerText,
      wordCount: editorRef.current.innerText.trim().split(/\s+/).length
    });
  }, [onChange, options.sanitize]);

  // Handle selection changes
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection) return;

    updateSelection();
    onSelectionChange?.({
      range: selection.rangeCount > 0 ? selection.getRangeAt(0) : null,
      text: selection.toString()
    });

    if (toolbar.position === 'floating') {
      if (selection.toString().trim()) {
        updateToolbarPosition(selection);
      } else {
        setShowToolbar(false);
      }
    }
  }, [onSelectionChange, toolbar.position]);

  return (
    <div className={`wysiwyg-editor ${className}`}>
      <Toolbar
        ref={toolbarRef}
        groups={toolbar.groups || DEFAULT_GROUPS}
        customItems={toolbar.customItems}
        position={toolbar.position}
        style={toolbar.style}
        show={showToolbar}
        pos={toolbarPos}
        onCommand={executeCommand}
        theme={theme.toolbar}
      />

      <div
        ref={editorRef}
        className={`wysiwyg-content ${theme.editor || ''}`}
        contentEditable={!options.readOnly}
        onInput={handleInput}
        onSelect={handleSelectionChange}
        onFocus={onFocus}
        onBlur={(e) => {
          if (toolbar.hideOnBlur) {
            setTimeout(() => {
              if (!toolbarRef.current?.contains(document.activeElement)) {
                setShowToolbar(false);
              }
            }, 100);
          }
          onBlur?.(e);
        }}
        style={{
          minHeight: options.minHeight || '200px',
          maxHeight: options.maxHeight,
        }}
        data-placeholder={options.placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};