// src/index.ts
export { Editor } from './components/Editor';
export { Toolbar } from './components/Toolbar';
export * from './types';
export * from './utils/sanitize';
export * from './utils/formatting';

// Also export hooks for advanced customization
export { useEditorState } from './hooks/useEditorState';
export { useEditorCommands } from './hooks/useEditorCommands';
export { useToolbar } from './hooks/useToolbar';