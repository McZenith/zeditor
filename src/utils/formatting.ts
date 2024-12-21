// src/utils/formatting.ts

// Command type definitions
export enum TextCommand {
    BOLD = 'bold',
    ITALIC = 'italic',
    UNDERLINE = 'underline',
    STRIKETHROUGH = 'strikeThrough',
    SUBSCRIPT = 'subscript',
    SUPERSCRIPT = 'superscript'
}

export enum BlockCommand {
    PARAGRAPH = 'p',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    BLOCKQUOTE = 'blockquote',
    CODE = 'pre'
}

export enum AlignCommand {
    LEFT = 'justifyLeft',
    CENTER = 'justifyCenter',
    RIGHT = 'justifyRight',
    JUSTIFY = 'justifyFull'
}

export enum ListCommand {
    ORDERED = 'insertOrderedList',
    UNORDERED = 'insertUnorderedList'
}

export enum FormatCommand {
    FONT = 'fontName',
    SIZE = 'fontSize',
    COLOR = 'foreColor',
    BACKGROUND = 'backColor'
}

export interface FormatState {
    textCommands: Set<TextCommand>;
    blockCommand?: BlockCommand;
    alignCommand?: AlignCommand;
    listCommand?: ListCommand;
    fontName?: string;
    fontSize?: string;
    textColor?: string;
    backgroundColor?: string;
}

// Format tracking functions
export const getFormatState = (): FormatState => {
    const state: FormatState = {
        textCommands: new Set()
    };

    // Check text formatting
    Object.values(TextCommand).forEach(command => {
        if (document.queryCommandState(command)) {
            state.textCommands.add(command);
        }
    });

    // Check alignment
    Object.values(AlignCommand).forEach(command => {
        if (document.queryCommandState(command)) {
            state.alignCommand = command;
        }
    });

    // Check list state
    Object.values(ListCommand).forEach(command => {
        if (document.queryCommandState(command)) {
            state.listCommand = command;
        }
    });

    // Get current font settings
    state.fontName = document.queryCommandValue(FormatCommand.FONT);
    state.fontSize = document.queryCommandValue(FormatCommand.SIZE);
    state.textColor = document.queryCommandValue(FormatCommand.COLOR);
    state.backgroundColor = document.queryCommandValue(FormatCommand.BACKGROUND);

    return state;
};

// Formatting functions
export const formatText = (command: TextCommand | AlignCommand | ListCommand): boolean => {
    return document.execCommand(command, false);
};

export const formatBlock = (tag: BlockCommand): boolean => {
    return document.execCommand('formatBlock', false, `<${tag}>`);
};

export const setFont = (fontName: string): boolean => {
    return document.execCommand(FormatCommand.FONT, false, fontName);
};

export const setFontSize = (size: string): boolean => {
    return document.execCommand(FormatCommand.SIZE, false, size);
};

export const setTextColor = (color: string): boolean => {
    return document.execCommand(FormatCommand.COLOR, false, color);
};

export const setBackgroundColor = (color: string): boolean => {
    return document.execCommand(FormatCommand.BACKGROUND, false, color);
};

// Link handling
export interface LinkOptions {
    url: string;
    text?: string;
    newWindow?: boolean;
    rel?: string;
}

export const createLink = (options: LinkOptions): boolean => {
    const { url, text, newWindow = true, rel = 'noopener noreferrer' } = options;

    if (text) {
        return document.execCommand(
            'insertHTML',
            false,
            `<a href="${url}" ${newWindow ? 'target="_blank"' : ''} rel="${rel}">${text}</a>`
        );
    }

    return document.execCommand('createLink', false, url);
};

// Table handling
export interface TableOptions {
    rows: number;
    cols: number;
    width?: string;
    cellPadding?: string;
    border?: string;
}

export const createTable = (options: TableOptions): boolean => {
    const {
        rows,
        cols,
        width = '100%',
        cellPadding = '8px',
        border = '1px solid #ccc'
    } = options;

    let html = `<table style="width: ${width}; border-collapse: collapse;">`;

    for (let i = 0; i < rows; i++) {
        html += '<tr>';
        for (let j = 0; j < cols; j++) {
            html += `<td style="padding: ${cellPadding}; border: ${border};">&nbsp;</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    return document.execCommand('insertHTML', false, html);
};

// Selection handling
export interface SelectionRange {
    startOffset: number;
    endOffset: number;
    text: string;
}

export const getSelection = (): SelectionRange | null => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    return {
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        text: range.toString()
    };
};

// Line and paragraph handling
export const insertLineBreak = (): boolean => {
    return document.execCommand('insertLineBreak', false);
};

export const insertParagraph = (): boolean => {
    return document.execCommand('insertParagraph', false);
};

export const indent = (): boolean => {
    return document.execCommand('indent', false);
};

export const outdent = (): boolean => {
    return document.execCommand('outdent', false);
};

// Clipboard handling
export const copySelection = (): boolean => {
    return document.execCommand('copy', false);
};

export const cutSelection = (): boolean => {
    return document.execCommand('cut', false);
};

export const pasteAsPlainText = (): boolean => {
    return document.execCommand('insertText', false,
        (event as ClipboardEvent).clipboardData?.getData('text/plain') || ''
    );
};

// History handling
export const undo = (): boolean => {
    return document.execCommand('undo', false);
};

export const redo = (): boolean => {
    return document.execCommand('redo', false);
};

// Utility functions
export const clearFormatting = (): boolean => {
    return document.execCommand('removeFormat', false);
};

export const selectAll = (): boolean => {
    return document.execCommand('selectAll', false);
};

export const isFormatActive = (command: TextCommand | AlignCommand | ListCommand): boolean => {
    return document.queryCommandState(command);
};

export const getFormatValue = (command: FormatCommand): string => {
    return document.queryCommandValue(command);
};

export const DEFAULT_FORMATS = {
    paragraph: 'p',
    headings: ['h1', 'h2', 'h3'],
    inlineStyles: ['bold', 'italic', 'underline', 'strikethrough'],
    alignment: ['justifyLeft', 'justifyCenter', 'justifyRight'],
    lists: ['insertUnorderedList', 'insertOrderedList'],
};

export const getActiveFormats = (): Set<string> => {
    const formats = new Set<string>();

    // Check inline styles
    DEFAULT_FORMATS.inlineStyles.forEach(format => {
        if (isFormatActive(format as TextCommand)) {
            formats.add(format);
        }
    });

    // Check alignment
    DEFAULT_FORMATS.alignment.forEach(format => {
        if (isFormatActive(format as AlignCommand)) {
            formats.add(format);
        }
    });

    return formats;
};

export const getSelectionStyles = () => {
    const styles: Record<string, string> = {};
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const element = range.startContainer.parentElement;

        if (element) {
            const computedStyle = window.getComputedStyle(element);
            styles.fontFamily = computedStyle.fontFamily;
            styles.fontSize = computedStyle.fontSize;
            styles.color = computedStyle.color;
            styles.backgroundColor = computedStyle.backgroundColor;
        }
    }

    return styles;
};

export const normalizeHtml = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    // Remove empty paragraphs
    div.querySelectorAll('p').forEach(p => {
        if (!p.textContent?.trim()) {
            p.remove();
        }
    });

    // Normalize whitespace
    return div.innerHTML.replace(/\s+/g, ' ').trim();
};

// src/utils/validation.ts
export const validateColor = (color: string): boolean => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
};

export const validateFontSize = (size: string): boolean => {
    const validUnits = ['px', 'em', 'rem', '%', 'pt'];
    return validUnits.some(unit => size.endsWith(unit)) && !isNaN(parseFloat(size));
};