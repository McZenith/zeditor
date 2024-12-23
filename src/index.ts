// src/index.ts
import { Editor as EditorComponent } from './components/Editor';
import { Toolbar as ToolbarComponent } from './components/Toolbar';
import type {
    EditorProps,
    EditorContent,
    EditorSelection,
    ToolbarProps,
    ToolbarItem,
    ToolbarGroup,
    CustomToolbarItem,
    EditorTheme
} from './types';

export const Editor = EditorComponent;
export const Toolbar = ToolbarComponent;

export type {
    EditorProps,
    EditorContent,
    EditorSelection,
    ToolbarProps,
    ToolbarItem,
    ToolbarGroup,
    CustomToolbarItem,
    EditorTheme
};

export * from './utils/sanitize';
export * from './utils/formatting';
export { useEditorState } from './hooks/useEditorState';
export { useEditorCommands } from './hooks/useEditorCommands';
export { useToolbar } from './hooks/useToolbar';