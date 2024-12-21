// src/utils/sanitize.ts
import DOMPurify from 'dompurify';

export const ALLOWED_TAGS = [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3',
    'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code',
    'pre', 'div', 'span'
];

export const ALLOWED_ATTR = [
    'href', 'src', 'alt', 'class', 'target', 'rel',
    'style', 'data-*'
];

export const ALLOWED_STYLES = [
    'color', 'background-color', 'text-align', 'font-size',
    'font-family', 'margin', 'padding'
];

export const sanitizeConfig = {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_STYLES,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: true,
};

export const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, sanitizeConfig);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// src/utils