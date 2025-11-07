# tw-radix-elements

> A modern React component library built with Tailwind CSS v4 and Radix UI

A collection of accessible and reusable React components built on top of Tailwind CSS v4 and Radix UI primitives.

## Features

- ⚡️ **Modern Stack**: React 19 + Tailwind CSS v4 + Radix UI
- ♿️ **Accessible**: Built with Radix UI primitives for WCAG compliance
- 🎨 **Customizable**: Flexible styling with Tailwind CSS utilities
- 📦 **Tree-shakable**: Import only what you need
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- ✅ **Well-tested**: Comprehensive test coverage with Vitest + React Testing Library
- 🎭 **Component Preview**: Interactive component playground with Ladle

## Installation

```bash
pnpm install tw-radix-elements
```

## Peer Dependencies

This library requires React 19 as a peer dependency:

```bash
pnpm install react@^19.0.0 react-dom@^19.0.0
```

## Usage

### Importing Components

```tsx
import { Checkbox } from 'tw-radix-elements/components/Checkbox';
```

### Importing Global Styles

```tsx
import 'tw-radix-elements/styles/globals.css';
```

### Basic Example

```tsx
import { Button } from 'tw-radix-elements';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Available Components

- **Badge** - Display status indicators and labels
- **Breadcrumbs** - Navigation breadcrumb trails
- **Button** - Interactive button component with variants
- **Calendar** - Date picker and calendar component
- **Card** - Container component for content grouping
- **Carousel** - Image and content carousel slider
- **Checkbox** - Accessible checkbox input
- **FileInput** - File upload input component
- **Input** - Text input field
- **List** - Styled list component
- **Progress** - Progress bar indicator
- **Steps** - Step-by-step progress indicator
- **Table** - Data table component
- **Tabs** - Tabbed interface component
- **TextField** - Enhanced text input with label
- **Textarea** - Multi-line text input
- **Toggle** - Toggle switch component
- **Tooltip** - Contextual tooltip overlay

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Setup Git hooks
pnpm prepare
```

### Development Server

```bash
# Start Ladle component preview server
pnpm ladle
```

### Build

```bash
# Build the library
pnpm build
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once
pnpm test:run
```

### Code Quality

```bash
# Lint with Biome
pnpm lint

# Fix lint issues automatically
pnpm lint:fix

# Type check with TypeScript
pnpm type-check
```

## Tech Stack

- **React 19**: Latest React features and improvements
- **Tailwind CSS v4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast build tool and dev server
- **Vitest**: Unit testing framework
- **Ladle**: Component development and preview
- **Biome**: Fast linter and formatter
- **Motion**: Animation library for smooth interactions

## Project Structure

```
src/
├── components/         # Component implementations
│   ├── Button/
│   ├── Checkbox/
│   └── ...
├── hooks/             # Custom React hooks
├── hoc/               # Higher-order components
├── lib/               # Utility functions
├── styles/            # Global styles
└── index.ts           # Main entry point
```

## Contributing

This project is currently private. Contributions are managed internally.

## License

Private
