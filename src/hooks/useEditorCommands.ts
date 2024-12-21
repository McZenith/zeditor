// src/hooks/useEditorCommands.ts
import { useCallback, RefObject } from 'react';
import DOMPurify from 'dompurify';
import { EditorSelection } from '../types/index';

export const useEditorCommands = (
    editorRef: RefObject<HTMLDivElement>,
    selection: EditorSelection
) => {
    const sanitizeHtml = useCallback((html: string) => {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
                'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3',
                'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code'
            ],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target', 'rel']
        });
    }, []);

    const restoreSelection = useCallback(() => {
        if (selection.range) {
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(selection.range);
        }
    }, [selection]);

    const executeCommand = useCallback((command: string, value?: string) => {
        if (!editorRef.current) return;

        editorRef.current.focus();
        restoreSelection();
        document.execCommand(command, false, value);

        // Special handling for links
        if (command === 'createLink' && value) {
            const sel = window.getSelection();
            const node = sel?.focusNode?.parentElement;
            if (node?.tagName === 'A') {
                node.setAttribute('target', '_blank');
                node.setAttribute('rel', 'noopener noreferrer');
            }
        }
    }, [editorRef, restoreSelection]);

    return {
        executeCommand,
        sanitizeHtml
    };
};