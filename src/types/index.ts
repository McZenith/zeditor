// src/types/index.ts
import { ComponentType } from 'react';

export interface EditorContent {
    html: string;
    plainText: string;
    wordCount?: number;
}

export interface EditorSelection {
    range: Range | null;
    text: string;
}

export interface EditorCommand {
    name: string;
    execute: (value?: string) => void;
    isActive?: () => boolean;
}

export type ToolbarPosition = 'top' | 'bottom' | 'floating';
export type ToolbarStyle = 'compact' | 'full';

export interface ToolbarItem {
    id: string;
    label: string;
    icon?: ComponentType;
    command: string;
    value?: string;
    group?: string;
    isActive?: () => boolean;
}

export interface CustomToolbarItem extends Omit<ToolbarItem, 'command'> {
    onClick: (editor: HTMLElement) => void;
}

export interface ToolbarConfig {
    items?: ToolbarItem[];
    customItems?: CustomToolbarItem[];
    position?: ToolbarPosition;
    style?: ToolbarStyle;
    hideOnBlur?: boolean;
}

export interface EditorOptions {
    placeholder?: string;
    readOnly?: boolean;
    sanitize?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    minHeight?: string;
    maxHeight?: string;
}

export interface EditorTheme {
    container?: string;
    editor?: string;
    toolbar?: {
        container?: string;
        group?: string;
        button?: string;
        buttonActive?: string;
        dropdown?: string;
    };
}

export interface EditorProps {
    initialContent?: string;
    onChange?: (content: EditorContent) => void;
    onSelectionChange?: (selection: EditorSelection) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    toolbar?: ToolbarConfig;
    options?: EditorOptions;
    theme?: EditorTheme;
    className?: string;
}

export interface ToolbarProps {
    items: ToolbarItem[];
    customItems?: CustomToolbarItem[];
    position?: ToolbarPosition;
    style?: ToolbarStyle;
    show?: boolean;
    pos?: { top: number; left: number };
    onCommand: (command: string, value?: string) => void;
    activeFormats: Set<string>;
    theme?: EditorTheme['toolbar'];
}