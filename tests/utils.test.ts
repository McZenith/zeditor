// src/__tests__/utils.test.ts
import { sanitizeHtml, validateUrl } from '../src/utils/sanitize';

describe('Editor Utils', () => {
    describe('sanitizeHtml', () => {
        it('removes unsafe tags', () => {
            const input = '<p>Safe</p><script>unsafe</script>';
            expect(sanitizeHtml(input)).toBe('<p>Safe</p>');
        });

        it('keeps allowed attributes', () => {
            const input = '<a href="https://example.com" onclick="alert()">Link</a>';
            expect(sanitizeHtml(input)).toBe('<a href="https://example.com">Link</a>');
        });
    });

    describe('validateUrl', () => {
        it('validates correct URLs', () => {
            expect(validateUrl('https://example.com')).toBe(true);
        });

        it('rejects invalid URLs', () => {
            expect(validateUrl('not-a-url')).toBe(false);
        });
    });
});