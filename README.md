# React WYSIWYG Editor

A customizable, TypeScript-based WYSIWYG editor for React applications.

## Installation

```bash
npm install @yourname/wysiwyg-editor
# or
yarn add @yourname/wysiwyg-editor
```

## Basic Usage

```tsx
import { Editor } from '@yourname/wysiwyg-editor';

function MyEditor() {
  const handleChange = (content) => {
    console.log('HTML:', content.html);
    console.log('Plain text:', content.plainText);
    console.log('Word count:', content.wordCount);
  };

  return (
    <Editor
      initialContent="<p>Initial content</p>"
      onChange={handleChange}
      options={{
        placeholder: 'Start writing...',
        sanitize: true,
        minHeight: '300px'
      }}
    />
  );
}
```

## Features

- Rich text editing with customizable toolbar
- Floating or fixed toolbar positions
- HTML sanitization
- Markdown shortcuts
- Customizable themes
- TypeScript support
- Accessibility features

## Props

### Editor Props

| Prop | Type | Description |
|------|------|-------------|
| initialContent | string | Initial HTML content |
| onChange | (content: EditorContent) => void | Content change callback |
| onSelectionChange | (selection: EditorSelection) => void | Selection change callback |
| toolbar | ToolbarConfig | Toolbar configuration |
| options | EditorOptions | Editor options |
| theme | EditorTheme | Custom theme |

### Toolbar Configuration

```tsx
<Editor
  toolbar={{
    position: 'floating', // 'top' | 'bottom' | 'floating'
    style: 'full', // 'compact' | 'full'
    items: [
      {
        id: 'bold',
        label: 'Bold',
        command: 'bold',
        group: 'formatting'
      },
      // ... more items
    ],
    customItems: [
      {
        id: 'custom',
        label: 'Custom',
        onClick: (editor) => {
          // Custom action
        }
      }
    ]
  }}
/>
```

## Custom Styling

```tsx
<Editor
  theme={{
    editor: 'my-custom-editor-class',
    toolbar: {
      container: 'my-toolbar-class',
      button: 'my-button-class',
      buttonActive: 'my-active-button-class'
    }
  }}
/>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details