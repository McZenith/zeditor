// src/hooks/useEditorState.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { EditorContent, EditorSelection } from '../types/index';

export const useEditorState = (initialContent: string = '') => {
    const [content, setContent] = useState<EditorContent>({
        html: initialContent,
        plainText: '',
        wordCount: 0
    });

    const [selection, setSelection] = useState<EditorSelection>({
        range: null,
        text: ''
    });

    const updateContent = useCallback((html: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const plainText = tempDiv.innerText;
        const wordCount = plainText.trim().split(/\s+/).length;

        setContent({
            html,
            plainText,
            wordCount
        });
    }, []);

    const updateSelection = useCallback(() => {
        const sel = window.getSelection();
        if (!sel) return;

        setSelection({
            range: sel.rangeCount > 0 ? sel.getRangeAt(0) : null,
            text: sel.toString()
        });
    }, []);

    return {
        content,
        selection,
        updateContent,
        updateSelection
    };
};
