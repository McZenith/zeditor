# zshditor

A powerful, customizable WYSIWYG editor for React applications with TypeScript support.

## Installation

```bash
npm install zshditor
# or
yarn add zshditor
# or
pnpm add zshditor
```

## Basic Usage

```tsx
import { Editor } from 'zshditor';

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

- 🎨 Rich text editing with a fully customizable toolbar
- 🎯 Floating or fixed toolbar positions
- 🛡️ Built-in HTML sanitization
- ⚡ Markdown shortcuts support
- 🎭 Customizable themes and styles
- 📝 TypeScript support with full type definitions
- ♿ Accessibility features (ARIA support)
- 🔧 Extensible architecture
- 🎉 Zero dependencies except for React

## Props

### Editor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content |
| `onChange` | `(content: EditorContent) => void` | - | Called when content changes |
| `onSelectionChange` | `(selection: EditorSelection) => void` | - | Called when selection changes |
| `onFocus` | `() => void` | - | Called when editor gains focus |
| `onBlur` | `() => void` | - | Called when editor loses focus |
| `toolbar` | `ToolbarConfig` | Default config | Toolbar configuration |
| `options` | `EditorOptions` | Default options | Editor options |
| `theme` | `EditorTheme` | Default theme | Custom theme |
| `className` | `string` | `''` | Additional CSS classes |

### Toolbar Configuration

```tsx
<Editor
  toolbar={{
    position: 'floating', // 'top' | 'floating'
    style: 'full', // 'compact' | 'full'
    groups: [
      {
        id: 'formatting',
        label: 'Text Formatting',
        items: [
          { id: 'bold', label: 'Bold', command: 'bold' },
          { id: 'italic', label: 'Italic', command: 'italic' },
          // ... more items
        ]
      }
    ],
    customItems: [
      {
        id: 'custom',
        label: 'Custom Action',
        icon: CustomIcon,
        onClick: () => {
          // Custom action
        }
      }
    ]
  }}
/>
```

### Editor Options

```tsx
<Editor
  options={{
    placeholder: 'Start writing...',
    readOnly: false,
    sanitize: true,
    minHeight: '200px',
    maxHeight: '600px',
    autoFocus: false
  }}
/>
```

## Styling

### Using Theme Props

```tsx
<Editor
  theme={{
    editor: 'custom-editor-class',
    toolbar: {
      container: 'custom-toolbar',
      group: 'toolbar-group',
      button: 'toolbar-button',
      buttonActive: 'toolbar-button-active'
    }
  }}
/>
```

### Using CSS

The editor provides CSS classes for styling:

```css
.wysiwyg-editor {
  /* Editor container styles */
}

.wysiwyg-content {
  /* Content area styles */
}

.wysiwyg-toolbar {
  /* Toolbar styles */
}
```

## Advanced Usage

### Custom Toolbar Items

```tsx
import { Editor } from 'zshditor';
import { Image } from 'lucide-react';

function MyEditor() {
  return (
    <Editor
      toolbar={{
        customItems: [
          {
            id: 'image-upload',
            label: 'Upload Image',
            icon: Image,
            onClick: () => {
              // Custom image upload logic
            }
          }
        ]
      }}
    />
  );
}
```

### Using Hooks

zshditor exports several hooks for advanced customization:

```tsx
import { useEditorState, useEditorCommands, useToolbar } from 'zshditor';

// Custom implementation using hooks
function CustomEditor() {
  const { content, selection, updateContent } = useEditorState();
  const { executeCommand } = useEditorCommands();
  // ... implementation
}
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details