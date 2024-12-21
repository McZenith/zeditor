// src/hooks/useToolbar.ts
import { useState, useCallback, RefObject, useEffect } from 'react';
import { ToolbarPosition } from '../types/index';

export const useToolbar = (
    toolbarRef: RefObject<HTMLDivElement>,
    position: ToolbarPosition
) => {
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
    const [showToolbar, setShowToolbar] = useState(false);

    const updateToolbarPosition = useCallback((selection: Selection) => {
        if (!selection.rangeCount || position !== 'floating') return;

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const toolbar = toolbarRef.current;
        if (!toolbar) return;

        const toolbarHeight = toolbar.offsetHeight;
        setToolbarPos({
            top: rect.top - toolbarHeight - 10 + window.scrollY,
            left: rect.left + (rect.width / 2)
        });
        setShowToolbar(true);
    }, [toolbarRef, position]);

    useEffect(() => {
        if (position !== 'floating') {
            setShowToolbar(true);
        }
    }, [position]);

    return {
        toolbarPos,
        showToolbar,
        setShowToolbar,
        updateToolbarPosition
    };
};