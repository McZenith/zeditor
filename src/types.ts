import { LucideIcon } from 'lucide-react';

export interface EditorTheme {
  editor?: string;
  toolbar?: Record<string, string>;
}

export interface EditorProps {
    initialContent?: string;
    onChange?: (value: { html: string; plainText: string; wordCount: number }) => void;
    onSelectionChange?: (selection: { range: Range | null; text: string }) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    toolbar?: any;
    options?: any;
    theme?: EditorTheme;
    className?: string;
    readOnly?: boolean;
}

export interface ToolbarItem {
    id: string;
    label: string;
    icon: LucideIcon;
    command: string;
    value?: string;
}

export interface ToolbarGroup {
    id: string;
    label: string;
    items: ToolbarItem[];
}

export interface CustomToolbarItem {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}

export interface ToolbarProps {
    position?: 'top' | 'floating';
    style?: 'full' | 'compact';
    show?: boolean;
    groups?: ToolbarGroup[];
    activeCommands?: Set<string>;
    onCommand: (command: string, value?: string) => void;
    customItems?: CustomToolbarItem[];
    className?: string;
    pos?: { top: number; left: number };
    theme?: Record<string, string>;
} 